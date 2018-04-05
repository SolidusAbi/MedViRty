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
AFRAME.registerComponent('volume', {
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
	
});

AFRAME.registerComponent('slice', {
    schema: {
        volumePath: {type: 'string'}
    },
    onLoad: function(volume){
		var el=this.el;
		console.log(volume);
		
	},
    init: function(){
		var data = this.data;
		console.log("debajo"); 

		
		var loader = new THREE.NRRDLoader();
		loader.load(data.volumePath, this.onLoad);
    }
	
	

});



