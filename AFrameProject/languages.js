function changeLeng(language) {
    localStorage.setItem("language", language);
    setIdiomaInIndex();
}

function setIdiomaInIndex() {

    var language = localStorage.getItem("language");
    if(language == null ){
        language = "ES";
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

    if (language == "EN") {
        text1 = "Medical images viewer";
        text2 = "Description";
        text3 = "In this page you can visualize different medical images, from different pathologies, with which to interact in a Virtual Reality environment. Examples:";
        text4 = "Select an example";
        text5 = "CT example";
        text6 = "Accept";
        text7 = "MRI example";
        text8 = "Sara’s TFG about";
        text9 = "This work has been developed with the support of the Cátedra de Tecnologías Médicas of the Universidad de Las Palmas de Gran Canaria and in collaboration with the MacBiolDi project.";
        text10 = "Legal warning";
    } else if (language == "FR") {
        text1 = "Visualisation d'images médicales";
        text2 = "Description";
        text3 = "Dans cette page, vous pouvez visualiser différentes images médicales, de différentes pathologies, avec lesquelles interagir dans un environnement de réalité virtuelle. Exemples:";
        text4 = "Sélectionnez un exemple";
        text5 = "CT exemple";
        text6 = "Accepter";
        text7 = "IRM exemple";
        text8 = "Le TFG de Sara à propos de";
        text9 = "Ce travail a été développé avec le soutien de la Cátedra de Tecnologías Médicas de l’Université de Las Palmas de Grande Canarie et en collaboration avec le projet MacBiolDi.";
        text10 = "Avertissement légal";
    } else if (language == "ES") {
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
    } else if(language == "PT"){
        text1 = "Visualizador de imagens médicas";
        text2 = "Descrição";
        text3 = "Nesta página você pode visualizar diferentes imagens médicas, de diferentes patologias, com as quais interage em um ambiente de Realidade Virtual. Exemplos:";
        text4 = "Selecione um exemplo";
        text5 = "CT exemplo";
        text6 = "Aceitar";
        text7 = "MRI exemplo";
        text8 = "Sobre o TFG Sara";
        text9 = "Este trabalho foi desenvolvido com o apoio da Cátedra de Tecnologias Médicas da Universidade de Las Palmas de Gran Canaria e em colaboração com o projeto MacBiolDi.";
        text10 = "Aviso Legal";
    }
    console.log(language);
    document.querySelector("#text1").innerHTML = text1;
    document.querySelector("#text2").innerHTML = text2;
    document.querySelector("#text3").innerHTML = text3;
    document.querySelector("#text4").innerHTML = text4;
    document.querySelector("#text5").innerHTML = text5;
    document.querySelector("#text6").innerHTML = text6;
    document.querySelector("#text6-2").innerHTML = text6;
    document.querySelector("#text7").innerHTML = text7;
    document.querySelector("#text8").innerHTML = text8;
    document.querySelector("#text9").innerHTML = text9;
    document.querySelector("#text10").innerHTML = text10;


}

function changeLanguageOfMenu() {
    if(language == null ){
        language = "ES";
    }
    if (language == "EN") {
        text1 = "Rotate";
        text2 = "Zoom In";
        text3 = "Zoom out";
        text4 = "Switch plane";
        text5 = "Reset";

        text6 = "Visualization and treatment of images";
        text7 = "Threshold";
        text8 = "The threshold must be numeric greater than 0";
        text9 = "Options";

        text10 = "Reset";
        text11 = "Rotate";
        text12 = "Switch plane";
        text13 = "Zoom In";
        text14 = "Zoom out";
        text15 = "Main page";
    } else if (language == "ES") {
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
    }else if(language == "PT"){
        text1 = "Rodar";
        text2 = "Ampliar";
        text3 = "Reduzir";
        text4 = "Mudar de plano";
        text5 = "Reset";

        text6 = "Visualização e tratamento de imagens";
        text7 = "Limiarização";
        text8 = "O limite deve ser numérico maior que 0";
        text9 = "Opções";


        text10 = "Reset";
        text11 = "Rodar";
        text12 = "Mudar de plano";
        text13 = "Ampliar";
        text14 = "Reduzir";
        text15 = "Página inicial";

    }else if(language == "FR"){
        text1 = "Tourner";
        text2 = "Zoomer";
        text3 = "Dézoomer";
        text4 = "Changer le plan";
        text5 = "Réinitialiser";

        text6 = " Visualisation et traitement des images.";
        text7 = "Seuil";
        text8 = "Le seuil doit être numérique supérieur à 0";
        text9 = "Options";


        text10 = "Réinitialiser";
        text11 = "Tourner";
        text12 = "Changer le plan";
        text13 = "Zoomer";
        text14 = "Dézoomer";
        text15 = "page d'accueil";
    }


    /* document.querySelector("#a").setAttribute('text', { value: text1 }); */
    /* document.querySelector("#b").setAttribute('text', { value: text2 }); */
    /* document.querySelector("#c").setAttribute('text', { value: text3 }); */
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
    var language = localStorage.getItem("language");

    if(language == null){
        language = "ES";
    }

    if (language == "EN") {
        text1 = "Legal warning";
        text2 = "Intellectual property";
        text3 = "The intellectual property is compose of a number of rights of personal and / or patrimonial nature that attribute to the author and other owners the disposition and exploitation of their works and services. The intellectual property of this project applies on its author as well as its tutors";
        text4 = "License";
        text5 = "A license is a contract whereby one person receives from another the right to use, copy, distribute, study and modification (in the case of Free Software) of several of their assets, usually of a non-tangible or intellectual nature, it could also be given in exchange for the payment of a certain amount for their use. These assets are property of the grantor, and may be intellectual property such as a trademark, patents or technologies. Other intangible assets may also be licensed.";
        text6 = "All the elements included in this work are distributed under MIT or BSD license. These licenses can be found at:";
    }else 
    if (language == "ES") {
        text1 = "Aviso Legal";
        text2 = "Propiedad Intelectual";
        text3 = "La propiedad intelectual está integrada por una serie de derechos de carácter personal y/o patrimonial que atribuyen al autor y a otros titulares la disposición y explotación de sus obras y prestaciones.\nLa propiedad intelectual de este proyecto recae en el autor del mismo,Sara Arribas del Rosario así como sus tutores José Daniel Hernández Sosa y Abián Hernández Guedes";
        text4 = "Licencias";
        text5 = "Una licencia es un contrato mediante el cual una persona recibe de otra el derecho de uso, de copia,de distribución, de estudio y de modificación (en el caso del Software Libre) de varios de sus bienes,normalmente de carácter no tangible o intelectual, pudiendo darse a cambio del pago de un monto determinado por el uso de los mismos.\nEstos activos son propiedad del otorgante, y pueden ser bienes de propiedad intelectual como una marca,patentes o tecnologías. También pueden ser objeto de licencia otros bienes de carácter intangible.";
        text6 = "Todos los elementos incluidos en el trabajo están bajo la licencia MIT o BSD. Dichas licencias las podemos encontrar en los siguientes enlaces: ";
    } else 
    if(language == "PT"){
        text1 = "Aviso Legal";
        text2 = "Propriedade intelectual";
        text3 = "A propriedade intelectual é composta de uma série de direitos de natureza pessoal e / ou patrimonial que atribuem ao autor e a outros proprietários a disposição e a exploração de suas obras e serviços. A propriedade intelectual deste projeto recai sobre o autor do mesmo, bem como seus tutores.";
        text4 = "Licença";
        text5 = "Uma licença é um contrato pelo qual uma pessoa recebe de outra o direito de usar, copiar, distribuir, estudar e modificar (no caso do Software Livre) vários de seus ativos, geralmente de natureza não tangível ou intelectual, pode ser dado em troca do pagamento de uma certa quantia pelo uso destes. Esses ativos são de propriedade do concedente e podem ser propriedade intelectual, como marcas, patentes ou tecnologias. Outros ativos intangíveis também podem ser licenciados.";
        text6 = "Todos os elementos incluídos no trabalho são distribuídos licença BSD. Essas licenças podem ser encontradas nos seguintes links:"
    }else
    if (language == "FR") {
        text1 = "Avertissement légal";
        text2 = "Propriété intellectuelle";
        text3 = "La propriété intellectuelle est composée d’un certain nombre de droits de la personne et / ou de nature patrimoniale  qui attribuent à l’auteur et aux autres propriétaires la disposition et l’exploitation de leurs œuvres et services. La propriété intellectuelle de ce projet s'applique à son auteur ainsi qu'à ses tuteurs.";
        text4 = "Licence";
        text5 = "Une licence est un contrat par lequel une personne reçoit d'une autre personne le droit d'utiliser, de copier, de distribuer, d'étudier et de modifier (dans le cas des logiciels libres) plusieurs de ses actifs, généralement de nature non matérielle ou intellectuelle, il pourrait également être donné en échange du paiement d'un certain montant pour leur utilisation. Ces actifs sont la propriété du cédant et peuvent être une propriété intellectuelle telle qu'une marque, des brevets ou des technologies. D'autres actifs incorporels peuvent également être concédés sous licence.";
        text6 = "Tous les éléments inclus dans ce travail sont distribués sous licence MIT ou BSD. Ces licences sont disponibles sur: ";
    }

    document.querySelector("#AL").innerHTML = text1;
    document.querySelector("#PI").innerHTML = text2;
    document.querySelector("#PIntel1").innerHTML = text3;
    document.querySelector("#lic").innerHTML = text4;
    document.querySelector("#PIntel2").innerHTML = text5;
    document.querySelector("#PIntel3").innerHTML = text6;
    

}
