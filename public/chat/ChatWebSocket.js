import Bus from '../scripts/EventBus.js';

export default class WS {
    constructor() {
        if (WS.__instance) {
            return WS.__instance;
        }
        WS.__instance = this;

        this._init();

        Bus.on('chat:ws-open', () => {
            if (this.ws.readyState === WebSocket.CLOSED) {
                this.ws.onerror = null;
                this.ws.onmessage = null;
                this.ws.onopen = null;
                this.ws.onclose = null;
                this.ws = null;
                this._init();
            }
        });

        Bus.on('chat:ws-close', () => {
            this.ws.close();
        });

        window.addEventListener('message', (event) => {
            const json = JSON.parse(event.data);
            if (json.type === 'refresh-user') {
                Bus.emit('chat:ws-close');
                Bus.emit('chat:ws-open');
            }
        });
    }

    handleMessage(event) {
        const messageText = event.data;
        try {
            const message = JSON.parse(messageText);
            this._makeNotify(message);
            Bus.emit('chat:handle-message', message);
        }
        catch {
            console.error('Error in WS - handleMessage: ', err);
        }
    }

    send(message) {
        this.ws.send(message);
    }

    _init() {
        const url = 'localhost';
        // const home = 'penguin-wars-backend.sytes.pro';

        const wsUrl = `/chat/ws`;

        const address = ['https', 'https:'].includes(location.protocol)
            ? `wss://` + url + wsUrl
            : `ws://` + url + wsUrl;

        this.ws = new WebSocket(address);

        this.ws.onerror = (event) => {
            console.log(`WebSocket error: ${event.message}`);
        };

        this.ws.onclose = (event) => {
            console.log(`WebSocket closed with code ${event.code} (${event.reason})`);
        };

        this.ws.onopen = () => {
            console.log(`WebSocket on address ${address} opened`);

            this.ws.onmessage = this.handleMessage.bind(this);
        };
    }

    _makeNotify(data) {
        if (!'Notification' in window) {
            console.error('not not sup');
            return;
        }

        if (Notification.permission === 'granted') {
            const msg = data.login + ': ' + data.message;
            new Notification(msg);
            return;
        }

        if (Notification.permission !== 'denied') {
            Notification
                .requestPermission()
                .then((permission) => {
                    if (permission === 'granted') {
                        const msg = data.login + ': ' + data.message;
                        new Notification(msg);
                        return;
                    }
                })
        }
    }
}
