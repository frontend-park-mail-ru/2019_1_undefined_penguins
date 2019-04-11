export class Bus {
	constructor () {
		this.listeners = {};
	}

	on (event, callback) {    // подписываемся на событие
		this.listeners[ event ] = this.listeners[ event ] || [];
		this.listeners[ event ].push(callback);
	}

	off (event, callback) {   // отписываемся от события
		this.listeners[ event ] = this.listeners[ event ]
			.filter(function (listener) {
				return listener !== callback;
			});
	}

	emit (event, data) {      // публикуем (диспатчим, эмитим) событие
		try {
			this.listeners[ event ].forEach(function (listener) {
				listener(data);
			});
		}
		catch (e) {
			console.log(e.message);
		}
	}

}

export default new Bus;