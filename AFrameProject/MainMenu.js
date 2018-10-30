
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

    coronal.setAttribute('position', '-2 0 0');
    sagital.setAttribute('position', '0 0 0');
    axial.setAttribute('position', '2 0 0');

    sagital.setAttribute('rotation', '0 90 0');
    axial.setAttribute('rotation', '90 0 0');
    
}

function back(){
    var aframeScene = document.querySelector('a-scene');

    var planoSeguro = document.createElement('a-entity');
    planoSeguro.setAttribute('geometry', 'primitive: plane; height: 5; width: 5 ');
    planoSeguro.setAttribute('material', 'color: white');
    buttonAcept.setAttribute('text', '¿Seguro que quiere salir?');
    planoSeguro.setAttribute('position', {x: 0 , y: 0 , z: -5});
    planoSeguro.setAttribute('clickable', ''); 
  //  planoSeguro.setAttribute('onClick', "document.location.href='index.html'");
  //  planoSeguro.setAttribute('dynamic-body', '');
 //   planoSeguro.setAttribute('class', 'plane');
    aframeScene.appendChild(planoSeguro);

    // var buttonAcept = document.createElement('a-entity');
    // buttonAcept.setAttribute('geometry', 'primitive: plane; height: 5; width: 5');
    // planoSeguro.setAttribute('material', 'color: white');
    // buttonAcept.setAttribute('position' , {x:-1 , y:0 , z:-5});
    // buttonAcept.setAttribute('onClick', "document.location.href='index.html'");
    // buttonAcept.setAttribute('text', 'Aceptar');
    // planoSeguro.setAttribute('clickable', ''); 
    // planoSeguro.setAttribute('dynamic-body', '');
    // planoSeguro.setAttribute('class', 'plane');
    // planoSeguro.appendChild(buttonAcept);
    

    // var buttonCancel = document.createElement('a-entity');
    // buttonCancel.setAttribute('position' , {x:-3 , y:0 , z:0});
    // buttonCancel.setAttribute('text', 'vamoaquedarnos');
    // buttonCancel.setAttribute('onClick', 'document.parentNode.removeChild(planoSeguro)');
    // planoSeguro.appendChild(buttonCancel);

    // var geometry = new THREE.PlaneGeometry(1,  1);
    // var texture = new THREE.DataTexture(planoSeguro, 500 , 500 , THREE.LuminanceFormat);
    // texture.needsUpdate = true;
    // var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide , wireframe: false, map : texture});
    // var mesh = new THREE.Mesh(geometry, material);
    // this.el.setObject3D('mesh', mesh);
    

    // if(confirm("¿seguro que quiere salir?") == true){
    //     document.location.href='index.html';
    // }
   
}
