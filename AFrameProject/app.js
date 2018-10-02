var generalDataVolume;
var ArrayDatos=[4];

AFRAME.registerComponent('bbox', {
    init: function(){
        var el = this.el;
        this.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        this.material = new THREE.MeshStandardMaterial({color:'yellow'});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.boxHelper = new THREE.BoxHelper( this.mesh );
        el.setObject3D('mesh', this.boxHelper);
    }
});

//Volume component
AFRAME.registerComponent('volume', {
    schema: {
        volumePath: {type: 'string'},
        volumeLoaded: {type: 'boolean', default: 'false'}
    },
    onLoad: function(volume){
        this.volume = volume;
        generalDataVolume = volume.data;


        // Se conecta el componente volumen con su etiqueta HTML //
        var volumenSelector = document.querySelector('#volumenCompleto');
        ArrayDatos[0]=volume.xLength;
        ArrayDatos[1]=volume.yLength;
        ArrayDatos[2]=volume.zLength;

        // Formación del boxHelper y sus atributos. Perteneciente al volumen.
        var bBox = document.createElement('a-entity');
        bBox.setAttribute('bbox', '');
        bBox.setAttribute('position', {x: 0 , y: 0, z: -(volume.zLength + 300)});  // ESTE VALOR DEBERIA DEPENDER DEL NRRD A APLICAR
        bBox.setAttribute('dynamic-body', '');
        bBox.setAttribute('id', 'bbox');
        bBox.setAttribute('scale', { x: volume.xLength, y:  volume.yLength,z:  volume.zLength});
        bBox.setAttribute('stretchable', '');
        bBox.setAttribute('rotation', '0 0 0');
        volumenSelector.appendChild(bBox);

        //Creación de las entidades de los planos 
        var entityEx = document.createElement('a-entity');
//        var entityEy = document.createElement('a-entity');
//        var entityEz = document.createElement('a-entity');

        //plano coronal
//        entityEx.setAttribute('id', 'coronal');
//        entityEx.setAttribute('class', 'plane');
//        entityEx.setAttribute('mixin', 'plane');
//        entityEx.setAttribute('rotation', '0 0 0');
//        entityEx.setAttribute('slice',{depth: volume.zLength, width: volume.xLength, height: volume.yLength, paso: 1, sliceNum: 100});
        // entityEx.setAttribute('position', '5 0 2');
        // aframeScene.appendChild(entityEx);
//        bBox.appendChild(entityEx);

        // plano axial
//        entityEy.setAttribute('slice',{depth: volume.zLength, width: volume.xLength, height: volume.yLength , paso: 2,  sliceNum: 100});
//        entityEy.setAttribute('id', 'axial');
//        entityEy.setAttribute('class', 'plane');
//        entityEy.setAttribute('mixin', 'plane');
//        entityEy.setAttribute('rotation', '0 0 0');
        // entityEy.setAttribute('position', '3 0 2');
        // aframeScene.appendChild(entityEy);
//        bBox.appendChild(entityEy);


        //  plano sagital
//        entityEz.setAttribute('slice',{depth: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 3,  sliceNum: 100});
//        entityEz.setAttribute('id', "sagital");
//        entityEz.setAttribute('class', 'plane');
//        entityEz.setAttribute('mixin', 'plane');
//        entityEz.setAttribute('rotation', '0 0 0');
        // entityEz.setAttribute('position', '1 0 2');
        // aframeScene.appendChild(entityEz);
//        bBox.appendChild(entityEz);

        /** 
         * Se debe crear los Slices y enlazar con el entidad actual
        */
        var coronaLSlice = document.createElement('a-entity');
        var nCoronalSlices = this.el.volumeData.dimensions[1];
        coronaLSlice.setAttribute('coronal-slice',"1");
        this.el.appendChild(coronaLSlice);
    },

    init: function(){
        var data = this.data;
        ArrayDatos[3] = typeOfData(data.volumePath); // Esto está mal...
        console.log(this.data.volumeLoaded)
        this.eventHandlerFn = function () {
            console.log("Prueba poderosa!!!"); 
            console.log(this.el);
            console.log(self.data.message); 
        };

        alert(this.update.toString());

        var loader = new THREE.NRRDLoader();
        //loader.load(data.volumePath, this.onLoad);
        var self = this;
        
        var onLoad = function(volumeDataLoaded){
            var el = document.querySelector('.volume');
            el.volumeData = volumeDataLoaded;
            el.setAttribute('volume', {volumeLoaded: 'true'});
        };
        loader.load(data.volumePath, onLoad);
    },

    update: function(oldData){
        if ((oldData.volumePath === this.data.volumePath) & this.data.volumeLoaded)
        {
            console.log(this.el.volumeData.data.buffer);
            alert("Se ha cargado el volumen");
            this.onLoad(this.el.volumeData)
            /** 
             * El this.onLoad es accesible, es posible acceder a la entiendad medoiante this.el
             * Aqui podemos actualizar el escalado... De esta forma descartamos 
             * el bounding box. Échale un ojo.
            */
        }            
    },

    load: function(){
    
    }
});


