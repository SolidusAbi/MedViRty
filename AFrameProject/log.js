AFRAME.registerComponent('log', {
    schema: {
        event: {type: 'string', default: ''},
        message: {type: 'string', default: 'Log time!!'}
    },
    init: function(){
        // Closure to access fresh `this.data` from event handler context.
        var self = this;

        // .init() is a good place to set up initial state and variables.
        // Store a reference to the handler so we can later remove it.
        this.eventHandlerFn = function () { console.log(self.data.message); };
    },

    update: function(oldData){
        // `event` updated. Remove the previous event listener if it exists.
        if (oldData.event && this.data.event !== oldData.event) {
            this.el.removeEventListener(oldData.event, this.eventHandlerFn);
        }

        if (this.data.event) {
            // This will log the `message` when the entity emits the `event`.
            this.el.addEventListener(this.data.event, this.eventHandlerFn);
        } else {
            // `event` not specified, just log the message.
            console.log("From not an event: " + this.data.message);
        }
    }
});
