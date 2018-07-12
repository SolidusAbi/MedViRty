function checkControl () {
    if( AFRAME.utils.device.checkHeadsetConnected () == true){

        var mandoDer = document.querySelector('#mandoIzquierdo');
        mandoDer.setAttribute('visible', true);


        var mandoDer = document.querySelector('#mandoDerecho');
        mandoDer.setAttribute('visible', true);
    }
}


