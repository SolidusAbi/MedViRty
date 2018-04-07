/*Components modularize code, make logic and behavior visible from HTML, 
 and ensure that code is executed at the correct time*/

AFRAME.registerComponent('log', {
   schema: {type: 'string'},
   
   init: function(){
        var stringToLog = this.data;
        console.log(stringToLog)
    }
});


//if we were working within a component, we’d already have a reference to 
//the scene element without needing to query. All entities have reference 
//to their scene element

AFRAME.registerComponent('foo', {
    init: function () {
        console.log(this.el.sceneEl);  // Reference to the scene element.
    }
});

//Volume component
/*AFRAME.registerComponent('volume', {
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},
        color: {type: 'color', default: '0x00ff00'}
    },
    
    init: function(){
        var data = this.data;
        console.log(this.data);
        var el = this.el;
        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.boxHelper = new THREE.BoxHelper( this.mesh );
        el.setObject3D('mesh', this.boxHelper);
        console.log(this.el.sceneEl);  // Reference to the scene element.
    }
	
});*/
//slice component
AFRAME.registerComponent('volume', {
		
    schema: {
        volumePath: {type: 'string'}
    },
    onLoad: function(volume){
		var el=this.el;
		this.volume = volume;
		console.log(volume);
		
		var i=52626598;
		for	( i ; i<52626603 ; i++){
		var extracted = volume.extractPerpendicularPlane( 'x', (volume.RASDimensions[i]/4) );
	
		var dimensions =[volume.xLength , volume.yLength, volume.zLength];
		console.log(extracted);
		var arrayData = extracted.matrix.elements;
		entityEl.setAttribute('slice',{eje: 'x' , index: i , dat: arrayData , dim: dimensions});		
		}
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
			index: {type: 'string'},
			dat:{type: 'array'},
			dim: {type: 'array'}
			},
		init: function(){	
			var el=this.el;
			var data = this.data; 

			this.geometry = new THREE.PlaneGeometry(data.dim[0], 1 , data.dim[2]);
			var mat = this.geometry.applyMatrix(data.dat);
			console.log(mat);
			this.material = new THREE.MeshStandardMaterial({color: data.color});
			this.mesh = new THREE.Mesh(this.geometry, this.material);
			this.boxHelper = new THREE.BoxHelper( this.mesh );
			el.setObject3D('mesh', this.boxHelper);
			console.log(this.el.sceneEl);  // Reference to the scene element.
		
			this.geometry2 = new THREE.BoxBufferGeometry(data.dim[0], data.dim[1], data.dim[2]);
			this.material2 = new THREE.MeshStandardMaterial({color: data.color});
			this.mesh2 = new THREE.Mesh(this.geometry2, this.material2);
			this.boxHelper2 = new THREE.BoxHelper( this.mesh2 );
			el.setObject3D('mesh2', this.boxHelper2);
			console.log(this.el.sceneEl);
		}
		});

