import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import ErrorTmpl from '../components/Error/Error.tmpl.xml';

export default class ErrorView extends BaseView {
    constructor (el) {
        super(el);
        this.data = {};
        this.payload = null;
        this.el.classList.add('error-section');
    }

    show (flag) {
        switch (flag) {
            case 'NOT_FOUND': {
                this.data = {
                    message: 'Опа! Потерялось...',
                };
                break;
            }
            case 'SERVER_ERROR': {
                this.data = {
                    message: 'Опа! Сервер прилег...',
                };
                break;
            }
        }
        const section = document.getElementsByClassName('error-section')[0];
        if (section) {
            this.el.removeChild(section);
        }
        this.render();
        const modal = document.getElementsByClassName('modal')[0];
        modal.style.display = 'block';
    }
    
    render () {
        const section = document.createElement('section');
        section.classList = 'modal-section';
        section.innerHTML = ErrorTmpl(this.data);
        this.el.appendChild(section);
        
        span.addEventListener('click', (event) => {
            event.preventDefault();
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        if (signInBitton) {
            signInBitton.addEventListener('click', (event) => {
                event.preventDefault();
                modal.style.display = 'none';
                Bus.emit('open-sign-in');
            });
    
            signUpBitton.addEventListener('click', (event) => {
                event.preventDefault();
                modal.style.display = 'none';
                Bus.emit('open-sign-up');
            });
        } else {
            okBitton.addEventListener('click', (event) => {
                event.preventDefault();
                modal.style.display = 'none';
            });
        }
    }
}
