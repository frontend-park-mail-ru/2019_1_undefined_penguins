import Bus from '../scripts/EventBus.js';

export default class WS {
    constructor() {
        if (WS.__instance) {
            return WS.__instance;
        }
        WS.__instance = this;

        const home = 'localhost:8080';
        // const home = 'penguin-wars-backend.sytes.pro';


        // const address = ['https', 'https:'].includes(location.protocol)
            // ? `wss://${location.host}/ws`
            // : `ws://${location.host}/ws`;
            const address = `ws://` + home + `/ws/ws`;
            // : `ws://` + home + `/ws`;

        this.ws = new WebSocket(address);
        this.ws.onopen = function() {
            console.log(`WebSocket on address ${address} opened`);
            console.dir(this.ws);
            this.ws.onmessage = this.handleMessage.bind(this);
            Bus.emit('ws:connected');
            // const interval = this.interval = setInterval(() => this.ws.send('update'), 10 * 1000);
            
            this.ws.onclose = function () {
                console.log(`WebSocket on address ${address} closed`);
                // clearInterval(interval);
            };
        }.bind(this);
    }

    handleMessage(event) {
        const messageText = event.data;
        try {
            const message = JSON.parse(messageText);
            console.log(message);
            Bus.emit(message.type, message.payload);
        }
        catch {
            console.error('Error in WS - handleMessage: ', err);
        }
    }

    send(type, payload) {
        this.ws.send(JSON.stringify({type, payload}));
    }
}

// export default new WS;
