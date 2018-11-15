function umbralizacion(){
    if(SelectExample() == '1'){
    var umbr = document.getElementById("umbralizacion").value;
    document.querySelector('#coronal').setAttribute('umbral', umbr);
    document.querySelector('#sagital').setAttribute('umbral', umbr);
    document.querySelector('#axial').setAttribute('umbral', umbr);
    document.querySelector('#volumenCompleto').setAttribute('volume', {volumePath: "data/CTChest.nrrd" , umbral : umbr}); 
    document.getElementById("range").value = umbr;
    }else{
        var umbr = document.getElementById("umbralizacion").value;
        if(umbr == ""){
            console.log("roto");
        }
        console.log(umbr);
        document.querySelector('#coronal').setAttribute('umbral', umbr);
        document.querySelector('#sagital').setAttribute('umbral', umbr);
        document.querySelector('#axial').setAttribute('umbral', umbr);
        //document.querySelector('#volumenCompleto').setAttribute('volume', {volumePath: "data/MRBrainTumor1.nrrd" , umbral : umbr});    
        document.querySelector('#volumenCompleto').setAttribute('volume', { umbral : umbr })
        document.getElementById("range").value = umbr;
    }
}

function changeBar(){
    var umbr = document.getElementById("umbralizacion").value;
    var Bar = document.getElementById("range").value;
    document.getElementById("umbralizacion").value = Bar;
    umbralizacion();
}
