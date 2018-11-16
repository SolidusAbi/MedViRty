
function rotateVolume(){

    var boxM = document.querySelector('#volumenCompleto');
    var aux1 = boxM.getAttribute('rotation');

    aux1.x= aux1.x +40;
    // aux1.y= aux1.y +40;
    // aux1.z= aux1.z +40;
    aux1.y= aux1.y;
    aux1.z= aux1.z;

    boxM.setAttribute('rotation',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    rotateVolume();
}

function bigVolume(){

    var boxM = document.querySelector('#volumenCompleto');
    var aux1 = boxM.getAttribute('scale');

    aux1.x= aux1.x +10;
    aux1.y= aux1.y +10;
    aux1.z= aux1.z +10;

    boxM.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
}

function smallVolume(){

    var boxM = document.querySelector('#volumenCompleto');
    var aux1 = boxM.getAttribute('scale');

    aux1.x= aux1.x -10;
    aux1.y= aux1.y -10;
    aux1.z= aux1.z -10;

    boxM.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
}

function reset(){

    var boxM = document.querySelector('#volumenCompleto');
    boxM.setAttribute('scale',{x: 16 ,y: 16 ,z: 5});
    boxM.setAttribute('rotation',{x: 0, y: 0 ,z: 0});
    boxM.setAttribute('position',{x: 0, y: 0 ,z: -19});


    var planoCoronal = document.querySelector('#coronal');
    var planoSagital = document.querySelector('#sagital');
    var planoAxial = document.querySelector('#axial');
    planoSagital.setAttribute('position',{x: 0, y: 0 ,z: 0});
    planoCoronal.setAttribute('position',{x: 0, y: 0 ,z: 0});
    planoAxial.setAttribute('position',{x: 0, y: 0 ,z: 0});

    planoSagital.setAttribute('rotation',{x: 0, y: 0 ,z: 0});
    planoCoronal.setAttribute('rotation',{x: 0, y: 0 ,z: 0});
    planoAxial.setAttribute('rotation',{x: 0, y: 0 ,z: 0});

    coronal.setAttribute('LinearOrNormalPlane', 'normal');
    sagital.setAttribute('LinearOrNormalPlane', 'normal');
    axial.setAttribute('LinearOrNormalPlane', 'normal');
}

function movePlano(){

    var coronal = document.querySelector('#coronal');
    var sagital = document.querySelector('#sagital');
    var axial =   document.querySelector('#axial');


    coronal.setAttribute('LinearOrNormalPlane', 'lineal');
    sagital.setAttribute('LinearOrNormalPlane', 'lineal');
    axial.setAttribute('LinearOrNormalPlane', 'lineal');

    coronal.setAttribute('position', '-2 0 0');
    sagital.setAttribute('position', '0 0 0');
    axial.setAttribute('position', '2 0 0');

    sagital.setAttribute('rotation', '0 90 0');
    axial.setAttribute('rotation', '90 0 0');
    
}

function back(){
    var aframeScene = document.querySelector('a-scene');
    document.location.href='index.html';
}
