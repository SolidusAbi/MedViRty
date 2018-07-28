var elementoSeleccionadoIzquierdo='';
var elementoSeleccionadoDerecho='';

AFRAME.registerComponent('collider-check', {
    dependencies: ['raycaster'],
    init: function () {
        this.el.addEventListener('raycaster-intersected', function (event) {
            //  console.log(event);
            //  console.log(event.originalTarget.id);
            // console.log(event.detail.el.components.raycaster.el.id);
            if(event.detail.el.components.raycaster.el.id == 'controlDerecho') {
              //  elementoSeleccionadoDerecho = event.originalTarget.id;
            }else{
               // elementoSeleccionadoIzquierdo = event.originalTarget.id;
            }
        });
    }
});

//   console.log(event.detail.el.component.raycaster.el.id)
// var rayIzq = AFRAME.scenes[0].querySelector('[raycaster]');
// console.log(rayIzq.components.raycaster)

