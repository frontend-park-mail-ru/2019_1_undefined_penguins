import Bus from '../scripts/EventBus.js';
import { EVENTS } from '../utils/events.js';
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
            this.role = 'penguin';
        } else {
            this.role = 'gun';
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
        // if (!payload) {
        //     this.state = payload.state;
        // } else {
        //     this.state = {};
        // }
        // if (this.scene.getState() === undefined) {
        //     // console.log(this.state);
        //     // this.scene.setState(this.state);
        //     this.scene.initState();
        //     this.renderNew();
        // } else {
            // console.log(this.state);
            // this.scene.setState(payload.state);
            
        this.state = payload.state;
        // this.scene.renderAsPenguin();
        // }
        
        // this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    onStart() {
        console.log('GameManager.fn.onStart');
        if (this.mode === 'MULTI') {
            Bus.emit(EVENTS.OPEN_GAME_VIEW, this.mode);
        } else {
            this.role = 'penguin';
        }
        
        this.controllers.init();
        this.startGameLoop();
    }

    onLose(){
        
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
        if (this.state.piscesAngles !== undefined) {
            this.piscesAngles = [];
            for (let i = 0; i < this.state.piscesAngles.length; i++) {
                this.piscesAngles.push((360/this.state.piscesAngles.length) * i);
            }
        } else {
            this.checkEatenFish();
        }
        
        if (this.role === 'penguin') {
            this.scene.choiceOfRenderAsPenguin();
        } else {
            this.scene.choiceOfRenderAsGun();
        }
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    checkEatenFish() {
        if (this.piscesAngles !== undefined) {
            this.piscesAngles.forEach(element => {
                if (element >= this.state.penguin.alpha -7 && element % 360 <= this.state.penguin.alpha+7) {
                    this.scene.removeFish(element);
                }            
            });
        }
    }

    onEatenFish(payload) {
        this.scene.removeFish(payload.angle);
    }

    injuredLoop() {
        console.log(this.scene);
        const loop = setInterval(function() {
           this.scene.renderInjuredPenguin();
           this.state.penguin.alpha++;
           this.scene.setState(this.state);
        }.bind(this), 100);
    
        setTimeout(function() {
            clearInterval(loop);
        }, 1000);
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
                case 'penguin':
                    if (payload.penguin.result === 'LOST') {
                        Bus.emit('open-lost-view', payload.penguin.score);
                    }
                    // TODO: norm messages
                    if (payload.penguin.result === 'WIN' || payload.penguin.result === 'AUTO-WIN') {
                        Bus.emit('open-win-view', payload.penguin.score);
                    }
                    break;
                case 'gun':
                    if (payload.gun.result === 'LOST') {             
                        Bus.emit('open-lost-view', payload.gun.score);
                    }
                    if (payload.gun.result === 'WIN' || payload.gun.result === 'AUTO-WIN') {             
                        Bus.emit('open-win-view', payload.gun.score);
                    }
                }
        }.bind(this), 1000);
        // TODO: поменять для оффлайна
       
    }

    onFinishTheRound(payload) {
        console.log('GameManager.fn.onFinishTheRound', payload);
    
        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }

        if (payload.mode === 'MULTI') {
            Bus.emit(EVENTS.OPEN_ROUND_VIEW, payload);
        } else if (payload.mode === 'SINGLE') {
            setTimeout(() => {
                Bus.emit(EVENTS.READY_TO_NEW_ROUND);
            }, 1000);
        }

        //TODO: any clearing
        
    }

    // onNewState(payload) {
    //     // console.log('GameManager.fn.onNewState', payload);
    //     this.state = payload.state;
    // }

    subscribe(event, callbackName) {
        Bus.on(event, (payload) => {
            if (callbackName && typeof this[callbackName] === 'function') {
                this[callbackName](payload);
            }
        });
        this._subscribed.push({name: event, callback: callbackName});
    }

    // unsubscribe(event) {
    //     this._subscribed = this._subscribed.filter(data => data.name !== event);
    //     mediator.off(event, this.mediatorCallback);
    // }

    destroy() {
        this._subscribed.forEach(data => Bus.off(data.name, data.callback));
        this._subscribed = null;
    }

    setMode(mode) {
        this.mode = mode;
    }
}