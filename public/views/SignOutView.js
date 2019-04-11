import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

export default class SignOutView extends BaseView {
    constructor(el) {
        super(el);
    }

    show() {
        super.show();
    }

    render() {
        Bus.emit('sign-out');
    }
}