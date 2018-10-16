function exploreMenu(){

    var reset = document.querySelector('#reset');
    var rot = document.querySelector('#rotate');
    var big = document.querySelector('#big');
    var sm = document.querySelector('#small');
    var tt = document.querySelector('#movPlane');

    if( document.querySelector('#boxMenu').getAttribute('color') == '#05A8AA' ){

        reset.setAttribute('visible', 'true');
        document.querySelector('#reset').emit('fade');

        rot.setAttribute('visible', 'true');
        document.querySelector('#rotate').emit('fade');

        big.setAttribute('visible', 'true');
        document.querySelector('#big').emit('fade');

        sm.setAttribute('visible', 'true');
        document.querySelector('#small').emit('fade');

        tt.setAttribute('visible', 'true');
        document.querySelector('#movPlane').emit('fade');

        document.querySelector('#boxMenu').setAttribute('color', '#0daa2d');

    }else{

        document.querySelector('#reset').emit('loose');
        document.querySelector('#rotate').emit('loose');
        document.querySelector('#big').emit('loose');
        document.querySelector('#small').emit('loose');
        document.querySelector('#movPlane').emit('loose');

        document.querySelector('#boxMenu').setAttribute('color', '#05A8AA');
    }
}

function rotateVolume(){


    var boxM = document.querySelector('#volumenCompleto');
    var aux1 = boxM.getAttribute('rotation');

    aux1.x= aux1.x +45;
    aux1.y= aux1.y +45;
    aux1.z= aux1.z +45;

    boxM.setAttribute('rotation',{x: aux1.x ,y: aux1.y ,z: aux1.z});
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
    boxM.setAttribute('scale',{x: 100 ,y: 100 ,z: 100});
    boxM.setAttribute('rotation',{x: 0, y: 0 ,z: 0});
    boxM.setAttribute('position',{x: 0, y: 0 ,z: -100});


    var planoCoronal = document.querySelector('#coronal');
    var planoSagital = document.querySelector('#sagital');
    var planoAxial = document.querySelector('#axial');
    planoSagital.setAttribute('position',{x: 0, y: 0 ,z: 0});
    planoCoronal.setAttribute('position',{x: 0, y: 0 ,z: 0});
    planoAxial.setAttribute('position',{x: 0, y: 0 ,z: 0});

    planoSagital.setAttribute('rotation',{x: 0, y: 0 ,z: 0});
    planoCoronal.setAttribute('rotation',{x: 0, y: 0 ,z: 0});
    planoAxial.setAttribute('rotation',{x: 0, y: 0 ,z: 0});

    coronal.setAttribute('P', 'normal');
    sagital.setAttribute('P', 'normal');
    axial.setAttribute('P', 'normal');
}

function movePlano(){

    var coronal = document.querySelector('#coronal');
    var sagital = document.querySelector('#sagital');
    var axial =   document.querySelector('#axial');


    /* ESTO HAY QUE PONERLE UN NOMBRE SIGNIFICATIVO */

    coronal.setAttribute('P', 'lineal');
    sagital.setAttribute('P', 'lineal');
    axial.setAttribute('P', 'lineal');



    coronal.setAttribute('position', '-2 0 -1');
    sagital.setAttribute('position', '0 0 -1');
    axial.setAttribute('position', '2 0 -1');

    sagital.setAttribute('rotation', '0 90 0');
    axial.setAttribute('rotation', '90 0 0');
    
}
