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

		var extractedx = volume.extractPerpendicularPlane( 'x', (volume.RASDimensions[0]/4) );	
		var extractedy = volume.extractPerpendicularPlane( 'y', (volume.RASDimensions[1]/2) );	
		var extractedz = volume.extractPerpendicularPlane( 'z', (volume.RASDimensions[2]/2) );
		
		var dataX = extractedx.matrix.elements;
		var dataY = extractedy.matrix.elements;
		var dataZ = extractedz.matrix.elements;		
			
		var entityEx = document.createElement('a-entity');
		var entityEy = document.createElement('a-entity');
		var entityEz = document.createElement('a-entity');
		
		entityEx.setAttribute('slice',{eje: 'x', dat: dataX , sp: volume.yLength, width: volume.zLength, height: volume.xLength});
		entityEy.setAttribute('slice',{eje: 'y', dat: dataY , sp: volume.zLength, width: volume.xLength, height: volume.yLength});
		entityEz.setAttribute('slice',{eje: 'z', dat: dataZ , sp: volume.xLength, width: volume.yLength, height: volume.zLength});
		
		var prism = document.querySelector('a-scene');
		prism.appendChild(entityEx);
		prism.appendChild(entityEy);
		prism.appendChild(entityEz);
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
			width: {type: 'array'},
			height: {type: 'array'}
			},
		init: function(){	
			var el=this.el;
			var data = this.data; 
			
			var geometry = new THREE.PlaneGeometry(data.width,data.height);
			var material = new THREE.MeshBasicMaterial({color: 0xffff00});
			this.mesh = new THREE.Mesh(geometry, material);
			this.planeHelper = new THREE.PlaneHelper( this.mesh );
			el.setObject3D('mesh', this.mesh);
			
			console.log(this.el.sceneEl);  // Reference to the scene element.
		}
		});