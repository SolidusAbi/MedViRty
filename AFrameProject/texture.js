function textureF (geometry, width, height, elementos, paso){
    console.log(elementos)
    var texture = new THREE.DataTexture(elementos, width, height, THREE.LuminanceFormat);
    texture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial({ wireframe: false, map : texture });
    var mesh = new THREE.Mesh(geometry, material);
    if(paso == 2){
        rotateObject(mesh , 0,80,0);
    }else if(paso == 3){
        rotateObject(mesh , 0,135,0);
    }
    return mesh;
}