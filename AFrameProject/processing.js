function umbralizacion(){
    if(SelectExample() == '1'){
    var umbr = document.getElementById("umbralizacion").value;
    document.querySelector('#volumenCompleto').setAttribute('volume', { umbral : umbr })
    document.getElementById("range").value = umbr;
    }else{
        var umbr = document.getElementById("umbralizacion").value;
        if(parseInt(umbr)>=0){
            document.getElementById('ControlJS').style.visibility ='hidden';
            document.querySelector('#volumenCompleto').setAttribute('volume', { umbral : umbr })
            document.getElementById("range").value = umbr;
        }else{
            document.getElementById('ControlJS').style.visibility ='visible';
        }           
       
    }
}

function changeBar(){
    var umbr = document.getElementById("umbralizacion").value;
    var Bar = document.getElementById("range").value;
    document.getElementById("umbralizacion").value = Bar;
    umbralizacion();
}
