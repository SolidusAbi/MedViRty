//Volume component
AFRAME.registerComponent('volume', {
    schema: {
        volumePath: {type: 'string'}
    },
    onLoad: function(volume){

        //Guardar datos en la entidad
        this.el.volumeData = volume; //*Nuevo
        /** 
         * Se debe crear los Slices y enlazar con el entidad actual
        */

         var coronaLSlice = document.createElement('a-entity');
         coronaLSlice.setAttribute('position', '0 0 -2');
         coronaLSlice.setAttribute('id', 'coronal');
        // var nCoronalSlices = this.el.volumeData.dimensions[1];  Esto puede hacer falta para comprobaciones posteriores
         coronaLSlice.setAttribute('coronal-slice',"1");
         this.el.appendChild(coronaLSlice);

       var AxialSlice = document.createElement('a-entity');
       AxialSlice.setAttribute('position', '2 0 -2');
     //  AxialSlice.setAttribute('position', '0 0 -2');
       AxialSlice.setAttribute('axial-slice',"1");
       AxialSlice.setAttribute('id', 'axial');
       this.el.appendChild(AxialSlice);

       var SagitalSlice = document.createElement('a-entity');
       SagitalSlice.setAttribute('position', '-2 0 -2');
     //  SagitalSlice.setAttribute('position', '0 0 -2');
       SagitalSlice.setAttribute('sagital-slice',"1");
        SagitalSlice.setAttribute('id', 'sagital');
       this.el.appendChild(SagitalSlice);
    },

    init: function(){
        var data = this.data;

        var loader = new THREE.NRRDLoader();
        var self = this;
        var onLoad = function(volumeDataLoaded){
            alert("Se ha cargado el volumen");
            self.onLoad(volumeDataLoaded);
        };
        loader.load(data.volumePath, onLoad);
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