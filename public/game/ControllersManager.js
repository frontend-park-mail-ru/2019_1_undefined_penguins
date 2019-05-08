import Bus from '../scripts/EventBus.js';
import { EVENTS } from '../utils/events.js';

export default class ControllersManager {
    constructor() {
        console.log('ControllersManager.fn');

    }

    /**
     * Начинаем слушать события клавиатуры
     */
    init() {

        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            this._keyPush(event);
        });

        const button = document.getElementsByClassName('game-view__turn-button')[0];
        button.addEventListener('click', (event) => {
            event.preventDefault();
            Bus.emit(EVENTS.PENGUIN_TURN_AROUND);
        });

    }

    /**
     * Прекращаем слушать события клавиатуры
     */
    destroy() {
        document.removeEventListener('keydown', this._keyPush(event));
    }

    _keyPush(event) {
        switch (event.keyCode) {
        case 32:
            Bus.emit(EVENTS.PENGUIN_TURN_AROUND);
            break;
        }
    }
}