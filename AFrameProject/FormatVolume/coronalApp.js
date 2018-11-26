AFRAME.registerComponent('coronal-slice',{
    schema: {
        nSlice: {type: 'int'},
        umbral: {type: 'int'}
    },
    init: function(){
        var volumeData = this.el.parentEl.volumeData;
        var volumeType = this.el.parentEl.attributes.type.value;

        this.sliceSize = volumeData.dimensions[0] * volumeData.dimensions[2];
        this.slicesData = new Uint8Array( volumeData.dimensions.reduce( (a,b) => a * b ) );
        this.type = volumeType;
        this.umbral = this.data.umbral;

        this.loadData(volumeData, volumeType, this.umbral);
    },

    update: function(oldData){
        if (this.data.umbral != oldData.umbral){
            this.loadData(this.el.parentEl.volumeData, this.el.parentEl.attributes.type.value, this.data.umbral);
        }   

        this.repaint(this.getCurrentSlice());
    },
    
    repaint: function(sliceData){
        var volumeData = this.el.parentEl.volumeData;
        var geometry = new THREE.PlaneGeometry(1,  1);
        var texture = new THREE.DataTexture(sliceData, volumeData.dimensions[0] , volumeData.dimensions[2] , THREE.LuminanceFormat);
        texture.needsUpdate = true;
        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide , wireframe: false, map : texture});
        var mesh = new THREE.Mesh(geometry, material);
        this.el.setObject3D('mesh', mesh);
    },

    loadData: function(volumeData, volumeType, umbral){
        var loadDataWorker = function (volumeData, volumeType, umbral)
        {
            self.addEventListener("message", function(e){
                var volume = e.data;

                var slicesData = loadDataCoronal(volume.data, volume.dimensions, volume.type, e.data.umbral);
                self.postMessage(slicesData);
            });

            // -- Falta comprobar si la función está bien... -- 
            function loadDataCoronal(volumeData, volumeDimensions, volumeType, umbral) {
                var SlicesData = new Uint8Array(volumeDimensions.reduce((a, b) => a * b));
                var SlicesIdx = 0;
                
                var sliceStride = volumeDimensions[0]
                var pixelStride = volumeDimensions[0] * volumeDimensions[1]

                for (var nSlice = 0; nSlice < volumeDimensions[1]; nSlice++) {
                    var slice_idx = nSlice * sliceStride; //Indica el origen de cada slice
                    for (var row = 0; row < volumeDimensions[2]; row++) {
                        for (var col = 0; col < volumeDimensions[0]; col++) {
                            var pixel_idx = row * pixelStride + col;
                            pixelValue = volumeData[slice_idx + pixel_idx];
                            if (volumeType == 'CT') {
                                var valor =(pixelValue + 1000) * 255 / 3000;
                                if(valor <= umbral){
                                    valor = 0;}
                                    SlicesData[SlicesIdx++] = valor;
                            } else {
                                if (pixelValue > 255)
                                    pixelValue = 255;

                                if(pixelValue <= umbral)
                                    pixelValue = 0;

                                SlicesData[SlicesIdx++] = pixelValue;
                            }
                        }
                    }
                }  
                return SlicesData;
            }
        };

        var blobURL = URL.createObjectURL(
            new Blob(['(',loadDataWorker.toString(),')()' ], { type: 'application/javascript' } ) 
        );

        this.worker = new Worker(blobURL);

        this.worker.postMessage(
            {data: volumeData.data, dimensions: new Uint16Array(volumeData.dimensions), type: volumeType, umbral: umbral}
        );

        /**
         * De esta forma, los eventos se hacen accesible a las funciones
         * internas de un objeto
         */
        var self = this;
        function messageEvent(e){ self.dataLoaded(e.data, umbral); }
        this.worker.addEventListener("message", messageEvent);

        URL.revokeObjectURL(blobURL);
    },

    dataLoaded: function(volumeData) {
        this.slicesData.set(volumeData);
        this.repaint(this.getCurrentSlice());
        this.worker = null;
    },

    getCurrentSlice: function(){
        var idx = this.data.nSlice * this.sliceSize;
        var currentSlice = this.slicesData.slice(idx, (idx + this.sliceSize));
        return currentSlice;
    }
});