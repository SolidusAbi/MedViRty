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

        //Creación de las entidades de los planos ///
        var entityEx = document.createElement('a-entity');
        var entityEy = document.createElement('a-entity');
        var entityEz = document.createElement('a-entity');

        //plano coronal
        entityEx.setAttribute('id', 'coronal');
        entityEx.setAttribute('class', 'plane');
        entityEx.setAttribute('mixin', 'plane');
        entityEx.setAttribute('rotation', '0 0 0');
        entityEx.setAttribute('slice',{depth: volume.zLength, width: volume.xLength, height: volume.yLength, paso: 1, sliceNum: 100});
        // entityEx.setAttribute('position', '5 0 2');
        // aframeScene.appendChild(entityEx);
        bBox.appendChild(entityEx);

        // plano axial
        entityEy.setAttribute('slice',{depth: volume.zLength, width: volume.xLength, height: volume.yLength , paso: 2,  sliceNum: 100});
        entityEy.setAttribute('id', 'axial');
        entityEy.setAttribute('class', 'plane');
        entityEy.setAttribute('mixin', 'plane');
        entityEy.setAttribute('rotation', '0 0 0');
        // entityEy.setAttribute('position', '3 0 2');
        // aframeScene.appendChild(entityEy);
        bBox.appendChild(entityEy);


        //  plano sagital
        entityEz.setAttribute('slice',{depth: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 3,  sliceNum: 100});
        entityEz.setAttribute('id', "sagital");
        entityEz.setAttribute('class', 'plane');
        entityEz.setAttribute('mixin', 'plane');
        entityEz.setAttribute('rotation', '0 0 0');
        // entityEz.setAttribute('position', '1 0 2');
        // aframeScene.appendChild(entityEz);
        bBox.appendChild(entityEz);
    },

    init: function(){
        var data = this.data;
        ArrayDatos[3] = typeOfData(data.volumePath);
        console.log(this.data.volumeLoaded)
        this.eventHandlerFn = function () {
            console.log("Prueba poderosa!!!"); 
            console.log(this.el);
            console.log(self.data.message); 
        };

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
            alert("Se ha cargado el volumen");
            this.onLoad(this.el.volumeData)
        }            
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



