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

        var entityEx = document.createElement('a-entity');
        var entityEy = document.createElement('a-entity');
        var entityEz = document.createElement('a-entity');

		entityEx.setAttribute('slice',{eje: 'x', sp: volume.zLength, width: volume.xLength, height: volume.yLength, dat: generalDataVolume, paso: 1});
        aframeScene.appendChild(entityEx);
      //  console.log(entityEx);
        entityEy.setAttribute('slice',{eje: 'y', dat: generalDataVolume , sp: volume.zLength, width: volume.xLength, height: volume.yLength , paso: 2});
        aframeScene.appendChild(entityEy);
       // console.log(entityEy);
        entityEz.setAttribute('slice',{eje: 'z', dat: generalDataVolume , sp: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 3});
        aframeScene.appendChild(entityEz);
      //  console.log(entityEz);

    },

    init: function(){
		var data = this.data;
		var loader = new THREE.NRRDLoader();
		loader.load(data.volumePath, this.onLoad);
		var el = this.el;
    }

});

AFRAME.registerComponent('slice', {
		schema: {
			eje: {type: 'string'},
			dat:{type: 'array'},
			sp: {type: 'int'},
			width: {type: 'int'},
			height: {type: 'int'},
			paso: {type: 'int'}
			},
		init: function(){
			var el=this.el;
			var data = this.data;
            var geometry = new THREE.PlaneGeometry(data.width, data.height);
            var elementos = new Uint8Array( 3 * data.width *data.height );
            var mesh = selectData(geometry, data.width, data.height, data.sp, elementos,data.paso);
            el.setObject3D('mesh', mesh);
//            console.log(this.el.sceneEl);

        }
});