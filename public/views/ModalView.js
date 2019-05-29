import ModalTmpl from '../components/Modal/Modal.tmpl.xml';
import Bus from '../scripts/EventBus.js';

export default class ModalView {
    constructor (el) {
        this.el = el;
        this.data = {};
    }

    show (flag) {
        switch (flag) {
        case 'NOT_NET': {
            this.data = {
                message: 'Чтобы продолжить, нужен Интернет',
                flag: 'net',
            };
            break;
        }
        case 'NOT_AUTH': {
            this.data = {
                message: 'Чтобы продолжить, необходимо Войти',
                flag: 'auth',
            };
            break;
        }
        }
        const section = document.getElementsByClassName('modal-section')[0];
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
        section.innerHTML = ModalTmpl(this.data);
        this.el.appendChild(section);
        
        const modal = document.getElementsByClassName('modal')[0];
        const span = document.getElementsByClassName('modal__close')[0];
        const signInBitton = document.getElementsByClassName('sign-in-button')[0];
        const signUpBitton = document.getElementsByClassName('sign-up-button')[0];
        const okBitton = document.getElementsByClassName('ok-button')[0];
        
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
