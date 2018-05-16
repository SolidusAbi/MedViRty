/*
function hola() {
    console.log(aframeScene);
    console.log(document.querySelectorAll('a-entity').item(6));
    var n = document.querySelectorAll('a-entity').item(6);

    console.log()

}
/*
AFRAME.registerComponent('cursor-listener', {
    init: function () {
        console.log("hola amigos")
        var lastIndex = -1;
        var COLORS = ['red', 'green', 'blue'];
        this.el.addEventListener('click', function (evt) {
            lastIndex = (lastIndex + 1) % COLORS.length;
            this.setAttribute('material', 'color', COLORS[lastIndex]);
            console.log('I was clicked at: ', evt.detail.intersection.point);
        });
    }
});
*/