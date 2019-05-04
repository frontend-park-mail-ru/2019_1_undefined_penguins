export default class GameScene {
    constructor(canvases) {
        console.log('GameScene.fn');

        this.canvases = canvases;
        console.log('canv');

        this.ctxFish = this.canvases['fish'].getContext('2d');
        this.ctxPenguin = this.canvases['penguin'].getContext('2d');
        this.ctxSnow = this.canvases['snow'].getContext('2d');
        this.ctxGun = this.canvases['gun'].getContext('2d');
        console.log('canv4');

        this.resizer();
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
        this.circleSize = height * 0.8;
        this.fishWidth = this.canvases['fish'].width/20;
        this.fishHeigth = this.canvases['fish'].height/40;
        this.penguinWidth = this.canvases['penguin'].width/30;
        this.penguinHeigth = this.canvases['penguin'].height/20;
        this.bulletWidth = this.canvases['snow'].width/60;
        this.bulletHeight = this.canvases['snow'].height/60;
        console.log(this.canvases['fish'].width);

    }

    degreesToRadians(degrees){
        return degrees * (Math.PI/180);
    }

    getX(degrees, distanceFromCenter = this.circleSize/2){
        return Math.floor(this.canvases['penguin'].height/2 + Math.sin(this.degreesToRadians(degrees))*distanceFromCenter);
    }

    getY(degrees, distanceFromCenter = this.circleSize/2){
        return Math.floor(this.canvases['penguin'].height/2 - Math.cos(this.degreesToRadians(degrees))*distanceFromCenter);
    }

    setState(state) {
        this.state = state;
    }

    getState(){
        return this.state;
    }

    renderPisces(){
        this.ctxFish.clearRect(0, 0, this.canvases['fish'].width, this.canvases['fish'].height);
        this.state.piscesAngles.forEach(element => {
            const fishImage=new Image();
            const x = this.getX(element);
            const y = this.getY(element);
            fishImage.onload = function (){
                this.ctxFish.drawImage(fishImage, x-this.fishWidth/2, y-this.fishHeigth/2, this.fishWidth, this.fishHeigth);
            }.bind(this);
            fishImage.src = '../images/fish-3.png';
        });
    }

    renderPenguin(){
        this.ctxPenguin.clearRect(0, 0, this.canvases['penguin'].width, this.canvases['penguin'].height);
        const penguinImage=new Image();
        const x = this.getX(this.state.penguinAngle);
        const y = this.getY(this.state.penguinAngle);
        penguinImage.onload = function (){
            this.ctxPenguin.translate(x, y);
            if (this.state.clockwise) {
                this.ctxPenguin.rotate(this.degreesToRadians(this.state.penguinAngle+90));
            } else {
                this.ctxPenguin.rotate(this.degreesToRadians(this.state.penguinAngle-90));
            }
            
            this.ctxPenguin.drawImage(penguinImage, -this.penguinWidth / 2, -this.penguinHeigth / 2, this.penguinWidth, this.penguinHeigth);
            if (this.state.clockwise) {
                this.ctxPenguin.rotate(-this.degreesToRadians(this.state.penguinAngle+90));
            } else {
                this.ctxPenguin.rotate(-this.degreesToRadians(this.state.penguinAngle-90));
            }
            this.ctxPenguin.translate(-x, -y);
        }.bind(this);
        penguinImage.src='../images/penguin-2.png';

    }

    renderInjuredPenguin(){
        // this.ctxPenguin

    }

    renderBullet(){
        this.ctxSnow.clearRect(0, 0, this.canvases['snow'].width, this.canvases['snow'].height);
        const bulletImage=new Image();
        const x = this.getX(this.state.bullet.angle,this.state.bullet.distanceFromCenter*this.increasePercentage);
        const y = this.getY(this.state.bullet.angle,this.state.bullet.distanceFromCenter*this.increasePercentage);
        bulletImage.onload = function (){
            this.ctxSnow.drawImage(bulletImage, x-this.bulletWidth/2, y-this.bulletHeight/2, this.bulletWidth, this.bulletHeight);

        }.bind(this);
        bulletImage.src = '../images/snow-1.png';

    }

    renderGun(){
        // this.ctxGun

    }

    renderCloud(){
        this.ctxGun.clearRect(0, 0, this.canvases['snow'].width, this.canvases['snow'].height);
        const gunWidth = this.canvases['gun'].width / 10;
        const gunHeigth = this.canvases['gun'].height / 10;
        const gunImage=new Image();
        gunImage.onload = function (){
            this.ctxGun.drawImage(gunImage, this.canvases['gun'].width/2-gunWidth/2, this.canvases['gun'].height/2-gunHeigth/2, gunWidth, gunHeigth);
        }.bind(this);
        gunImage.src = '../images/cloud.png';

    }

    removeFish(angle){
        const x = this.getX(angle);
        const y = this.getY(angle);
        this.ctxFish.clearRect(x-this.fishWidth/2, y-this.fishHeigth/2, this.fishWidth, this.fishHeigth);
    }

    renderAllAsPenguin(){
        this.renderPisces();
        this.renderPenguin();
        this.renderBullet();
        this.renderCloud();
    }

    renderAsPenguin(){
        this.renderPenguin();
        this.renderBullet();
    }

    renderAsGun(){

    }

    setNames(me, opponent) {
        this.players = { me, opponent };
    }
}

// destroy() {
//     window.removeEventListener('resize', this.bindedResizer);
// }