var generalDataVolume;

AFRAME.registerComponent('log', {
    schema: {type: 'string'},
    init: function(){
        var stringToLog = this.el.sceneEl.camera.projectionMatrix;
        console.log(stringToLog)
    }
});

//Volume component
AFRAME.registerComponent('volume', {
    schema: {
        volumePath: {type: 'string'},
        equis1:{type:'int', default: '100'},
        equis2:{type:'int', default: '100'},
        equis2:{type:'int', default: '100'}
    },
    onLoad: function(volume){
        var el=this.el;
        var data = this.data;
        this.volume = volume;
        generalDataVolume = volume.data;
        //	console.log(volume);

        var entityEx = document.createElement('a-entity');
        var entityEy = document.createElement('a-entity');
        var entityEz = document.createElement('a-entity');

        //plano de frente
        entityEx.setAttribute('slice',{eje: 'x', depth: volume.zLength, width: volume.xLength, height: volume.yLength, paso: 1});
        entityEx.setAttribute('id', 'coronal');
        entityEx.setAttribute('class', 'plane');
        entityEx.setAttribute('mixin', 'plane');
        entityEx.setAttribute('rotation', '0 0 0');
        entityEx.setAttribute('scale', '1 1 1');
        entityEx.setAttribute('position' , {x: 0, y: 0 , z: -400});
        aframeScene.appendChild(entityEx);


        // de izq a derecha
        entityEy.setAttribute('slice',{eje: 'y', depth: volume.zLength, width: volume.xLength, height: volume.yLength , paso: 2});
        entityEy.setAttribute('class', 'plane');
        entityEy.setAttribute('id', 'axial');
        entityEy.setAttribute('mixin', 'plane');
        entityEy.setAttribute('scale', '1 1 1');
        entityEy.setAttribute('rotation', '0 0 0');
        entityEy.setAttribute('position' , {x: 0, y: -14 , z: -500});
        aframeScene.appendChild(entityEy);

        //  de arriba a abajo
        entityEz.setAttribute('slice',{eje: 'z', depth: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 3});
        entityEz.setAttribute('class', 'plane');
        entityEz.setAttribute('mixin', 'plane');
        entityEz.setAttribute('id', "sagital");
        entityEz.setAttribute('scale', '1 1 1');
        entityEz.setAttribute('rotation', '0 0 0');
        entityEz.setAttribute('position' , {x: 0, y: 0 , z: -400});
        aframeScene.appendChild(entityEz);
    },

    init: function(){

        var data = this.data;
        var loader = new THREE.NRRDLoader();
        loader.load(data.volumePath, this.onLoad);
       // var el = this.el;
    }
});

AFRAME.registerComponent('slice', {
    schema: {
        eje: {type: 'string'},
        depth: {type: 'int'},
        width: {type: 'int'},
        height: {type: 'int'},
        paso: {type: 'int'},
        id: {type: 'string'}
    },
    init: function(){
        var el=this.el;
        var data = this.data;
        if(data.paso == 1) {
            var mesh = selectDataCoronal(data.width, data.height, data.depth,data.paso);
        }else
        if(data.paso == 2) {
            var mesh = selectDataAxial(data.width, data.height, data.depth, data.paso);
        }else
        if(data.paso == 3) {
            var mesh = selectDataSagital(data.width, data.height, data.depth,data.paso);
        }

        this.el.setObject3D('mesh', mesh);
        console.log(this.el);
    }
});


