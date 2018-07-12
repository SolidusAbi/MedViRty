AFRAME.registerComponent('collider-check', {
    dependencies: ['raycaster'],

    init: function () {
        this.el.addEventListener('raycaster-intersected', function () {
            console.log('intersección del rayo!');
        });
    }
});

AFRAME.registerComponent('touch-slice', {
    init: function () {
        console.log("Entra");
        this.el.addEventListener('click', function (evt) {
            console.log("prepa");
          //  console.log(this.object3D.position);
            this.object3D.position.set(50, 50, 50);
           //this.setAttribute('position' ,{ x: 100, y: 100, z: 100 } );
            console.log(this.object3D)
        });
    }
});


AFRAME.registerComponent('movement' , {
    initPos: 0,

    init: function () {
        this.el.addEventListener( 'mousedown' , function (evt)  {
            console.log("Movimiento");
            var cursor = document.querySelector('#mandoIzquierdo');

            var posCursorX = mouse.x;
            var posCursorY = mouse.y;
            var posCursorZ = mouse.z;

          //  var a =cursor.raycaster;
            //console.log(a)
          //  console.log(cursor);

           // initPos = posCursorX;
           // console.log(posCursorX + "," +posCursorY+ "," + cursor.object3D.getWorldPosition().z);

            //console.log( cursor.object3D.getWorldPosition().x,  cursor.object3D.getWorldPosition().y , cursor.object3D.getWorldPosition().z)
        });

       /* this.el.addEventListener( 'mouseup' , function (evt)  {
            var cursor = document.querySelector('#wasd');
            var posCursorFinalX = cursor.object3D.getWorldPosition().x;
            var posCursorFinalY = cursor.object3D.getWorldPosition().y;
            console.log(initPos);
            console.log("AQUI dos mas");
            console.log(posCursorFinalX);
            console.log(posCursorFinalY);
            var dif = posCursorX - posCursorFinalX;
            var dif2 = posCursorY - posCursorFinalY;
            console.log("AQUI cuatro mas");
            console.log(dif);
            console.log(dif2);
            var arrayP = [dif,dif2,0]
            var matrixT = document.querySelector('a-scene').camera.projectionMatrix;
            var matrixTT = matrixT * arrayP;
            console.log(matrixTT);
            this.object3D.position.set(matrixTT[0], matrixT[1], matrixTT[2]);
        });*/

    }
});



AFRAME.registerComponent('change-position', {
    init: function (){
        this.el.addEventListener('click', function (evt) {
            this.object3D.position.set(100, 100, 100);
            console.log('I was clicked at: ', evt.detail.intersection.point);
        });
    }
});

