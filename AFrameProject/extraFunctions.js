/*
function bigVolume2(){
    var planoCoronal = document.querySelector('#coronal');
    var planoSagital = document.querySelector('#sagital');
    var planoAxial = document.querySelector('#axial');


    var aux1 = planoCoronal.getAttribute('scale');

    aux1.x= aux1.x + 0.01;
    aux1.y= aux1.y + 0.01;
    aux1.z= aux1.z + 0.01;

    planoCoronal.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    planoSagital.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    planoAxial.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
}

function smallVolume2(){
    var planoCoronal = document.querySelector('#coronal');
    var planoSagital = document.querySelector('#sagital');
    var planoAxial = document.querySelector('#axial');


    var aux1 = planoCoronal.getAttribute('scale');

    aux1.x= aux1.x -0.01;
    aux1.y= aux1.y -0.01;
    aux1.z= aux1.z -0.01;

    planoCoronal.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    planoSagital.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
    planoAxial.setAttribute('scale',{x: aux1.x ,y: aux1.y ,z: aux1.z});
}
*/

function comprobar(posActual, elemento, destPosition , deltaPosition){

    var bboix = document.querySelector('#bbox');
    console.log(bboix.getAttribute('position'));

    if(elemento.getAttribute('id') == 'sagital'){
           if((posActual.x - deltaPosition.x) >= -0.5 && (posActual.x - deltaPosition.x) <= 0.5 ) {
               destPosition.x = posActual.x - deltaPosition.x * 0.3;
               elemento.setAttribute('position', destPosition);
               console.log(elemento.getAttribute('position'));
           }
    }else  if(elemento.getAttribute('id') == 'coronal'){
        if((posActual.z - deltaPosition.z) >= -0.5 && (posActual.z - deltaPosition.z) <= 0.5 ) {
            // destPosition.x = posActual.x -  deltaPosition.x *  1;
            // destPosition.y = posActual.y -  deltaPosition.y *  1;
            destPosition.z = posActual.z - deltaPosition.z * 0.3;
            elemento.setAttribute('position', destPosition);
            console.log(elemento.getAttribute('position'));
        }
    }else if(elemento.getAttribute('id') == 'axial'){
         if((posActual.y - deltaPosition.y) >= -0.5 && (posActual.y - deltaPosition.y) <= 0.5 ) {
             //   destPosition.x = posActual.x -  deltaPosition.x *  1;
             destPosition.y = posActual.y - deltaPosition.y * 0.3;
             // destPosition.z = posActual.z -  deltaPosition.z *  1;
             elemento.setAttribute('position', destPosition);
             console.log(elemento.getAttribute('position'));
         }
    }else{
        console.log(elemento);
        destPosition.x = posActual.x -  deltaPosition.x *  1;
        destPosition.y = posActual.y -  deltaPosition.y *  1;
        destPosition.z = posActual.z -  deltaPosition.z *  1;
        elemento.setAttribute('position', destPosition);
    }
}
