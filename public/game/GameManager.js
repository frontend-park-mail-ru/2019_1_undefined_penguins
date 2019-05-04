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

        // this.subscribe(EVENTS.WAITING_FOR_OPPONENT, 'onWaitOpponent');
        this.subscribe(EVENTS.INIT_OPPONENTS, 'onFindOpponent');
        this.subscribe(EVENTS.START_THE_GAME, 'onStart');
        this.subscribe(EVENTS.SET_NEW_GAME_STATE, 'onNewState');
        this.subscribe(EVENTS.FINISH_THE_GAME, 'onFinishTheGame');
        this.subscribe(EVENTS.EAT_FISH, 'onEatenFish');


        Bus.emit(EVENTS.READY_TO_START, {username});
       
        // this.startGameLoop();
    }

    // onWaitOpponent() {
    //     console.log('GameManager.fn.onWaitOpponent', arguments);
    //     mediator.emit(EVENTS.OPEN_WAITING_VIEW);
    // }

    onFindOpponent(me, opponent) {
        console.log('GameManager.fn.onFindOpponent', arguments);
        this.scene.setNames(me, opponent);
    }

    renderNew(){
        if (this.strategy instanceof SinglePlayerStrategy) {
            this.scene.renderAllAsPenguin();
        }
    }

    onNewState(payload) {

        this.state = payload.state;
        if (this.scene.getState()===undefined) {
            this.scene.setState(this.state);
            this.renderNew();
        } else {
            this.scene.setState(this.state);
            this.scene.renderAsPenguin();
        }
        
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    onStart() {
        console.log('GameManager.fn.onStart', arguments);
        // mediator.emit(EVENTS.OPEN_GAME_VIEW);

        this.controllers.init();
        this.startGameLoop();
    }

    startGameLoop() {
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop() {
        this.scene.setState(this.state);

        this.scene.renderAllAsPenguin();
        this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
    }

    onEatenFish(payload){
        this.scene.removeFish(payload.angle);
    }

    onFinishTheGame(payload) {
        // console.log('GameManager.fn.onFinishTheGame', payload);

        if (this.requestID) {
            cancelAnimationFrame(this.requestID);
        }

        this.strategy.destroy();
        // this.scene.destroy(); // TODO: проверить в интеграции
        this.controllers.destroy();

        Bus.emit(EVENTS.OPEN_FINISH_VIEW, {results: payload.message});
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
    }

    // unsubscribe(event) {
    //     this._subscribed = this._subscribed.filter(data => data.name !== event);
    //     mediator.off(event, this.mediatorCallback);
    // }

    // destroy() {
    //     this._subscribed.forEach(data => mediator.off(data.name, this.mediatorCallback));
    //     this._subscribed = null;
    // }
}