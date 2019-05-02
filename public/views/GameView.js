import BaseView from './BaseView.js';

export default class GameView extends BaseView {
  constructor(el) {
    super(el);
    this.game = null;
    this.opts = null;
    // TODO: получить канвас
    //this.canvas = this.el.querySelector('.game-view__canvas-element');
  }

  show() {
    super.show();
  }

  render() {
    this.el.innerHTML = '';
    // TODO: ПОТОМ НОРМАЛЬНО СДЕЛАЕМ
    
  }
}
