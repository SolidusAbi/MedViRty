AFRAME.registerComponent('menu-event', {
    init: function(){
        this.DOWNMENU_EVENT = 'xbuttondown';
        
        this.onMenuDown = this.onMenuDown.bind(this);
    },
    play: function() {
        this.el.addEventListener(this.DOWNMENU_EVENT, this.onMenuDown);
    },
    pause: function(){
        this.el.removeEventListener(this.DOWNMENU_EVENT, this.onMenuDown);
    },
    onMenuDown: function(){
        var menu = this.el.getElementsByClassName("menu-container");
        for (let item of menu) {item.setAttribute("visible",!item.getAttribute("visible")); }
        //Making the menu invisible hides it but it can still be clicked so i'll just move it to another place 
        for (let item of menu) {
            var pos = item.getAttribute("position");
            if(pos){
                pos.z = -pos.z;
                item.setAttribute("position", pos);
                } 
            }
    }
});