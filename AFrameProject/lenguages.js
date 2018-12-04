function changeLeng(lenguage) {
    localStorage.setItem("lenguage", lenguage);
    setIdiomaInIndex();
}

function setIdiomaInIndex() {

    var lenguage = localStorage.getItem("lenguage");
    if(lenguage == null){
        lenguage = "ES";
    }

    var text1;
    var text2;
    var text3;
    var text4;
    var text5;
    var text6;
    var text7;
    var text8;
    var text9;
    var text10;

    if (lenguage == "EN") {
        console.log(lenguage);
        text1 = "hola1";
        text2 = "hola2";
        text3 = "hola3";
        text4 = "hola4";
        text5 = "hola5";
        text6 = "hola6";
        text7 = "hola7";
        text8 = "hola8";
        text9 = "hola9";
        text10 = "hola9";
    } else if (lenguage == "FR") {
        text1 = "hola1";
        text2 = "hola2";
        text3 = "hola3";
        text4 = "hola4";
        text5 = "hola5";
        text6 = "hola6";
        text7 = "hola7";
        text8 = "hola8";
        text9 = "hola9";
        text10 = "hola9";
    } else if (lenguage == "ES") {
        text1 = "Visualizador de imágenes médicas";
        text2 = "Descripción";
        text3 = "En esta página se podrá visualizar diferentes imágenes médicas, de diferentes patologías, con las que podremos interactuar en Realidad Virtual. Esto nos permitirá una mayor\ninmersión y concentración en su estudio. Para ello, se ha propuesto los siguientes dos ejemplos:";
        text4 = "Seleccione un ejemplo";
        text5 = "Ejemplo de CT";
        text6 = "Aceptar";
        text7 = "Ejemplo de MRI";
        text8 = "Acerca de TFG sara";
        text9 = "Este TFG ha sido desarrollado en colaboración con la cátedra de tecnologías médicas de la\nuniversidad de las palmas de gran canaria y por el proyecto MacBiolDi.";
        text10 = "Aviso Legal";
    }

    document.querySelector("#text1").innerHTML = text1;
    document.querySelector("#text2").innerHTML = text2;
    document.querySelector("#text3").innerHTML = text3;
    document.querySelector("#text4").innerHTML = text4;
    document.querySelector("#text5").innerHTML = text5;
    document.querySelector("#text6").innerHTML = text6;
    document.querySelector("#text7").innerHTML = text7;
    document.querySelector("#text8").innerHTML = text6;
    document.querySelector("#text9").innerHTML = text9;
    document.querySelector("#text10").innerHTML = text10;


}

function changeLenguageOfMenu() {

    if (lenguage == "EN") {
        text1 = "hola1";
        text2 = "hola2";
        text3 = "hola3";
        text4 = "hola4";
        text5 = "hola5";

        text6 = "hola1";
        text7 = "hola2";
        text8 = "hola3";
        text9 = "Cagoento";


        text10 = "hola4";
        text11 = "hola5";
        text12 = "hola4";
        text13 = "hola5";
        text14 = "hola4";
        text15 = "hola5";
    } else if (lenguage == "ES") {
        text1 = "Rotar";
        text2 = "Agrandar";
        text3 = "Disminuir";
        text4 = "C.Planos";
        text5 = "Reset";

        text6 = "Visualización y tratamiento de imágenes";
        text7 = "Umbralización";
        text8 = "El umbral debe ser numérico mayor que 0";
        text9 = "Opciones";


        text10 = "Reset";
        text11 = "Rotar";
        text12 = "Cambiar planos";
        text13 = "Agrandar";
        text14 = "Disminuir";
        text15 = "Página principal";
    }
    document.querySelector("#a").setAttribute('text', { value: text1 });
    document.querySelector("#b").setAttribute('text', { value: text2 });
    document.querySelector("#c").setAttribute('text', { value: text3 });
    document.querySelector("#d").setAttribute('text', { value: text4 });
    document.querySelector("#e").setAttribute('text', { value: text5 });

    document.querySelector("#titulo").innerHTML = text6;
    document.querySelector("#textumb").innerHTML = text7;
    document.querySelector("#ControlJS").innerHTML = text8;
    document.querySelector("#options").innerHTML = text9;


    document.querySelector("#button1").innerHTML = text10;
    document.querySelector("#button2").innerHTML = text11;
    document.querySelector("#button3").innerHTML = text12;
    document.querySelector("#button4").innerHTML = text13;
    document.querySelector("#button5").innerHTML = text14;
    document.querySelector("#button6").innerHTML = text15;
}


function ChangeAdvice(){
    var lenguage = localStorage.getItem("lenguage");

    if(lenguage == null){
        lenguage = "ES";
    }

    if (lenguage == "EN") {
        text1 = "hola1";
        text2 = "hola2";
        text3 = "hola3";
        text4 = "hola4";
        text5 = "hola5";
        text6 = "hola6";
    }

    if (lenguage == "ES") {
        text1 = "Aviso Legal";
        text2 = "Propiedad Intelectual";
        text3 = "La propiedad intelectual está integrada por una serie de derechos de carácter personal y/o patrimonial que atribuyen al autor y a otros titulares la disposición y explotación de sus obras y prestaciones.\nLa propiedad intelectual de este proyecto recae en el autor del mismo,Sara Arribas del Rosario así como sus tutores José Daniel Hernández Sosa y Abián Hernández Guedes";
        text4 = "Licencias";
        text5 = "Una licencia es un contrato mediante el cual una persona recibe de otra el derecho de uso, de copia,de distribución, de estudio y de modificación (en el caso del Software Libre) de varios de sus bienes,normalmente de carácter no tangible o intelectual, pudiendo darse a cambio del pago de un monto determinado por el uso de los mismos.\nEstos activos son propiedad del otorgante, y pueden ser bienes de propiedad intelectual como una marca,patentes o tecnologías. También pueden ser objeto de licencia otros bienes de carácter intangible.";
        text6 = "Todos los elementos incluidos en el trabajo están bajo la licencia MIT o BSD. Dichas licencias las podemos encontrar en los siguientes enlaces: ";
    }

    document.querySelector("#AL").innerHTML = text1;
    document.querySelector("#PI").innerHTML = text2;
    document.querySelector("#PIntel1").innerHTML = text3;
    document.querySelector("#lic").innerHTML = text4;
    document.querySelector("#PIntel2").innerHTML = text5;
    document.querySelector("#PIntel3").innerHTML = text6;
    

}
