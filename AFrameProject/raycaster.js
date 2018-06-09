// Use of the Raycaster inspired by  webgl_interactive_cubes.html, in the THREE.js project examples directory
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

document.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('resize', onWindowResize, false);
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onmouseup, false);


function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event){
    var cursor = document.querySelector('#wasd');
    console.log(mouse.x + "," + mouse.y + "," + cursor.object3D.getWorldPosition().x + "," + cursor.object3D.getWorldPosition().y + "," + cursor.object3D.getWorldPosition().z);

}

function onmouseup(event){
    var cursor = document.querySelector('#wasd');
    console.log(mouse.x + "," + mouse.y + "," + cursor.object3D.getWorldPosition().x + "," + cursor.object3D.getWorldPosition().y + "," + cursor.object3D.getWorldPosition().z);
}