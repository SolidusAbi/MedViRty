function umbralizacion(){
    if(SelectExample() == '1'){
    var umbr = document.getElementById("umbralizacion").value;
    document.querySelector('#coronal').setAttribute('umbral', umbr);
    document.querySelector('#sagital').setAttribute('umbral', umbr);
    document.querySelector('#axial').setAttribute('umbral', umbr);
    document.querySelector('#volumenCompleto').setAttribute('volume', {volumePath: "data/CTChest.nrrd" , umbral : umbr}); 
    console.log("llega aqui"); 
    }else{
        var umbr = document.getElementById("umbralizacion").value;
        document.querySelector('#coronal').setAttribute('umbral', umbr);
        document.querySelector('#sagital').setAttribute('umbral', umbr);
        document.querySelector('#axial').setAttribute('umbral', umbr);
        //document.querySelector('#volumenCompleto').setAttribute('volume', {volumePath: "data/MRBrainTumor1.nrrd" , umbral : umbr});    
        document.querySelector('#volumenCompleto').setAttribute('volume', { umbral : umbr })
    }
}
