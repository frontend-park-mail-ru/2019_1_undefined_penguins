export default class GameScene {
    constructor(canvases) {
        console.log('GameScene.fn');

        this.canvases = canvases;

        this.ctxFish = this.canvases['fish'].getContext('2d');
        this.ctxPenguin = this.canvases['penguin'].getContext('2d');
        this.ctxSnow = this.canvases['snow'].getContext('2d');
        this.ctxGun = this.canvases['gun'].getContext('2d');

        // this.fieldSize = 1;

        // this.bindedResizer = this.resizer.bind(this);
        // window.addEventListener('resize', this.bindedResizer);
        // this.resizer();

        // this.setState({});
        // this._init(); // TODO: объединить с setState
        // this.render();
    }

    resizer() {
        const sideLength = 100;
        const height = this.canvases['penguin'].height;
        this.increasePercentage = height/sideLength | 0;
    }

    setState(state) {
        this.state = state;
    }

    renderPisces(){
        // this.ctxFish
        this.state.piscesAngles.forEach(element => {
            
        });
    }

    renderPenguin(){
       // this.ctxPenguin

    }

    renderInjuredPenguin(){
        // this.ctxPenguin

    }

    renderBullet(){
        // this.ctxSnow

    }

    renderGun(){
       // this.ctxGun

    }

    removeFish(angle){
        // this.ctxFish

    }

    renderAll() {
        this.renderPisces();
        this.renderPenguin();
        this.renderBullet();
        this.renderGun();

    }

    setNames(me, opponent) {
        this.players = { me, opponent };
    }
}

// destroy() {
//     window.removeEventListener('resize', this.bindedResizer);
// }