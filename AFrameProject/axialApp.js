AFRAME.registerComponent('axial-slice',{
    schema: {
        nSlice: {type: 'int'}
    },
    init: function(){
        var volumeData = this.el.parentEl.volumeData;
        var volumeType = this.el.parentEl.attributes.type.value;


        this.sliceSize = volumeData.dimensions[0] * volumeData.dimensions[1];
        this.slicesData = new Uint8Array( volumeData.dimensions.reduce( (a,b) => a * b ) );
        this.type = volumeType;


        this.loadData(volumeData, volumeType);
    },

    update: function(){
        this.repaint(this.getCurrentSlice());
    },
    
    repaint: function(sliceData){
        var volumeData = this.el.parentEl.volumeData;
        var geometry = new THREE.PlaneGeometry(1,  1);
        var texture = new THREE.DataTexture(sliceData, volumeData.dimensions[0] , volumeData.dimensions[1] , THREE.LuminanceFormat);
        texture.needsUpdate = true;
        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide , wireframe: false, map : texture});
        var mesh = new THREE.Mesh(geometry, material);
        rotateObject(mesh ,-90,0,0);
        this.el.setObject3D('mesh', mesh);
    },

    loadData: function(volumeData, volumeType){

        var loadDataWorker = function (volumeData , volumeType)
        {
            self.addEventListener("message", function(e){
                console.log("Soy el WORKER!!!")
                var volume = e.data;
                if(volume.type == 'CT'){
                    var slicesData = loadDataAxial(volume.data, volume.dimensions);
                }else{
                    var slicesData = volume.data;
                }
                self.postMessage(slicesData);
            });

            function loadDataAxial(volumeData, volumeDimensions) {

                var SlicesData = new Uint8Array(volumeDimensions.reduce((a, b) => a * b));
                var SlicesIdx = 0;

                for(var pixel = 0 ; pixel < volumeDimensions[1]*volumeDimensions[2]*volumeDimensions[0]; pixel++ ){
                    SlicesData[SlicesIdx++] = (volumeData[pixel]+1000)*255/3000;
                }

                return SlicesData;
            }

        };

        var blobURL = URL.createObjectURL(
            new Blob(['(',loadDataWorker.toString(),')()' ], { type: 'application/javascript' } ) 
        );

        this.worker = new Worker(blobURL);

        this.worker.postMessage(
            {data: volumeData.data, dimensions: new Uint16Array(volumeData.dimensions), type: volumeType}
        );
        
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