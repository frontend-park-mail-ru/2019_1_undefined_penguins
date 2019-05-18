import Bus from '../scripts/EventBus.js';
import { EVENTS } from '../utils/events.js';

export default class ControllersManager {
    constructor() {
        console.log('ControllersManager.fn');

        this.pressed = null;

        this.handleEvent = function(event) {
            event.preventDefault();
            switch (event.type) {
            case 'keydown':
                if (event.keyCode === 32) { 
                    this.pressed = true;
                }
                break;
            case 'click': 
                this.pressed = true;
                break;
            }
        };
    }

    /**
     * Начинаем слушать события клавиатуры
     */
    init() {
        // maybe keyup
        document.addEventListener('keydown', this);

        const button = document.getElementsByClassName('game-view__turn-button')[0];
        button.addEventListener('click', this);

    }

    // _keyPush(event) {
    //     event.preventDefault();
    //     switch (event.keyCode) {
    //     case 32:
    //         this.pressed = true;
    //         break;
    //     }
    // }

    isPressed() {
        return this.pressed;
    }

    clearPress() {
        this.pressed = null;
    }

    /**
     * Прекращаем слушать события клавиатуры
     */
    destroy() {
        document.removeEventListener('keydown', this);
        const button = document.getElementsByClassName('game-view__turn-button')[0];
        button.removeEventListener('click', this);
        // document.removeEventListener('click', this._keyPush(event));
    }

}