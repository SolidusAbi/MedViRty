AFRAME.registerComponent('log', {
    schema: {type: 'string'},
    init: function(){
        var stringToLog = this.el.sceneEl.camera.projectionMatrix;
        console.log(stringToLog)
    }
});


function typeOfData( data ){
    var d = data.substr(5,2);
    return d;
}