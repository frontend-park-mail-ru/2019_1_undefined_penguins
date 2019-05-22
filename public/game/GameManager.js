import Bus from '../scripts/EventBus.js';
import { EVENTS } from '../utils/events.js';
import GameScene from '../game/GameScene.js';
import ControllersManager from '../game/ControllersManager.js';
import SinglePlayerStrategy from '../game/game-strategies/SinglePlayerStrategy.js';

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
        this.strategy = new Strategy;
        this.scene = new GameScene(canvases);
        this.controllers = new ControllersManager();
        this._subscribed = [];

        this.subscribe(EVENTS.WAITING_FOR_OPPONENT, 'onWaitOpponent');
        this.subscribe(EVENTS.INIT_OPPONENTS, 'onFindOpponent');
        this.subscribe(EVENTS.START_THE_GAME, 'onStart');
        this.subscribe(EVENTS.SET_NEW_GAME_STATE, 'onNewState');
        this.subscribe(EVENTS.FINISH_THE_GAME, 'onFinishTheGame');
        this.subscribe(EVENTS.FINISH_THE_ROUND, 'onFinishTheRound');
        // this.subscribe(EVENTS.STOP_THE_GAME, 'stopGameLoop');
        // this.subscribe(EVENTS.EAT_FISH, 'onEatenFish');
        // this.subscribe(EVENTS.PENGUIN_INJURED, 'onLose');
        
        // const piscesCount = 24;
        
        // if (navigator.onLine) {
            Bus.on('ws:connected', () => {
                Bus.emit(EVENTS.READY_TO_START, {username});
            });
        // } else {
        //     Bus.emit(EVENTS.READY_TO_START, {username});
        // }

       
        // this.startGameLoop();
    }

    onWaitOpponent() {
        console.log('GameManager.fn.onWaitOpponent', arguments);
        Bus.emit('open-wait');
    }

    onFindOpponent(players) {
        console.log('GameManager.fn.onFindOpponent', arguments);
        console.log('this:', this);
        console.log('players:', players);
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
        // TODO: CHECK FOR multi OR single
        Bus.emit(EVENTS.OPEN_GAME_VIEW, 'MULTI');
        
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
        // Bus.on(EVENTS.ROTATE, () => {
        //     Bus.emit(EVENTS.NEXT_STEP_CONTROLS_PRESSED);
        // });
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
                console.log(element, this.state.penguin.alpha);
                if (element >= this.state.penguin.alpha -7 && element % 360 <= this.state.penguin.alpha+7) {
                    this.scene.removeFish(element);
                }            
            });
        }
    }

    onEatenFish(payload){
        this.scene.removeFish(payload.angle);
    }

    onFinishTheGame(payload) {
        console.log('GameManager.fn.onFinishTheGame', payload);

        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }

        this.strategy.destroy();
        this.scene.destroy();
        this.controllers.destroy();
        Bus.emit('destroy-game');

        switch(this.role) {
        case 'penguin':
            if (payload.penguin.result === 'LOST') {
                Bus.emit('open-lost-view', payload.penguin.score);
            }
            if (payload.penguin.result === 'WIN') {
                Bus.emit('open-win-view', payload.penguin.score);
            }
            break;
        case 'gun':
            if (payload.gun.result === 'LOST') {             
                Bus.emit('open-lost-view', payload.gun.score);
            }
            if (payload.gun.result === 'WIN') {             
                Bus.emit('open-win-view', payload.gun.score);
            }
        }
    }

    onFinishTheRound(payload) {
        console.log('GameManager.fn.onFinishTheRound', payload);

        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }

        //TODO: any clearing
        
        Bus.emit(EVENTS.OPEN_ROUND_VIEW, payload);
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
}