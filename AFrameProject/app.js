/*Components modularize code, make logic and behavior visible from HTML,
 and ensure that code is executed at the correct time*/

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

		var extractedx = volume.extractPerpendicularPlane( 'x', (volume.RASDimensions[0]/4) );
		var extractedy = volume.extractPerpendicularPlane( 'y', (volume.RASDimensions[1]/2) );
		var extractedz = volume.extractPerpendicularPlane( 'z', (volume.RASDimensions[2]/2) );

		var dataX = extractedx.matrix.elements;
	 	var dataY = extractedy.matrix.elements;
		var dataZ = extractedz.matrix.elements;

        entityEx.setAttribute('slice',{eje: 'x', dat: dataX , sp: volume.yLength, width: volume.zLength, height: volume.xLength, color: '#7678ED'});
        aframeScene.appendChild(entityEx);
        entityEy.setAttribute('slice',{eje: 'y', dat: dataY , sp: volume.zLength, width: volume.xLength, height: volume.yLength , color: '#F18701'});
        aframeScene.appendChild(entityEy);
        entityEz.setAttribute('slice',{eje: 'z', dat: dataZ , sp: volume.xLength, width: volume.yLength, height: volume.zLength, color: '#A1F200'});
        aframeScene.appendChild(entityEz);
        console.log(entityEx , entityEy ,   entityEz , entityEl);

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

			var geometry = new THREE.PlaneGeometry(data.width,data.height);
			var material = new THREE.MeshBasicMaterial({color: data.color});
			this.mesh = new THREE.Mesh(geometry, material);
			this.planeHelper = new THREE.PlaneHelper( this.mesh );
			el.setObject3D('mesh', this.mesh);
            console.log(this.el.sceneEl);

        }
		});