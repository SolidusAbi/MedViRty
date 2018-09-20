var generalDataVolume;

AFRAME.registerComponent('log', {
    schema: {type: 'string'},
    init: function(){
        var stringToLog = this.el.sceneEl.camera.projectionMatrix;
        console.log(stringToLog)
    }
});

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
        volumePath: {type: 'string'}
    },
    onLoad: function(volume){
        this.volume = volume;
        generalDataVolume = volume.data;

        // Se conecta el componente volumen con su etiqueta HTML //
        var volumenSelector = document.querySelector('#volumenCompleto');

        // Formación del boxHelper y sus atributos. Perteneciente al volumen.
        var bBox = document.createElement('a-entity');
        bBox.setAttribute('bbox', '');
        bBox.setAttribute('position', '0 0 -500');
        bBox.setAttribute('dynamic-body', '');
        bBox.setAttribute('id', 'bbox');
        bBox.setAttribute('scale', '512 512 139');
        bBox.setAttribute('stretchable', '');
        bBox.setAttribute('rotation', '0 0 0');
        volumenSelector.appendChild(bBox);

        //Creación de las entidades de los planos ///
        var entityEx = document.createElement('a-entity');
        var entityEy = document.createElement('a-entity');
        var entityEz = document.createElement('a-entity');

        //plano coronal
        entityEx.setAttribute('slice',{eje: 'x', depth: volume.zLength, width: volume.xLength, height: volume.yLength, paso: 1, sliceNum: 300});
        entityEx.setAttribute('id', 'coronal');
        entityEx.setAttribute('class', 'plane');
        entityEx.setAttribute('mixin', 'plane');
        entityEx.setAttribute('rotation', '0 0 0');
       // entityEx.setAttribute('position', '5 0 2');
       // aframeScene.appendChild(entityEx);
        bBox.appendChild(entityEx);


        // plano axial
        entityEy.setAttribute('slice',{eje: 'y', depth: volume.zLength, width: volume.xLength, height: volume.yLength , paso: 2,  sliceNum: 100});
        entityEy.setAttribute('id', 'axial');
        entityEy.setAttribute('class', 'plane');
        entityEy.setAttribute('mixin', 'plane');
        entityEy.setAttribute('rotation', '0 0 0');
        // entityEy.setAttribute('position', '3 0 2');
        // aframeScene.appendChild(entityEy);
       bBox.appendChild(entityEy);


        //  plano sagital
        entityEz.setAttribute('slice',{eje: 'z', depth: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 3,  sliceNum: 300});
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
        var loader = new THREE.NRRDLoader();
        loader.load(data.volumePath, this.onLoad);
    }
});


AFRAME.registerComponent('slice', {
    schema: {
        eje: {type: 'string'},
        depth: {type: 'int'},
        width: {type: 'int'},
        height: {type: 'int'},
        paso: {type: 'int'},
        id: {type: 'string'},
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
    }
});



