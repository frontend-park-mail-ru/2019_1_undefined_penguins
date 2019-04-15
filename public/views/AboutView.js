import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
// import AboutTemplate from '../components/About/About.tmpl.xml'

const templateFunc = window.fest['components/About/About.tmpl'];

export default class AboutView extends BaseView {
  constructor(el) {
    super(el);
  }

  show() {
    super.show();
  }

  render() {
    this.el.innerHTML = '';
    this.el.innerHTML = templateFunc();

    const home = this.el.getElementsByClassName('js-header__home-button')[0];
    console.log(home);
    if (home !== undefined) {
      home.addEventListener('click', (event) => {
        event.preventDefault();
        Bus.emit('open-menu');
      });
    }
  }
}
