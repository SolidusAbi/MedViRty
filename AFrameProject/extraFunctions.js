function comprobar(posAct, element, destPosition , deltaPosition) {

    if (element.getAttribute('id') == 'sagital') {
        if ((posAct.x - deltaPosition.x) >= -0.5 && (posAct.x - deltaPosition.x) <= 0.5) {
            destPosition.x = posAct.x - deltaPosition.x * 1;
            var cont1 = posAct.x - deltaPosition.x;
            element.setAttribute('position', destPosition);
            return cont1;

        }
        return 1;
    } else if (element.getAttribute('id') == 'coronal') {

        console.log(posAct.z - deltaPosition.z >= -0.5 && (posAct.z - deltaPosition.z) <= 0.5);

        if ((posAct.z - deltaPosition.z) >= -0.5 && (posAct.z - deltaPosition.z) <= 0.5) {
               destPosition.z = posAct.z - deltaPosition.z * 1;
               var cont1 = posAct.z - deltaPosition.z;
               element.setAttribute('position', destPosition);
               return cont1;
        }
        return 1;
    } else if (element.getAttribute('id') == 'axial') {
        if ((posAct.y - deltaPosition.y) >= -0.5 && (posAct.y - deltaPosition.y) <= 0.5) {
            destPosition.y = posAct.y - deltaPosition.y * 1;
            var cont1 = posAct.y - deltaPosition.y;
            element.setAttribute('position', destPosition);
            return cont1;
        }
        return 1;
    } else {
        destPosition.x = posAct.x - deltaPosition.x * 1;
        destPosition.y = posAct.y - deltaPosition.y * 1;
        destPosition.z = posAct.z - deltaPosition.z * 1;
        element.setAttribute('position', destPosition);
        return 0;
    }
}


function movSlicer(movement, object) {

    if (object.getAttribute('id') == 'sagital') {

        var newSlice = (movement + 0.5) / 0.001953;
        newSlice = Math.trunc(newSlice);

        console.log(document.querySelector('#'+ object.getAttribute('id')));

      //  var newPosSlicer = object.getAttribute('position');
        
     //   document.querySelector('#'+ object.getAttribute('id')).update(newSlice);
     object.update;
    }

    if (object.getAttribute('id') == 'axial') {

        var newSlice = (movement + 0.5) / 0.001953;
        newSlice = Math.trunc(newSlice);
        
        console.log(document.querySelector('#'+ object.getAttribute('id')));
        object.update;
      //  document.querySelector('#'+ object.getAttribute('id')).update(newSlice);
    }
    if (object.getAttribute('id') == 'coronal') {

   //     var newPosSlicer = object.update;

        var newSlice = (movement + 0.5) / 0.001953;
        newSlice = Math.trunc(newSlice);
        
        console.log(document.querySelector('#'+ object.getAttribute('id')));

        object.update;

      //  document.querySelector('#'+ object.getAttribute('id')).update(newSlice);

    }

}
