function comprobar(element, destPosition , deltaPosition) {
    posAct = element.getAttribute('position')
    translateFactor = new THREE.Vector3(1, 1, 1);
    if (element.parentEl)
        translateFactor = element.parentEl.object3D.getWorldScale(); 

    if (element.getAttribute('id') == 'sagital') {
        if(element.getAttribute('LinearOrNormalPlane') == "lineal"){
            if ((posAct.z - deltaPosition.z) >= -0.5 && (posAct.z - deltaPosition.z) <= 0.5) {
                destPosition.z = posAct.z - deltaPosition.z / translateFactor.z;
                destPosition.x = posAct.x;
                destPosition.y = posAct.y;

                var cont1 = posAct.z - deltaPosition.z / translateFactor.z;
                element.setAttribute('position', destPosition);
                return cont1;
            }
        }else if ((posAct.x - deltaPosition.x) >= -0.5 && (posAct.x - deltaPosition.x) <= 0.5) {
            destPosition.x = posAct.x - deltaPosition.x / translateFactor.x;
            destPosition.y = posAct.y;
            destPosition.z = posAct.z;
            var cont1 = posAct.x - deltaPosition.x / translateFactor.x;
            element.setAttribute('position', destPosition);
            return cont1;
        }
        return 1;
    }
    
    
    else if (element.getAttribute('id') == 'coronal') {
        if(element.getAttribute('LinearOrNormalPlane') == "lineal"){
            if ((posAct.z - deltaPosition.z) >= -0.5 && (posAct.z - deltaPosition.z) <= 0.5) {
                destPosition.z = posAct.z - deltaPosition.z / translateFactor.z;
                destPosition.x = posAct.x;
                destPosition.y = posAct.y;

                var cont1 = posAct.z - deltaPosition.z / translateFactor.z;
                element.setAttribute('position', destPosition);
                return cont1;
            }
            
        }else if ((posAct.z - deltaPosition.z) >= -0.5 && (posAct.z - deltaPosition.z) <= 0.5) {
               console.log(posAct);
               destPosition.z = posAct.z - deltaPosition.z / translateFactor.z;
               destPosition.y = posAct.y;
               destPosition.x = posAct.x;
               var cont1 = posAct.z - deltaPosition.z / translateFactor.z;
               element.setAttribute('position', destPosition);
               return cont1;
        }
        return 1;
    }
    
    
    else if (element.getAttribute('id') == 'axial') {
        if(element.getAttribute('LinearOrNormalPlane') == "lineal"){
            if ((posAct.z - deltaPosition.z) >= -0.5 && (posAct.z - deltaPosition.z) <= 0.5) {
                destPosition.x = posAct.x;
                destPosition.y = posAct.y;
                destPosition.z = posAct.z - deltaPosition.z / translateFactor.z;
                var cont1 = posAct.z - deltaPosition.z / translateFactor.z;
                element.setAttribute('position', destPosition);
                return cont1;
            }
        } else if ((posAct.y - deltaPosition.y) >= -0.5 && (posAct.y - deltaPosition.y) <= 0.5) {
            destPosition.y = posAct.y - deltaPosition.y / translateFactor.y;
            destPosition.x = posAct.x;
            destPosition.z = posAct.z;
            var cont1 = posAct.y - deltaPosition.y / translateFactor.y;
            element.setAttribute('position', destPosition);
            return cont1;
        }
        return 1;

        
    } else {
        parentScale = element.parentEl.object3D.getWorldScale();
        destPosition.x = posAct.x - deltaPosition.x / translateFactor.x;
        destPosition.y = posAct.y - deltaPosition.y / translateFactor.y;
        destPosition.z = posAct.z - deltaPosition.z / translateFactor.z;
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
