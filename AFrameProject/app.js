//Volume component
AFRAME.registerComponent('volume', {
    schema: {
        volumePath: {type: 'string'}
    },
    onLoad: function(volume){

        //Guardar datos en la entidad
        this.el.volumeData = volume; 
     
        
        /** 
         * Se debe crear los Slices y enlazar con el entidad actual
        */

        var coronalSlice = document.createElement('a-entity');
        coronalSlice.setAttribute('position', '0 0 0');
        coronalSlice.setAttribute('id', 'coronal');
        coronalSlice.setAttribute('coronal-slice', {nSlice: '70'});
        coronalSlice.setAttribute('mixin', 'plane');
        coronalSlice.setAttribute('rotation', '0 0 0');
        coronalSlice.setAttribute('dynamic-body', '');
        coronalSlice.setAttribute('class', 'plane');
        coronalSlice.setAttribute('nSlices', this.el.volumeData.dimensions[0]);  
        this.el.appendChild(coronalSlice);
         

        var AxialSlice = document.createElement('a-entity');
        //    AxialSlice.setAttribute('position', '2 0 -2');
        AxialSlice.setAttribute('position', '0 0 0');
        AxialSlice.setAttribute('axial-slice', "1");
        AxialSlice.setAttribute('id', 'axial');
        AxialSlice.setAttribute('mixin', 'plane');
        AxialSlice.setAttribute('rotation', '0 0 0');
        AxialSlice.setAttribute('dynamic-body', '');
        AxialSlice.setAttribute('class', 'plane');
        AxialSlice.setAttribute('nSlices', this.el.volumeData.dimensions[2]);
        this.el.appendChild(AxialSlice);

        var SagitalSlice = document.createElement('a-entity');
        //   SagitalSlice.setAttribute('position', '-2 0 -2');
        SagitalSlice.setAttribute('position', '0 0 0');
        SagitalSlice.setAttribute('sagital-slice', "1");
        SagitalSlice.setAttribute('id', 'sagital');
        SagitalSlice.setAttribute('mixin', 'plane');
        SagitalSlice.setAttribute('rotation', '0 0 0');
        SagitalSlice.setAttribute('dynamic-body', '');
        SagitalSlice.setAttribute('class', 'plane');
        SagitalSlice.setAttribute('nSlices', this.el.volumeData.dimensions[1]);
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