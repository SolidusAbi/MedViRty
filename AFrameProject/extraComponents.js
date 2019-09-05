AFRAME.registerComponent('menu-event', {
    init: function(){
        this.DOWNMENU_EVENT = 'menudown'
        this.UPMENU_EVENT = 'menuup'

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

/* AFRAME.registerComponent('slide-mover', {
    schema: {
        hoverEvent: {default: 'mouseover'},
        unHoverEvent: {default: 'mouseout'},
        touchStart: {default: 'touchstart'},
        touchEnd: {default: 'touchend'}
    },
    init: function(){
        this.onTouch = this.onTouch.bind();
        this.onHover = this.onHover.bind();
        this.end = this.end.bind();
    },

    play: function(){
        this.el.addEventListener(this.data.hoverEvent, this.onHover);
        this.el.addEventListener(this.data.unHoverEvent, this.end);
        console.log(this.data);
    },

    end: function(){
        this.el.removeEventListener(data.touchStart, this.onTouch);
        console.log('its me again');
    },

    onHover: function(){
        this.el.addEventListener(data.touchStart, this.onTouch);
        console.log('hello');
    },

    onTouch: function(evt){
        console.log(evt);
    },

    remove: function(){
        this.el.removeEventListener(data.hoverEvent, this.start);
        this.el.removeEventListener(data.unHoverEvent, this.end);
        console.log("no deberia pasar por aqui");

    },
}) */