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
        this.material = new THREE.MeshStandardMaterial({color:'red'});
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
        var el=this.el;
        var data = this.data;
        this.volume = volume;
        generalDataVolume = volume.data;
        //	console.log(volume);

        var volumenSelector = document.querySelector('#volumenCompleto');

        var bBox = document.createElement('a-entity');
        bBox.setAttribute('bbox', '');
        bBox.setAttribute('position', '0 0 -100');
       // bBox.setAttribute('geometry', 'height: 1; width: 1;');
        bBox.setAttribute('dynamic-body', '');
        bBox.setAttribute('id', 'bbox');
        bBox.setAttribute('scale', '100 100 100');

        bBox.setAttribute('stretchable', '');
        bBox.setAttribute('rotation', '0 0 0');
        volumenSelector.appendChild(bBox);

        var entityEx = document.createElement('a-entity');
        var entityEy = document.createElement('a-entity');
        var entityEz = document.createElement('a-entity');

        //plano de frente
        entityEx.setAttribute('slice',{eje: 'x', depth: volume.zLength, width: volume.xLength, height: volume.yLength, paso: 1, sliceNum: 1});
        entityEx.setAttribute('id', 'coronal');
        entityEx.setAttribute('class', 'plane');
        entityEx.setAttribute('mixin', 'plane');
        entityEx.setAttribute('rotation', '0 0 0');
        bBox.appendChild(entityEx);


        // de izq a derecha
        entityEy.setAttribute('slice',{eje: 'y', depth: volume.zLength, width: volume.xLength, height: volume.yLength , paso: 2,  sliceNum: 1});
        entityEy.setAttribute('class', 'plane');
        entityEy.setAttribute('id', 'axial');
        entityEy.setAttribute('mixin', 'plane');
        //  entityEy.setAttribute('scale', '1 1 1');
        entityEy.setAttribute('rotation', '0 0 0');
        bBox.appendChild(entityEy);


        //  de arriba a abajo
        entityEz.setAttribute('slice',{eje: 'z', depth: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 3,  sliceNum: 1});
        entityEz.setAttribute('class', 'plane');
        entityEz.setAttribute('mixin', 'plane');
        entityEz.setAttribute('id', "sagital");
        //   entityEz.setAttribute('scale', '1 1 1');
        entityEz.setAttribute('rotation', '0 0 0');
        // entityEz.setAttribute('position' , {x: 0, y: 0 , z: -400});
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
        var el=this.el;
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



