import Bus from '../scripts/EventBus.js';
import { EVENTS } from '../utils/events.js';

export default class WS {
    constructor(key) {
        if (WS.__instance) {
            return WS.__instance;
        }
        WS.__instance = this;

        this._init(key);

        Bus.on(EVENTS.WEBSOCKET_OPEN, () => {
            if (this.ws.readyState === WebSocket.CLOSED) {
                this.ws.onerror = null;
                this.ws.onmessage = null;
                this.ws.onopen = null;
                this.ws.onclose = null;
                this.ws = null;
                this.initialize();
            }
        });

        Bus.on(EVENTS.WEBSOCKET_CLOSE, () => {
            this.ws.close();
        });
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

    _init(key) {
        const url = 'localhost:8080';
        // const home = 'penguin-wars-backend.sytes.pro';

        const wsUrl = key === 'game' ? `/game/ws` : `/chat/ws`;

        const address = ['https', 'https:'].includes(location.protocol)
            // ? `wss://${location.host}/ws`
            // : `ws://${location.host}/ws`;
            // const address = `ws://` + home + `/ws/ws`;
            ? `wss://` + url + wsUrl
            : `ws://` + url + wsUrl;

        this.ws = new WebSocket(address);

        this.ws.onerror = (event) => {
            console.log(`WebSocket error: ${event.message}`);
        };

        this.ws.onclose = (event) => {
            console.log(`WebSocket closed with code ${event.code} (${event.reason})`);
            // clearInterval(this.updateInterval);
        };

        this.ws.onopen = () => {
            console.log(`WebSocket on address ${address} opened`);

            this.ws.onmessage = this.handleMessage.bind(this);
            Bus.emit('ws:connected', this);
            // const interval = this.interval = setInterval(() => this.ws.send('update'), 10 * 1000);  
        };
    }
}

// export default new WS('game');
