function selectDataCoronal(width, height, depth,paso, num){
    //  console.log("coronal");
    var geometry = new THREE.PlaneGeometry(1, 1);
 //   var elementos = new Uint8Array( 3 * width * depth );
    var elementos = new Uint8Array( 3 * depth * width );
    // De izquierda a derecha

    var t = 0;
    var i = width*num;

    while (i < width*height*depth){
        for(var n=0 ; n < width ; n ++) {
            elementos[t] = (generalDataVolume[i + n]);
            t++;
            n++;
        }
        i = i+ width*depth;
        //  i = i+(height*depth+n);
    }

    var texture = new THREE.DataTexture(elementos, width, depth, THREE.LuminanceFormat);
    return textureF(geometry, paso, texture);
}


function selectDataAxial(width, height, depth, paso, num) {
//    console.log("axial");
    var geometry = new THREE.PlaneGeometry(1, 1);
    var elementos = new Uint8Array( 3 * width*height );

    var e = width * height * num;

    for (var i = 0; i < width * height; i++) {

        elementos[i] = (generalDataVolume[e + i]);
    }

    var texture = new THREE.DataTexture(elementos, width, height, THREE.LuminanceFormat);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = - 1;
    return textureF(geometry, paso, texture);
}


function selectDataSagital(width, height, depth, paso, num){
    //   console.log("sagital");
    var geometry = new THREE.PlaneGeometry(1, 1);
    var elementos = new Uint8Array( 3 * width*depth );

    var t =0;
    var i= num;

    while (i < width*height*depth){
        elementos[t] = (generalDataVolume[i]);
        t++;
        i = i+ width;
    }
    var texture = new THREE.DataTexture(elementos, height, depth, THREE.LuminanceFormat);
    return textureF(geometry, paso,texture);
}

function textureF (geometry, paso, texture){
    //  console.log(elementos)

    texture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide , wireframe: false, map : texture});
    var mesh = new THREE.Mesh(geometry, material);
    if(paso == 3){
        rotateObject(mesh , 0,90,0);
    }else if(paso == 2){
        rotateObject(mesh , -90,0,0);
    }
    return mesh;
}

function rotateObject(object, degreeX, degreeY, degreeZ){

    degreeX = (degreeX * Math.PI)/180;
    degreeY = (degreeY * Math.PI)/180;
    degreeZ = (degreeZ * Math.PI)/180;

    object.rotateX(degreeX);
    object.rotateY(degreeY);
    object.rotateZ(degreeZ);

}
