export default class ControllersManager {
    constructor() {
        console.log('ControllersManager.fn');
    }

    /**
     * Начинаем слушать события клавиатуры
     */
    init() {
        document.addEventListener('keydown', this._keyPush(event));
    }

    /**
     * Прекращаем слушать события клавиатуры
     */
    destroy() {
        document.removeEventListener('keydown', this._keyPush(event));
    }

    _keyPush(event) {
        event.preventDefault();
        // привязываем пробел
        switch (event.keyCode) {
            case 32:
                
                // this.clockwise = !this.clockwise;
                break;
        }
    }
}