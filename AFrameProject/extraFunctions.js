function comprobar(posAct, element, destPosition , deltaPosition) {

    if (element.getAttribute('id') == 'sagital') {
        if(element.getAttribute('P') == "lineal"){
            if ((posAct.z - deltaPosition.z) >= -0.5 && (posAct.z - deltaPosition.z) <= 0.5) {
                destPosition.z = posAct.z - deltaPosition.z * 1;
                destPosition.x = posAct.x;
                destPosition.y = posAct.y;

                var cont1 = posAct.z - deltaPosition.z;
                element.setAttribute('position', destPosition);
                return cont1;
            }
        }else if ((posAct.x - deltaPosition.x) >= -0.5 && (posAct.x - deltaPosition.x) <= 0.5) {
            destPosition.x = posAct.x - deltaPosition.x * 1;
            destPosition.y = posAct.y;
            destPosition.z = posAct.z;
            var cont1 = posAct.x - deltaPosition.x;
            element.setAttribute('position', destPosition);
            return cont1;
        }
        return 1;
    
    }
    
    
    else if (element.getAttribute('id') == 'coronal') {
        if(element.getAttribute('P') == "lineal"){
            if ((posAct.z - deltaPosition.z) >= -0.5 && (posAct.z - deltaPosition.z) <= 0.5) {
                destPosition.z = posAct.z - deltaPosition.z * 1;
                destPosition.x = posAct.x;
                destPosition.y = posAct.y;

                var cont1 = posAct.z - deltaPosition.z;
                element.setAttribute('position', destPosition);
                return cont1;
            }
            
        }else if ((posAct.z - deltaPosition.z) >= -0.5 && (posAct.z - deltaPosition.z) <= 0.5) {
               console.log(posAct);
               destPosition.z = posAct.z - deltaPosition.z * 1;
               destPosition.y = posAct.y;
               destPosition.x = posAct.x;
               var cont1 = posAct.z - deltaPosition.z;
               element.setAttribute('position', destPosition);
               return cont1;
        }
        return 1;
    }
    
    
    else if (element.getAttribute('id') == 'axial') {
        if(element.getAttribute('P') == "lineal"){
            if ((posAct.z - deltaPosition.z) >= -0.5 && (posAct.z - deltaPosition.z) <= 0.5) {
                destPosition.x = posAct.x;
                destPosition.y = posAct.y;
                destPosition.z = posAct.z - deltaPosition.z * 1;
                var cont1 = posAct.z - deltaPosition.z;
                element.setAttribute('position', destPosition);
                return cont1;
            }
        } else if ((posAct.y - deltaPosition.y) >= -0.5 && (posAct.y - deltaPosition.y) <= 0.5) {
            destPosition.y = posAct.y - deltaPosition.y * 1;
            destPosition.x = posAct.x;
            destPosition.z = posAct.z;
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

        var newSlice = (movement + 0.5) / (1/ object.getAttribute('nSlices'));
        newSlice = Math.trunc(newSlice);

        var a = document.getElementById('sagital');
        object.setAttribute('sagital-slice', {nSlice: newSlice});

    }

    if (object.getAttribute('id') == 'axial') {

        var newSlice = (movement + 0.5) / (1/ object.getAttribute('nSlices'));
        newSlice = Math.trunc(newSlice);
        
        var a = document.getElementById('axial');
        object.setAttribute('axial-slice', {nSlice: newSlice});
        
    }

    if (object.getAttribute('id') == 'coronal') {

        var newSlice = (movement + 0.5) / (1/ object.getAttribute('nSlices'));
        newSlice = Math.trunc(newSlice);
        
        var a = document.getElementById('coronal');
        object.setAttribute('coronal-slice', {nSlice: newSlice});
        
    }

}
