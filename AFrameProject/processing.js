function umbralizacion(e){
    var umbr;
    switch (e.id){
        case "umbralizacion":
            umbr = e.value;
            p = umbr / 255;
            break;
        case "range":
            umbr = e.value;
            p = umbr / 255;
            break;
        case "slider":
            var p = e.components["gui-slider"].data.percent;
            umbr = parseInt(p * 255);
            break;
    }

    var updateEvt = new CustomEvent("updateSlider");

    if(parseInt(umbr)>=0){
        document.getElementById('ControlJS').style.visibility ='hidden';
        document.querySelector('#volumenCompleto').setAttribute('volume', { umbral : umbr })
        switch (e.id){
            case "umbralizacion":
                document.getElementById("range").value = umbr;
                document.getElementById("slider").components["gui-slider"].data.percent = p;
                document.getElementById("slider").dispatchEvent(updateEvt);
                break;
            case "range":
                document.getElementById("umbralizacion").value = umbr;
                document.getElementById("slider").components["gui-slider"].data.percent = p;
                document.getElementById("slider").dispatchEvent(updateEvt);
                break;
            case "slider":
                document.getElementById("umbralizacion").value = umbr;
                document.getElementById("range").value = umbr;
                break;
        }
    }else{
        document.getElementById('ControlJS').style.visibility ='visible';
    }
}
/* No necesario gracias a la nueva funcion -----------
function umbralizacion(e){
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

function changeBar(e){
    var umbr = document.getElementById("umbralizacion").value;
    var Bar = document.getElementById("range").value;
    document.getElementById("umbralizacion").value = Bar;
    umbralizacion(e);
} */
