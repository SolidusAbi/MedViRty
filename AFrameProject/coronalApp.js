AFRAME.registerComponent('coronal-slice',{
    schema: {
        nSlice: {type: 'int'}
    },
    init: function(){
        var volumeData = this.el.parentEl.volumeData;
        var volumeType = this.el.parentEl.attributes.type.value;
      //  En volumen type se guarda el tipo de nrrd que se esta metiendo en el ejemplo. 

        /** 
         * Mi idea es almacenar la misma información pero con distinto orden,
         * tratando de reducir los fallos de caché (Con las dimensiones que trabajamos
         * puede que ganemos bastante ms).
         */

        this.sliceSize = volumeData.dimensions[0] * volumeData.dimensions[2];
        this.slicesData = new Uint8Array( volumeData.dimensions.reduce( (a,b) => a * b ) );
        this.type = volumeType;

        this.loadData(volumeData);
    },

    update: function(){
        // var idx = this.data.nSlice * this.sliceSize;
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
        this.el.setObject3D('mesh', mesh);
    },

    loadData: function(volumeData){
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

                var slicesData = loadDataCoronal(volume.data, volume.dimensions);
                self.postMessage(slicesData);
            });

            // -- Falta comprobar si la función está bien... -- 
            function loadDataCoronal(volumeData, volumeDimensions){

                var coronalSlicesData = new Uint8Array( volumeDimensions.reduce( (a,b) => a * b ) );
                var coronalSlicesIdx = 0;
                var sliceStride = volumeDimensions[0]
                var pixelStride = volumeDimensions[0] * volumeDimensions[1] 

                
                for (var nSlice = 0; nSlice < volumeDimensions[1]; nSlice++)
                {
                    var slice_idx = nSlice * sliceStride; //Indica el origen de cada slice
                    for (var row = 0; row < volumeDimensions[2] ; row++ ) 
                    {
                        for (var col = 0; col < volumeDimensions[0]; col++ )
                        {
                            var pixel_idx = row * pixelStride + col ;
                            pixelValue = volumeData[slice_idx + pixel_idx];
                            /** -- Si hay que transformar... llamar a la funcion oportuna -- */

                               // coronalSlicesData[coronalSlicesIdx++] = (pixelValue + 1000)*255/3000;
                               
                                coronalSlicesData[coronalSlicesIdx++] = pixelValue;
                            }
                        }
                    }
                return coronalSlicesData;
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

        console.log("Me ha llegado el mensaje del WORKER!! y este es el resultado: ");
        console.log(this.slicesData);


        this.repaint(this.getCurrentSlice());

        //Eliminar el worker que ya no voy a usar
        this.worker = null;
    },

    getCurrentSlice: function(){
        //var idx = this.data.nSlice * this.sliceSize;
        var idx = 70 * this.sliceSize;
        var currentSlice = this.slicesData.slice(idx, (idx + this.sliceSize));
        return currentSlice;
    }
});