AFRAME.registerComponent('slice', {
    schema: {
        depth: {type: 'int'},
        width: {type: 'int'},
        height: {type: 'int'},
        paso: {type: 'int'},
        sliceNum: {type: 'int'}
    },
    init: function(){
        var data = this.data;
        if(data.paso == 1) {
            var mesh = selectDataCoronal(data.width, data.height, data.depth,data.paso, data.sliceNum);
        }else
        if(data.paso == 2) {
            var mesh = selectDataAxial(data.width, data.height, data.depth, data.paso, data.sliceNum);
        }else
        if(data.paso == 3) {
            var mesh = selectDataSagital(data.width, data.height, data.depth,data.paso, data.sliceNum);
        }
        this.el.setObject3D('mesh', mesh);
    },

});

AFRAME.registerComponent('coronal-slice',{
    schema: {
        nSlice: {type: 'int'}
    },
    init: function(){
        var volumeData = this.el.parentEl.volumeData;
        
        /** 
         * Mi idea es almacenar la misma información pero con distinto orden,
         * tratando de reducir los fallos de caché (Con las dimensiones que trabajamos
         * puede que ganemos bastante ms).
         */
        this.stride = volumeData.dimensions[0]; //Width? Compruebalo!!
        this.sliceSize = volumeData.dimensions[1] * volumeData.dimensions[2];
        this.slicesData = new Uint8Array( volumeData.dimensions.reduce( (a,b) => a * b ) );
        
        this.loadData(volumeData);
    },

    update: function(){
        var idx = this.data.nSlice * this.sliceSize;
        //var currentSlice = this.slicesData.slice(idx, (idx + this.slicesSize))
        //this.repaint(currentSlice)
    },
    
    repaint: function(sliceData){
        /**
         * Aquí iría la lógica de pintar: mover mallado, crear texture...  
         */
    },

    loadData: function(volumeData){
        /**
         * Gestionar aqui la carga de datos que será producida por el Worker.
         * Comprobar si puede incluirse todas las funciones de carga (coronal, sagital y axial)
         * y que se use el mismo objeto para todos los worker de alguna forma... Por
         * ahora es exclusivo de este componente.
         */
        var loadDataWorker = function (volumeData)
        {
            self.addEventListener("message", function(e){
                console.log("Soy el WORKER!!!")
                var volume = e.data;
                var slicesData = loadData(volume.data, volume.size);
                var pruebaGuapa = new Uint8Array(volume.size.reduce( (a,b) => a * b ));
                pruebaGuapa.fill(1);
                console.log(volume.data);
                console.log(volume.size);
                self.postMessage(slicesData);
            });

            // -- Falta comprobar si la función está bien... -- 
            function loadData(volumeData, volumeSize){
                var coronalSlicesData = new Uint8Array( volumeSize.reduce( (a,b) => a * b ) );
                var coronalSlicesIdx = 0;
                var sliceStride = volumeSize[0]
                var pixelStride = volumeSize[0] * volumeSize[1] 
                for (var nSlice = 0; nSlice < volumeSize[1]; nSlice++)
                {
                    var slice_idx = nSlice * this.stride; //Indica el origen de cada slice
                    for (var row = 0; row < volumeSize[2]; row++ ) 
                    {
                        for (var col = 0; col < volumeSize[0]; col++ )
                        {
                            var pixel_idx = row * pixelStride + col;
                            pixelValue = volumeData[slice_idx + pixel_idx]
                            /** -- Si hay que transformar... llamar a la funcion oportuna -- */
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
            {data: volumeData.data, size: new Uint16Array(volumeData.dimensions)}
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

    dataLoaded: function(volumeData){
        console.log("Me ha llegado el mensaje del WORKER!!");
        this.slicesData.set(volumeData);
        console.log(this.slicesData);
    }
});

AFRAME.registerComponent('axial-slice',{
    schema: {
        nSlice: {type: 'int'}
    },
    init: function(){
        var volumeData = this.el.parentEl.volumeData;
        
        this.stride = volumeData.dimensions[0]*volumeData.dimensions[1]; //Width*Height
        this.sliceSize = volumeData.dimensions[0] * volumeData.dimensions[1]
        this.slicesData = new Uint8Array( volumeData.dimensions.reduce( (a,b) => a * b ) );
        
        //Los datos aquí mantiene el mismo orden que el volumen original
    },

    update: function(){
        var idx = this.data.nSlice * this.sliceSize;
        //var currentSlice = this.slicesData.slice(idx, (idx + this.slicesSize))
        //this.repaint(currentSlice)
    },
    
    repaint: function(sliceData){
        /**
         * Aquí iría la lógica de pintar: mover mallado, crear texture...  
         */
    }
});
