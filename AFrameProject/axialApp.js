
AFRAME.registerComponent('axial-slice',{
    schema: {
        nSlice: {type: 'int'}
    },
    init: function(){
        var volumeData = this.el.parentEl.volumeData;
        this.sliceSize = volumeData.dimensions[0] * volumeData.dimensions[1];
        this.slicesData = new Uint8Array( volumeData.dimensions.reduce( (a,b) => a * b ) );

        console.log(volumeData.dimensions[0] + " " +
            volumeData.dimensions[1] + " " + volumeData.dimensions[2]  )

        this.loadData(volumeData);
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
        this.el.setObject3D('mesh', mesh);
    },

    loadData: function(volumeData){
        var loadDataWorker = function (volumeData)
        {
            self.addEventListener("message", function(e){
                console.log("Soy el WORKER!!!")
                var volume = e.data;
                var slicesData = volume.data;
                self.postMessage(slicesData);
            });
        };

        var blobURL = URL.createObjectURL(
            new Blob(['(',loadDataWorker.toString(),')()' ], { type: 'application/javascript' } ) 
        );

        this.worker = new Worker(blobURL);

        this.worker.postMessage(
            {data: volumeData.data, dimensions: new Uint16Array(volumeData.dimensions)}
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
        var idx = 50 * this.sliceSize;
        var currentSlice = this.slicesData.slice(idx, (idx + this.sliceSize));
        return currentSlice;
    }
});