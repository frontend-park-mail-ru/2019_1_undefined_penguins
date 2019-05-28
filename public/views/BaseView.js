/**
 * @class BaseView
 * @module BaseView
 */
export default class BaseView {
    constructor (el) {
        this.el = el;

        this.el.dataset.view = this.constructor.name;
        this.el.className = 'view-section';
        this.el.style.display = 'none';
    }

    get active () {
        if (this.el.style.display === 'none') {
            return false;
        } else {
            return true;
        }
    }

    hide () {
        this.el.style.display = 'none';
    }

    show () {
        this.el.style.display = 'block';
        this.render();
    }

    render () {
    }
}
