export default class ControllersManager {
    constructor() {
        // console.log('ControllersManager.fn');

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

    init() {
        // maybe keyup
        document.addEventListener('keydown', this);

        const button = document.getElementsByClassName('game-view__turn-button')[0];
        button.addEventListener('click', this);

    }

    isPressed() {
        return this.pressed;
    }

    clearPress() {
        this.pressed = null;
    }

    destroy() {
        document.removeEventListener('keydown', this);
        const button = document.getElementsByClassName('game-view__turn-button')[0];
        button.removeEventListener('click', this);
    }
}