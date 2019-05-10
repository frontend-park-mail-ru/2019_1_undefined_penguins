import BaseView from './BaseView.js';
import WaitTmpl from '../components/Wait/Wait.tmpl.xml';

export default class WaitView extends BaseView {
    constructor (el) {
        super(el);
    }

    show () {
        super.show();
    }

    render () {
        // this.el.innerHTML = '';

        this.el.innerHTML = WaitTmpl(this.user);
    }
}
