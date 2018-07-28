var muevete =0;
var planoG= '';


/* Este es el boton de atras */
AFRAME.registerComponent('buttonlistener', {
    init: function () {
        var el = this.el;


        el.addEventListener('triggerdown', function (evt) {
            var control = document.querySelector('#' + el.getAttribute('id'));  //comprueba que mando es pulsado
            if (control.id == "mandoDerecho"){
                //console.log(control);  //mando seleccionado
                //console.log(elementoSeleccionadoDerecho);  //plano que hay que mover
                var plano = document.querySelector("#" + elementoSeleccionadoDerecho).getAttribute('position');
                planoG = elementoSeleccionadoDerecho;
                var controlDer = document.querySelector('#controlDerecho').getAttribute('position');
                muevete=1;
                var myWorker = new Worker("worker.js");
                //    ("HAY QUE CEEEEEEEEEEEEEEERRAAAAAAAAAR LOS HIIIIIIIILOS");
                myWorker.onmessage = function (oEvent) {

                    console.log(oEvent.data);

                };
                myWorker.postMessage("cierrate");
                for(var i=0; i<100000000 ; i++){}
                myWorker.terminate();

            }

        });

        el.addEventListener('triggerup', function (evt) {
            muevete=0;

            console.log('SUELTO');
        });
    }
});
/*
function isMoving(){
    var plano = document.querySelector("#" + planoG).getAttribute('position');
    var control = document.querySelector('#controlDerecho').getAttribute('position');
    console.log(plano);
    console.log(control);
    console.log("hago algo");
    if(muevete == 1) {
        plano.x = control.x;
        plano.y = control.y;
    }
};



*/
/*
        el.addEventListener('triggerup', function (evt) {
            var control = document.querySelector('#'+ el.getAttribute('id'));  //comprueba que mando es pulsado
            console.log(control);
            control.setAttribute('enabled', false);
        });*/


/* Este es el botton de atras
AFRAME.registerComponent('buttonlistener', {
    init: function () {
        var el = this.el;
        el.addEventListener('triggerdown', function (evt) {
            console.log("BOTON!");
            var controlDerecho = document.querySelector('#controlDerecho');
            console.log(controlDerecho);
            controlDerecho.setAttribute('collider-check','');

            var controlIzquierdo = document.querySelector('#controlIzquierdo');
            console.log(controlIzquierdo);
            controlIzquierdo.setAttribute('collider-check','');
        });
    }
});
 */