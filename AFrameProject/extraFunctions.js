function comprobar(posAct, element, destPosition , deltaPosition) {

    var bboix = document.querySelector('#bbox');
  //  console.log(bboix.getAttribute('position'));

    if (element.getAttribute('id') == 'sagital') {
        if ((posAct.x - deltaPosition.x) >= -0.5 && (posAct.x - deltaPosition.x) <= 0.5) {
            destPosition.x = posAct.x - deltaPosition.x * 1;
            var cont1 = posAct.x - deltaPosition.x;
            element.setAttribute('position', destPosition);
            return cont1;

        }
        return 1;
    } else if (element.getAttribute('id') == 'coronal') {
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
    return 0;
}

function movePlano(){

    var coronal = document.querySelector('#coronal');
    var sagital = document.querySelector('#sagital');
    var axial =   document.querySelector('#axial');


    coronal.setAttribute('position', '-1 0 -1');
    sagital.setAttribute('position', '-0 0 -1');
    axial.setAttribute('position', '1 0 -1');

    sagital.setAttribute('rotation', '0 90 0');
    axial.setAttribute('rotation', '90 0 0');

}

function movSlicer(movement, object){

    if(object == 'sagital') {
        var form = (movement + 0.5) / 0.001953;
        form = Math.trunc( form );

        var pos = object.getAttribute('position');
        var bBox = document.querySelector('#bbox');
        bBox.removeChild(object);

        var entityEx = document.createElement('a-entity');
        entityEx.setAttribute('slice',{depth: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 3,  sliceNum: form});
        entityEx.setAttribute('id', "sagital");
        entityEx.setAttribute('class', 'plane');
        entityEx.setAttribute('mixin', 'plane');
        entityEx.setAttribute('rotation', '0 0 0');
        entityEx.setAttribute('position', pos);
        bBox.appendChild(entityEx);
        return entityEx;

    }
    if(object.getAttribute('id') == 'axial') {

        var pos = object.getAttribute('position');
        var bBox = document.querySelector('#bbox');
        bBox.removeChild(object);

        var form = (movement + 0.5) / 0.001953;
        form = Math.trunc( form );

        var entityEy = document.createElement('a-entity');
        entityEy.setAttribute('slice',{depth: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 2,  sliceNum: form});
        entityEy.setAttribute('id', "axial");
        entityEy.setAttribute('class', 'plane');
        entityEy.setAttribute('mixin', 'plane');
        entityEy.setAttribute('rotation', '0 0 0');
        entityEy.setAttribute('position', pos);
        bBox.appendChild(entityEy);
        return entityEy;

        if(object.getAttribute('id') == 'coronal') {
            var pos = object.getAttribute('position');
            var bBox = document.querySelector('#bbox');
            bBox.removeChild(object);

            var form = (movement + 0.5) / 0.001953;
            form = Math.trunc( form );
            console.log(form);


        }

    }
    if(object.getAttribute('id') == 'coronal') {
        var pos = object.getAttribute('position');
        var bBox = document.querySelector('#bbox');
        bBox.removeChild(object);

        var form = (movement + 0.5) / 0.001953;
        form = Math.trunc( form );
        console.log(form);

        var entityEz = document.createElement('a-entity');
        entityEz.setAttribute('slice',{depth: volume.zLength, width: volume.yLength, height: volume.xLength, paso: 1,  sliceNum: form});
        entityEz.setAttribute('id', "coronal");
        entityEz.setAttribute('class', 'plane');
        entityEz.setAttribute('mixin', 'plane');
        entityEz.setAttribute('rotation', '0 0 0');
        entityEz.setAttribute('position', pos);
        bBox.appendChild(entityEz);
        return entityEz;
    }
}
