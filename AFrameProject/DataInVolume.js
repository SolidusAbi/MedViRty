function selectData(geometry, width, height, depth,  elementos, paso){
      /* e indica el slice que quieres mostrar, 135 es el primero de arriba, va hacia abajo */

    if(paso == 1){
        var e = width * height*20;
        var z=0;
        for (var i = 0; i < width; i++) {
            for (var t = 0; t < depth; t++) {
                elementos[z] = (generalDataVolume[e + (i * depth + t)] + 3024 + 6048);
                z++;
            }
        }
        var texture = new THREE.DataTexture(elementos, width, depth, THREE.LuminanceFormat);
        return textureF(geometry, paso,texture);
    }

    if(paso == 2) {
        var e = width * height*20;
        for (var i = 0; i < width * depth; i++) {
            elementos[i] = (generalDataVolume[e + i] + 3024 + 6048);
        }
        var texture = new THREE.DataTexture(elementos, width, height, THREE.LuminanceFormat);
        return textureF(geometry, paso,texture);
    }

    if(paso == 3) {
        var e = width * height*20;
        for (var i = 0; i < width * height; i++) {
            elementos[i] = (generalDataVolume[e + i] + 3024 + 6048);
        }
        var texture = new THREE.DataTexture(elementos, width, height, THREE.LuminanceFormat);
        return textureF(geometry, paso, texture);
    }


}

function textureF (geometry, paso, texture){
    //  console.log(elementos)

    texture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial({ wireframe: false, map : texture });
    var mesh = new THREE.Mesh(geometry, material);
    if(paso == 2){
        rotateObject(mesh , 0,80,0);
    }else if(paso == 3){
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
