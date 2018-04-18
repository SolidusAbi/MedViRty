var glob;

AFRAME.registerComponent('log', {
   schema: {type: 'string'},

   init: function(){
        var stringToLog = this.data;
        console.log(stringToLog)
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
		console.log(volume);

        var entityEx = document.createElement('a-entity');
        var entityEy = document.createElement('a-entity');
        var entityEz = document.createElement('a-entity');

		var extractedx = volume.extractPerpendicularPlane( 'xy', (volume.RASDimensions[0]/4) );
		var extractedy = volume.extractPerpendicularPlane( 'yz' ,(volume.RASDimensions[1]/2) );
		var extractedz = volume.extractPerpendicularPlane( 'xz', (volume.RASDimensions[2]/2) );


		var dataX = extractedx.matrix.elements;
	 	var dataY = extractedy.matrix.elements;
		var dataZ = extractedz.matrix.elements;
		glob = volume.data;

		//console.log(volume.data);
        entityEx.setAttribute('slice',{eje: 'yz', dat: dataX , sp: volume.zLength, width: volume.yLength, height: volume.zLength, color: '#7678ED'});
        aframeScene.appendChild(entityEx);
      //  entityEy.setAttribute('slice',{eje: 'yz', dat: dataY , sp: volume.zLength, width: volume.xLength, height: volume.yLength , color: '#F18701'});
      //  aframeScene.appendChild(entityEy);
    //    entityEz.setAttribute('slice',{eje: 'xz', dat: dataZ , sp: volume.zLength, width: volume.yLength, height: volume.xLength, color: '#A1F200'});
   //    aframeScene.appendChild(entityEz);

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
			color: {type: 'string'}
			},
		init: function(){
			var el=this.el;
			var data = this.data;
/*
			if(data.eje == 'xy') {
                var geometry = new THREE.PlaneGeometry(data.width, data.height).translate(0, 0, 100);
            }else if (data.eje == 'yz') {
                var geometry = new THREE.PlaneGeometry(data.width, data.height).translate(0, 0, 200);
            }else {
                var geometry = new THREE.PlaneGeometry(data.width, data.height)
            }*/
            var geometry = new THREE.PlaneGeometry(data.width, data.height);
            var mesh = textureF(geometry, data.width, data.height);
            console.log(data.width, data.height);
            el.setObject3D('mesh', mesh);
            console.log(this.el.sceneEl);
        }
});

function textureF (geometry, width, height){
		console.log("cosa");
    	console.log(glob);
		var i =0;
		var t=[glob.length];
		for(i; i< glob.length ; i++){
			t[i] = glob[i]/255;
		}
    	var size = width * height;
    	var dataColor = new Uint8Array( size * 3 );
    	for (var i = 0; i < size; i ++) {
        	dataColor[ i * 3 ]     = glob[i];
        	dataColor[ i * 3 + 1 ] = glob[i+1];
        	dataColor[ i * 3 + 2 ] = glob[i+2];
        	i++;
        	i++;
    	}
		console.log(t);
        var texture = new THREE.DataTexture(glob, width, height, THREE.RGBFormat);
    	texture.needsUpdate = true;
        var material = new THREE.MeshBasicMaterial({ wireframe: false, map : texture });
        var mesh = new THREE.Mesh(geometry, material);
    	//mesh.scale.x = -1;
        return mesh;
}
