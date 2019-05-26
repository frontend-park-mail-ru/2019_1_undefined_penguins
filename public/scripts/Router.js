import Bus from './EventBus.js';

class Router {
    constructor () {
        this.routes = {};
        const root = document.getElementById('application');
        this.root = root;
    }

    /**
	 * @param {string} path
	 * @param {BaseView} View
	 */
    register (path, View, mode) {
        this.routes[path] = {
            View,
            view: null,
            el: null,
            mode: mode,
        };

        return this;
    }

    /**
	 * @param {string} path
	 */
    open (path) {
        const route = this.routes[path];

        if (!route) {
            this.open('/');
            return;
        }

        if (window.location.pathname !== path) {
            window.history.pushState(
                null,
                '',
                path
            );
            console.log('router path', path, 'j', window.location.pathname)
        }

        let { View, view, el, mode } = route;

        if (!el) {
            el = document.createElement('section');
            this.root.appendChild(el);
        }

        if (!view) {
            view = new View(el, mode);
        }

        if (!view.active) {
            Object.values(this.routes).forEach(({ view }) => {
                if (view && view.active) {
                    view.hide();
                }
            });

            view.show();
        }

        this.routes[path] = { View, view, el, mode };
    }

    start () {
        this.root.addEventListener('click', (event) => {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            }

            event.preventDefault();
            const link = event.target;

            console.log({
                pathname: link.pathname
            });

            this.open(link.pathname);
        });

        window.addEventListener('popstate', () => {
            const currentPath = window.location.pathname;

            this.open(currentPath);
        });

        Bus.on('authorization-checked', () => {
            const currentPath = window.location.pathname;
            this.open(currentPath);
        });
        Bus.emit('check-autorized');
    }
}

export default new Router();
