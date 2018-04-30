var generalDataVolume;

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
        generalDataVolume = volume.data;
		console.log(volume);

        var entityEx = document.createElement('a-entity');
        var entityEy = document.createElement('a-entity');
        var entityEz = document.createElement('a-entity');
/*
		var extractedx = volume.extractPerpendicularPlane( 'xy', (volume.RASDimensions[0]/4) );
		var extractedy = volume.extractPerpendicularPlane( 'yz' ,(volume.RASDimensions[1]/2) );
		var extractedz = volume.extractPerpendicularPlane( 'xz', (volume.RASDimensions[2]/2) );

        console.log("iyf");
	    console.log(volume.RASDimensions[0]/4);
		var dataX = extractedx.matrix.elements;
	 	var dataY = extractedy.matrix.elements;
		var dataZ = extractedz.matrix.elements;
*/

		entityEx.setAttribute('slice',{eje: 'x', sp: volume.zLength, width: volume.xLength, height: volume.yLength, dat: generalDataVolume, paso: 1});
        aframeScene.appendChild(entityEx);
        console.log(entityEx);
        entityEy.setAttribute('slice',{eje: 'y', dat: generalDataVolume , sp: volume.zLength, width: volume.xLength, height: volume.yLength , paso: 2});
        aframeScene.appendChild(entityEy);
        console.log(entityEy);
        entityEz.setAttribute('slice',{eje: 'z', dat: generalDataVolume , sp: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 3});
        aframeScene.appendChild(entityEz);
        console.log(entityEz);

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
            var e =data.width * data.height*135; /* e indica el slice que quieres mostrar, 135 es el primero de arriba, va hacia abajo */
			for (var i = 0; i < data.width * data.height; i++) {
                    elementos[i] = (generalDataVolume[e + i] + 3024 + 6048);

			}
            var mesh = textureF(geometry, data.width, data.height, elementos, data.paso);
            el.setObject3D('mesh', mesh);
            console.log(this.el.sceneEl);
        }
});

function rotateObject(object, degreeX, degreeY, degreeZ){

    degreeX = (degreeX * Math.PI)/180;
    degreeY = (degreeY * Math.PI)/180;
    degreeZ = (degreeZ * Math.PI)/180;

    object.rotateX(degreeX);
    object.rotateY(degreeY);
    object.rotateZ(degreeZ);

}
