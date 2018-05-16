var generalDataVolume;

AFRAME.registerComponent('log', {
   schema: {type: 'string'},

   init: function(){
        var stringToLog = this.data;
     //   console.log(stringToLog)
    }
});

//Volume component
AFRAME.registerComponent('volume', {
    schema: {
        volumePath: {type: 'string'}
    },
    onLoad: function(volume){
		var el=this.el;
		this.volume = volume;
        generalDataVolume = volume.data;
		console.log(volume);


        var prueba = document.createElement('a-entity');
        prueba.setAttribute('prueba2',{color: 'blue'});
        aframeScene.appendChild(prueba);


        var entityEx = document.createElement('a-entity');
        var entityEy = document.createElement('a-entity');
        var entityEz = document.createElement('a-entity');

		entityEx.setAttribute('slice',{eje: 'x', depth: volume.zLength, width: volume.xLength, height: volume.yLength, paso: 1});
        aframeScene.appendChild(entityEx);
       // console.log(entityEx);
          entityEy.setAttribute('slice',{eje: 'y', depth: volume.zLength, width: volume.xLength, height: volume.yLength , paso: 2});
         aframeScene.appendChild(entityEy);
       // de izq a derecha
        entityEz.setAttribute('slice',{eje: 'z', depth: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 3});
        aframeScene.appendChild(entityEz);
      //  de arriba a abajo
    },

    init: function(){

		var data = this.data;
		var loader = new THREE.NRRDLoader();
		loader.load(data.volumePath, this.onLoad);
		var el = this.el;
    }

});

AFRAME.registerComponent('prueba2', {
    schema:{
        color: {type: 'string'},

    },
    init:function () {
        var el=this.el;
        console.log("holaelcubo")
        var data = this.data;
        var geometry = new THREE.BoxGeometry( 100, 100, 100 );
        var material = new THREE.MeshBasicMaterial( {color: data.color} );
        var cube = new THREE.Mesh( geometry, material );
        el.setObject3D('cube', cube);

        el.addEventListener('mouseenter', function () {
            el.setAttribute('color','red');
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('color', data.color);
        });
    }
});


AFRAME.registerComponent('slice', {
		schema: {
			eje: {type: 'string'},
			depth: {type: 'int'},
			width: {type: 'int'},
			height: {type: 'int'},
			paso: {type: 'int'}
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
            el.setObject3D('mesh', mesh);
//            console.log(this.el.sceneEl);

        }
});


