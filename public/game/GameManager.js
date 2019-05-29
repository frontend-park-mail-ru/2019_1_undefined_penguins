import Bus from '../scripts/EventBus.js';
import { EVENTS } from '../utils/events.js';
import { GAME_CONSTS } from '../utils/constants.js';
import GameScene from '../game/GameScene.js';
import ControllersManager from '../game/ControllersManager.js';

// отвечает за все события в игре 
export default class GameManager {
    /**
     *
     * @param username
     * @param canvases
     * @param {GameStrategy} Strategy
     */
    constructor(username, canvases, Strategy) {
        console.log('GameManager.fn');

        this.username = username;
        this.role = null;
        this.mode = null;
        this.strategy = new Strategy;
        Bus.emit('get-game-mode', this);
        this.scene = new GameScene(canvases);
        this.controllers = new ControllersManager();
        this._subscribed = [];

        this.subscribe(EVENTS.WAITING_FOR_OPPONENT, 'onWaitOpponent');
        this.subscribe(EVENTS.INIT_OPPONENTS, 'onFindOpponent');
        this.subscribe(EVENTS.START_THE_GAME, 'onStart');
        this.subscribe(EVENTS.SET_NEW_GAME_STATE, 'onNewState');
        this.subscribe(EVENTS.FINISH_THE_GAME, 'onFinishTheGame');
        this.subscribe(EVENTS.FINISH_THE_ROUND, 'onFinishTheRound');

        Bus.on(EVENTS.READY_TO_NEW_ROUND, () => {
            Bus.emit(EVENTS.NEW_ROUND, {username});
        });
        
        if (navigator.onLine) {
            this.subscribe('ws:connected', 'readyToStart');
        } else {
            this.readyToStart();
        }
    }

    readyToStart() {
        Bus.emit(EVENTS.READY_TO_START, {username: this.username});
    }

    onWaitOpponent() {
        console.log('GameManager.fn.onWaitOpponent', arguments);
        Bus.emit('open-wait');
    }

    onFindOpponent(players) {
        console.log('GameManager.fn.onFindOpponent', arguments);
        if (this.username === players.penguin) {
            this.role = GAME_CONSTS.PENGUIN;
        } else {
            this.role = GAME_CONSTS.GUN;
        }
        this.scene.setNames(players.penguin, players.gun);
    }

    renderNew(){
        // TODO: Check for strategy
        // if (this.strategy instanceof SinglePlayerStrategy) {
        this.scene.renderAllAsPenguin();
        // }
    }

    onNewState(payload) {
        this.state = payload.state;
    }

    onStart() {
        // console.log('GameManager.fn.onStart');
        if (this.mode === GAME_CONSTS.MULTI) {
            Bus.emit(EVENTS.OPEN_GAME_VIEW, this.mode);
        } else {
            this.role = GAME_CONSTS.PENGUIN;
        }
        
        this.controllers.init();
        this.startGameLoop();
    }

    stopGameLoop(){
        this.strategy.stopGameLoop();
        this.destroy();
    }

    startGameLoop() {
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop() {
        if (this.controllers.isPressed()) {
            this.controllers.clearPress();
            Bus.emit(EVENTS.NEXT_STEP_CONTROLS_PRESSED, {username: this.username});
        }  
       
        this.scene.setState(this.state);
        if (this.state.piscesAngles) {
            this.piscesAngles = [];
            for (let i = 0; i < this.state.piscesAngles.length; i++) {
                this.piscesAngles.push((360/this.state.piscesAngles.length) * i);
            }
            this.scene.setPiscesAngles(this.piscesAngles);
        } else {
            this.checkEatenFish();
        }
        
        if (this.role === GAME_CONSTS.PENGUIN) {
            this.scene.choiceOfRenderAsPenguin();
        } else {
            this.scene.choiceOfRenderAsGun();
        }
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    checkEatenFish() {
        if (this.piscesAngles) {
            this.piscesAngles.forEach(element => {
                if (element >= (this.state.penguin.alpha - 7) && (element % 360) <= (this.state.penguin.alpha + 7)) {
                    this.scene.removeFish(element);
                }            
            });
        }
    }

    onEatenFish(payload) {
        this.scene.removeFish(payload.angle);
    }

    injuredLoop() {
        this.scene.renderInjuredPenguin();
    }

    onFinishTheGame(payload) {
        console.log('GameManager.fn.onFinishTheGame', payload);

        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }

        this.injuredLoop();
        

        this.strategy.destroy();
        this.scene.destroy();
        this.controllers.destroy();
        Bus.emit('destroy-game');

        setTimeout(function() {
            switch(this.role) {
            case GAME_CONSTS.PENGUIN:
                if (payload.penguin.result === GAME_CONSTS.LOST) {
                    Bus.emit('open-lost-view', payload.penguin.score);
                }
                // TODO: norm messages
                if (payload.penguin.result === GAME_CONSTS.WIN || payload.penguin.result === GAME_CONSTS.AUTOWIN) {
                    Bus.emit('open-win-view', payload.penguin.score);
                }
                break;
            case GAME_CONSTS.GUN:
                if (payload.gun.result === GAME_CONSTS.LOST) {             
                    Bus.emit('open-lost-view', payload.gun.score);
                }
                if (payload.gun.result === GAME_CONSTS.WIN || payload.gun.result === GAME_CONSTS.AUTOWIN) {             
                    Bus.emit('open-win-view', payload.gun.score);
                }
            }
        }.bind(this), 2500);
        // TODO: поменять для оффлайна
       
    }

    onFinishTheRound(payload) {
        console.log('GameManager.fn.onFinishTheRound', payload);
    
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }

        if (payload.mode === GAME_CONSTS.MULTI) {
            Bus.emit(EVENTS.OPEN_ROUND_VIEW, payload);
        } else if (payload.mode === GAME_CONSTS.SINGLE) {
            setTimeout(() => {
                Bus.emit(EVENTS.READY_TO_NEW_ROUND);
            }, 1000);
        }

        //TODO: any clearing
        
    }

    subscribe(event, callbackName) {
        Bus.on(event, (payload) => {
            if (callbackName && typeof this[callbackName] === 'function') {
                this[callbackName](payload);
            }
        });
        this._subscribed.push({name: event, callback: callbackName});
    }

    destroy() {
        this._subscribed.forEach(data => Bus.off(data.name, data.callback));
        this._subscribed = null;
    }

    setMode(mode) {
        this.mode = mode;
    }
}