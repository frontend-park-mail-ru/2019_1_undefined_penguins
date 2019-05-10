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
        this.strategy = new Strategy;
        this.scene = new GameScene(canvases);
        this.controllers = new ControllersManager();
        this._subscribed = [];

        this.subscribe(EVENTS.WAITING_FOR_OPPONENT, 'onWaitOpponent');
        this.subscribe(EVENTS.INIT_OPPONENTS, 'onFindOpponent');
        this.subscribe(EVENTS.START_THE_GAME, 'onStart');
        this.subscribe(EVENTS.SET_NEW_GAME_STATE, 'onNewState');
        this.subscribe(EVENTS.FINISH_THE_GAME, 'onFinishTheGame');
        this.subscribe(EVENTS.EAT_FISH, 'onEatenFish');
        this.subscribe(EVENTS.PENGUIN_INJURED, 'onLose');
        
        const piscesCount = 24;
        
        if (navigator.onLine) {
            Bus.on('ws:connected', () => {
                Bus.emit(EVENTS.READY_TO_START, {username, piscesCount});
            });
        } else {
            Bus.emit(EVENTS.READY_TO_START, {username, piscesCount});
        }
        // this.subscribe(EVENTS.STOP_THE_GAME, 'stopGameLoop');

       
        // this.startGameLoop();
    }

    onWaitOpponent() {
        console.log('GameManager.fn.onWaitOpponent', arguments);
        Bus.emit('open-wait');
    }

    onFindOpponent(penguin, gun) {
        console.log('GameManager.fn.onFindOpponent', arguments);
        this.scene.setNames(penguin, gun);
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
            this.scene.setState(payload.state);
        //     this.scene.renderAsPenguin();
        // }
        
        // this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    onStart() {
        console.log('GameManager.fn.onStart');
        // TODO: CHECK FOR multi OR single
        Bus.emit(EVENTS.OPEN_GAME_VIEW, "MULTI");

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
        //TODO: copy the method for gun
        Bus.on(EVENTS.PENGUIN_TURN_AROUND, () => {
            Bus.emit(EVENTS.NEXT_STEP_CONTROLS_PRESSED, 'ROTATE');
        });

        this.scene.setState(this.state);

        this.scene.renderAllAsPenguin();
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
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
        this.scene.destroy(); // TODO: проверить в интеграции
        this.controllers.destroy();

        if (payload.message === 'LOST') {
            Bus.emit('open-lost-view', {score: payload.score});
        }
        if (payload.message === 'WIN') {
            Bus.emit('open-win-view', {score: payload.score});
        }
    }

    // onNewState(payload) {
    //     // console.log('GameManager.fn.onNewState', payload);
    //     this.state = payload.state;
    // }

    subscribe(event, callbackName) {
        Bus.on(event, function (payload) {
            if (callbackName && typeof this[callbackName] === 'function') {
                this[callbackName](payload);
            }
        }.bind(this));
        this._subscribed.push({name: event, callback: callbackName});
    }

    // unsubscribe(event) {
    //     this._subscribed = this._subscribed.filter(data => data.name !== event);
    //     mediator.off(event, this.mediatorCallback);
    // }

    destroy() {
        this._subscribed.forEach(data => Bus.off(data.name, this.mediatorCallback));
        this._subscribed = null;
    }
}