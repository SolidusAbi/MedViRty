AFRAME.registerComponent('touch-slice', {
    init: function () {
        console.log("Entra");
        this.el.addEventListener('click', function (evt) {
            console.log("prepa");
            this.object3D.position.set(100, 100, 100);
           //this.setAttribute('position' ,{ x: 100, y: 100, z: 100 } );
            console.log(this.object3D)
        });
    }
});


AFRAME.registerComponent('movement' , {
    init: function () {
        console.log("Movimiento");
        this.el.addEventListener( 'mousedown' , function (evt)  {
            console.log("Pulsaaando");
            ActualEl();

        });
    }


});

function ActualEl(){
   // var cursor = document.querySelector('#wasd');
  //  console.log(cursor.object3D.getWorldPosition());
}

AFRAME.registerComponent('change-position', {
    init: function (){
        this.el.addEventListener('click', function (evt) {
            this.object3D.position.set(100, 100, 100);
            console.log('I was clicked at: ', evt.detail.intersection.point);
        });
    }
});

