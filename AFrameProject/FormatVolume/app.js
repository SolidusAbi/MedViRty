//Volume component
AFRAME.registerComponent('volume', {
    schema: {
        volumePath: {type: 'string'},
        umbral: {type: 'int', default: 0}
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
        coronalSlice.setAttribute('umbral', this.data.umbral);
        coronalSlice.setAttribute('coronal-slice', {nSlice: '70', umbral: this.data.umbral});
        coronalSlice.setAttribute('mixin', 'plane');
        coronalSlice.setAttribute('rotation', '0 0 0');
        coronalSlice.setAttribute('dynamic-body', ''); 
        coronalSlice.setAttribute('class', 'plane');
        coronalSlice.setAttribute('nSlices', this.el.volumeData.dimensions[0]);  
        this.el.appendChild(coronalSlice);
         

        var AxialSlice = document.createElement('a-entity');
        //    AxialSlice.setAttribute('position', '2 0 -2');
        AxialSlice.setAttribute('position', '0 0 0');
        AxialSlice.setAttribute('axial-slice',  {nSlice: '70'});
        AxialSlice.setAttribute('umbral', this.data.umbral);
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
        SagitalSlice.setAttribute('umbral', this.data.umbral);
        SagitalSlice.setAttribute('sagital-slice',  {nSlice: '70'});
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
            self.onLoad(volumeDataLoaded);
        };
        loader.load(data.volumePath, onLoad);
    },
    update: function(){
        if (this.el.children.length > 0){
             //console.log(this.el.children.coronal);
            this.el.children.coronal.setAttribute('coronal-slice', {umbral: this.data.umbral})
        }
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