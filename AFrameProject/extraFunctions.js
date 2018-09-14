function rotateVolume(){
    var planoCoronal = document.querySelector('#coronal');
    var planoSagital = document.querySelector('#sagital');
    var planoAxial = document.querySelector('#axial');

    var aux1 = planoCoronal.getAttribute('rotation');

    aux1.x= aux1.x +45;
    aux1.y= aux1.y +45;
    aux1.z= aux1.z +45;

    planoCoronal.setAttribute('rotation',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    planoSagital.setAttribute('rotation',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    planoAxial.setAttribute('rotation',{x: aux1.x ,y: aux1.y ,z: aux1.z});
}

function bigVolume(){
    var planoCoronal = document.querySelector('#coronal');
    var planoSagital = document.querySelector('#sagital');
    var planoAxial = document.querySelector('#axial');


    var aux1 = planoCoronal.getAttribute('scale');

    aux1.x= aux1.x +0.1;
    aux1.y= aux1.y +0.1;
    aux1.z= aux1.z +0.1;

    planoCoronal.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    planoSagital.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    planoAxial.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
}
function smallVolume(){
    var planoCoronal = document.querySelector('#coronal');
    var planoSagital = document.querySelector('#sagital');
    var planoAxial = document.querySelector('#axial');


    var aux1 = planoCoronal.getAttribute('scale');

    aux1.x= aux1.x -0.1;
    aux1.y= aux1.y -0.1;
    aux1.z= aux1.z -0.1;

    planoCoronal.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    planoSagital.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    planoAxial.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
}

function reset(){
    var planoCoronal = document.querySelector('#coronal');
    var planoSagital = document.querySelector('#sagital');
    var planoAxial = document.querySelector('#axial');

    planoCoronal.setAttribute('scale',{x: 1 ,y: 1 ,z: 1});
    planoSagital.setAttribute('scale',{x: 1 ,y: 1 ,z: 1});
    planoAxial.setAttribute('scale',{x: 1 ,y: 1 ,z: 1});

    planoCoronal.setAttribute('rotation',{x: 0, y: 0 ,z: 0});
    planoSagital.setAttribute('rotation',{x: 0 ,y:0  ,z: 0});
    planoAxial.setAttribute('rotation',{x: 0 ,y: 0 ,z: 0});
}





