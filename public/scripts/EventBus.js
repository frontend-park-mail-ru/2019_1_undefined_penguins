class Bus {
    constructor () {
        this.listeners = {};
    }

    on (event, callback) { // подписываемся на событие
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
    }

    off (event, callback) { // отписываемся от события
        this.listeners[event] = this.listeners[event]
            .filter(listener => listener !== callback);
        this.listeners[event] = null;
    }

    emit (event, data) { // публикуем (диспатчим, эмитим) событие
        try {
            this.listeners[event].forEach((listener) => {
                listener(data);
            });
        } catch (e) {
            console.log(e.message);
        }
    }
}

export default new Bus();
