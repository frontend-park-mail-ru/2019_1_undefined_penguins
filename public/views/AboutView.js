import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

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
    }
}