import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import GameTmpl from '../components/Game/Game.tmpl.xml';

export default class GameView extends BaseView {
    constructor(el, mode) {
        super(el);
        this.game = null;
        this.mode = mode;
        this.canvases = {};
    }

    getCanvases() {
        return this.canvases;
    }

    getMode() {
        return this.mode;
    }

    setMode(mode) {
        this.mode = mode;
    }

    setGame(game) {
        this.game = game;
    }
    
    show() {
        super.show();
        // if (!this.game) {
        //     Bus.off('destroy-game');
        //     Bus.on('destroy-game', () => {
        //         this.game.destroy();
        //         delete this.game;
        //         this.game = null;
        //     });
        //     Bus.off('get-game-mode');
        //     Bus.emit('start-game', this);
        // } else {
        //     Bus.emit('destroy-game');
        // }
        switch(this.mode) {
        case 'SINGLE':
            if (!this.game) {
                Bus.off('destroy-game');
                Bus.on('destroy-game', () => {
                    this.game.destroy();
                    delete this.game;
                    this.game = null;
                });
                Bus.off('get-game-mode');
                Bus.emit('start-game', this);
            } else {
                Bus.emit('destroy-game');
            }
            break;
        case 'MULTI':
            if (!this.game) {
                Bus.off('destroy-game');
                Bus.off('get-game-mode');
                Bus.emit('start-game', this);
            } else {
                Bus.on('destroy-game', () => {
                    this.game.destroy();
                    delete this.game;
                    this.game = null;
                });
            }
            break;
        }
    }
    
    render() {
        this.el.innerHTML = '';
        this.el.innerHTML = GameTmpl();

        let innerWidth = window.innerWidth;
        let innerHeight = window.innerHeight;
        if (innerWidth === 400 || innerHeight === 400) {
            innerWidth = 300;
            innerHeight = 300;
        }

        const fishCanvas = this.el.querySelector('.canvas-fish');
        if (innerWidth > innerHeight) {
            if (innerWidth <= 1050) {
                fishCanvas.width = fishCanvas.height = innerHeight*0.7;
            } else {
                fishCanvas.width = fishCanvas.height = innerHeight*0.9;
            }
        } else {
            if (innerHeight * 0.7 < innerWidth) {
                fishCanvas.width = fishCanvas.height = innerWidth*0.7;
            } else {
                fishCanvas.width = fishCanvas.height = innerWidth*1;
            }
        }
        const penguinCanvas = this.el.querySelector('.canvas-penguin');
        if (innerWidth > innerHeight) {
            if (innerWidth <= 1050) {
                penguinCanvas.width = penguinCanvas.height = innerHeight*0.7;
            } else {
                penguinCanvas.width = penguinCanvas.height = innerHeight*0.9;
            }
        } else {
            if (innerHeight * 0.7 < innerWidth) {
                penguinCanvas.width = penguinCanvas.height = innerWidth * 0.7;
            } else {
                penguinCanvas.width = penguinCanvas.height = innerWidth * 1;
            }
        }
        const snowCanvas = this.el.querySelector('.canvas-snow');
        if (innerWidth > innerHeight) {
            if (innerWidth <= 1050) {
                snowCanvas.width = snowCanvas.height = innerHeight*0.7;
            } else {
                snowCanvas.width = snowCanvas.height = innerHeight*0.9;
            }
        } else {
            if (innerHeight * 0.7 < innerWidth) {
                snowCanvas.width = snowCanvas.height = innerWidth*0.7;
            } else {
                snowCanvas.width = snowCanvas.height = innerWidth*1;
            }
        }
        const gunCanvas = this.el.querySelector('.canvas-gun');
        if (innerWidth > innerHeight) {
            if (innerWidth <= 1050) {
                gunCanvas.width = gunCanvas.height = innerHeight*0.7;
            } else {
                gunCanvas.width = gunCanvas.height = innerHeight*0.9;
            }
        } else {
            if (innerHeight * 0.7 < innerWidth) {
                gunCanvas.width = gunCanvas.height = innerWidth*0.7;
            } else {
                gunCanvas.width = gunCanvas.height = innerWidth*1;
            }
        }

        const gameSection = 

        this.canvases = {
            fish: fishCanvas,
            penguin: penguinCanvas,
            snow: snowCanvas,
            gun: gunCanvas,
        };

        const home = this.el.getElementsByClassName('game__header__home')[0];
        if (home !== undefined) {
            home.addEventListener('click', (event) => {
                event.preventDefault();
                Bus.emit('SIGNAL_FINISH_GAME', {message: 'EXIT'});
                Bus.emit('open-menu');
            });
        }
    }
}
