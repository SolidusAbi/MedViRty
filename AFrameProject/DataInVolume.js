function selectDataCoronal(width, height, depth,paso){
    console.log("coronal");
    var geometry = new THREE.PlaneGeometry(width, depth);
    var elementos = new Uint8Array( 3 *width*depth );
    // De izquierda a derecha

    var t = 0;
    var i = width*100;
    var n = 0;

    while (i < width*height*depth){
        for(n ; n < width ; n ++) {
            elementos[t] = (generalDataVolume[i + n]);
            t++;
            n++;
        }
        i = i +(height*depth+n);
        n = 0;
    }

    var texture = new THREE.DataTexture(elementos, width, depth, THREE.LuminanceFormat);
    return textureF(geometry, paso, texture);
}


function selectDataAxial(width, height, depth, paso) {
    console.log("axial");
    var geometry = new THREE.PlaneGeometry(width, height);
    var elementos = new Uint8Array( 3 * width*height );

        var e = width * height * 100;

        for (var i = 0; i < width * height; i++) {

            elementos[i] = (generalDataVolume[e + i] + 3024 + 6048);
        }

        var texture = new THREE.DataTexture(elementos, width, height, THREE.LuminanceFormat);
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = - 1;
        return textureF(geometry, paso, texture);
}

function selectDataSagital(width, height, depth, paso){
    console.log("sagital");
    var geometry = new THREE.PlaneGeometry(height, depth);
    var elementos = new Uint8Array( 3 * width*depth );

    var y=0;
    var t =0;
    var i= 100;

    while (i < width*height*depth){
        elementos[t] = (generalDataVolume[i] + 3024 + 6048);
        t++;
        i = i+ width;
    }
    var texture = new THREE.DataTexture(elementos, height, depth, THREE.LuminanceFormat);
    return textureF(geometry, paso,texture);
}



function textureF (geometry, paso, texture){
    //  console.log(elementos)

    texture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial({ wireframe: false, map : texture });
    var mesh = new THREE.Mesh(geometry, material);
    if(paso == 3){
       rotateObject(mesh , 0,80,0);
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
