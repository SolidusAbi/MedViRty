function umbralizacion(){
    if(SelectExample() == '1'){
    var umbr = document.getElementById("umbralizacion").value;
    document.querySelector('#volumenCompleto').setAttribute('volume', { umbral : umbr })
    document.getElementById("range").value = umbr;
    }else{
        var umbr = document.getElementById("umbralizacion").value;
        if(umbr == ""){
            console.log("roto");
        }           
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
