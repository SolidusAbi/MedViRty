AFRAME.registerComponent('sagital-slice',{
    schema: {
        nSlice: {type: 'int'}
    },
    init: function(){
        var volumeData = this.el.parentEl.volumeData;
        var volumeType = this.el.parentEl.attributes.type.value;

        this.sliceSize = volumeData.dimensions[0] * volumeData.dimensions[2];
        this.slicesData = new Uint8Array( volumeData.dimensions.reduce( (a,b) => a * b ) );
        this.type = volumeType;

        this.loadData(volumeData);
    },

    update: function(){
        var idx = this.data.nSlice * this.sliceSize;
       // var currentSlice = this.slicesData.slice(idx, (idx + this.slicesSize));
        this.repaint(this.getCurrentSlice());
    },
    
    repaint: function(sliceData){
        var volumeData = this.el.parentEl.volumeData;
        var geometry = new THREE.PlaneGeometry(1,  1);
        var texture = new THREE.DataTexture(sliceData, volumeData.dimensions[0] , volumeData.dimensions[2] , THREE.LuminanceFormat);
        texture.needsUpdate = true;
        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide , wireframe: false, map : texture});
        var mesh = new THREE.Mesh(geometry, material);
        rotateObject(mesh ,0,-90,0);
        this.el.setObject3D('mesh', mesh);
    },

    loadData: function(volumeData, volumeType){
        /**
         * Gestionar aqui la carga de datos que será producida por el Worker.
         * Comprobar si puede incluirse todas las funciones de carga (coronal, sagital y axial)
         * y que se use el mismo objeto para todos los worker de alguna forma... Por
         * ahora es exclusivo de este componente.
         */

        var loadDataWorker = function (volumeData, volumeType)
        {
            self.addEventListener("message", function(e){
                console.log("Soy el WORKER!!!")
                var volume = e.data;
              //  console.log(this.el.parentEl.id);

                var slicesData = loadDataSagital(volume.data, volume.dimensions, volume.type);
                self.postMessage(slicesData);
            });

            function loadDataSagital(volumeData, volumeDimensions, volumeType){

           
                var SlicesData = new Uint8Array(volumeDimensions.reduce((a, b) => a * b));
                var SlicesIdx = 0;

                for (var nSlice = 0; nSlice < volumeDimensions[1] * volumeDimensions[2] * volumeDimensions[0]; nSlice++) {
                            var slice_idx = nSlice; //Indica el origen de cada slice
                            pixelValue = volumeData[slice_idx];
                        //    if(pixelValue >= umbral) pixelValue = 0;
                            if (volumeType == 'CT') {
                                 SlicesData[SlicesIdx++] = (pixelValue + 1000) * 255 / 3000;
                            } else {
                                SlicesData[SlicesIdx++] = pixelValue;
                            }
                            nSlice = nSlice + volumeDimensions[1];
                }
                return SlicesData;
            }

        };

        var blobURL = URL.createObjectURL(
            new Blob(['(',loadDataWorker.toString(),')()' ], { type: 'application/javascript' } ) 
        );

        this.worker = new Worker(blobURL);
        /**
        * Pasar datos al worker en formato JSON (https://stackoverflow.com/questions/19152772/how-to-pass-large-data-to-web-workers)
        * Este worker será encargado de preparar el volumen bien formateado para
        * reducir los fallos de caché
        */
        this.worker.postMessage(
            {data: volumeData.data, dimensions: new Uint16Array(volumeData.dimensions)}
        );

        /**
         * De esta forma, los eventos se hacen accesible a las funciones
         * internas de un objeto
         */
        var self = this;
        function messageEvent(e){ self.dataLoaded(e.data); }
        this.worker.addEventListener("message", messageEvent);

        URL.revokeObjectURL(blobURL);
    },

    dataLoaded: function(volumeData) {
        /**
         * Definir el comportamiento al cargar los datos...
         */
        this.slicesData.set(volumeData);

        this.repaint(this.getCurrentSlice());

        //Eliminar el worker que ya no voy a usar
        this.worker = null;
    },

    getCurrentSlice: function(){
        //var idx = this.data.nSlice * this.sliceSize;
        var idx =  this.data.nSlice * this.sliceSize;
        var currentSlice = this.slicesData.slice(idx, (idx + this.sliceSize));
        return currentSlice;
    }
});