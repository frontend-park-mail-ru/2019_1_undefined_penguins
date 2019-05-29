export default class GameScene {
    constructor(canvases) {
        // console.log('GameScene.fn');

        this.canvases = canvases;

        this.ctxFish = this.canvases['fish'].getContext('2d');
        this.ctxPenguin = this.canvases['penguin'].getContext('2d');
        this.ctxSnow = this.canvases['snow'].getContext('2d');
        this.ctxGun = this.canvases['gun'].getContext('2d');

        this.resizer();
        //TODO: resizer
        // this.fieldSize = 1;

        // this.bindedResizer = this.resizer.bind(this);
        // window.addEventListener('resize', this.bindedResizer);
        // this.resizer();

        this.setState({});

        this.canvases['penguin'] = document.getElementsByClassName('canvas-penguin')[0];
        this.canvases['fish'] = document.getElementsByClassName('canvas-fish')[0];
        this.canvases['snow'] = document.getElementsByClassName('canvas-snow')[0];
        this.canvases['gun'] = document.getElementsByClassName('canvas-gun')[0];

        this.fishImage = new Image();
        this.fishImage.src = '../images/fish.png';

        this.injuredPenguinImage = new Image();
        this.injuredPenguinImage.src = '../images/injured.webp';

        this.penguinImage = new Image();
        this.penguinImage.src = '../images/penguin.webp';

        this.bulletImage = new Image();
        this.bulletImage.src = '../images/snow-.webp';

        this.gunImage = new Image();
        this.gunImage.src = '../images/gun.webp';

        this.penguinGunImage = new Image();
        this.penguinGunImage.src = '../images/penguin-gun.webp';
    }

    resizer() {
        const sideLength = 100;
        const height = this.canvases['penguin'].height;
        this.increasePercentage = height/sideLength | 0;
        this.circleSize = height * 0.8;
        this.fishWidth = this.canvases['fish'].width/20;
        this.fishHeigth = this.canvases['fish'].height/40;
        this.penguinWidth = this.canvases['penguin'].width/12;
        this.penguinHeigth = this.canvases['penguin'].height/8;
        this.bulletWidth = this.canvases['snow'].width/30;
        this.bulletHeight = this.canvases['snow'].height/30;
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

    setPiscesAngles(angles) {
        this.piscesAngles = angles;
    }

    getState(){
        return this.state;
    }

    choiceOfRenderAsPenguin() {
        if (this.state.piscesAngles !== undefined) {
            this.renderAllAsPenguin();
        } else {
            this.renderAsPenguin();
        }
    }

    choiceOfRenderAsGun() {
        if (this.state.piscesAngles !== undefined) {
            this.renderAllAsGun();
        } else {
            this.renderAsGun();
        }
    }

    renderPisces(){
        this.canvases['fish'] = document.getElementsByClassName('canvas-fish')[0];
        this.ctxFish = this.canvases['fish'].getContext('2d');
        this.ctxFish.clearRect(0, 0, this.canvases['fish'].width, this.canvases['fish'].height);
        if (this.fishImage.complete) {
            this.piscesAngles.forEach(element => {
                const x = this.getX(element);
                const y = this.getY(element);
                setTimeout(function() {
                    this.ctxFish.drawImage(this.fishImage, x-this.fishWidth/2, y-this.fishHeigth/2, this.fishWidth, this.fishHeigth);                
                }.bind(this), element*3);
            });
        } else {
            this.fishImage.onload = function () {
                this.piscesAngles.forEach(element => {
                    const x = this.getX(element);
                    const y = this.getY(element);            
                    setTimeout(function() {
                        this.ctxFish.drawImage(this.fishImage, x-this.fishWidth/2, y-this.fishHeigth/2, this.fishWidth, this.fishHeigth);                
                    }.bind(this), element*3);          
                });
            }.bind(this);
            this.fishImage.src = '../images/fish.png';
        }
    }

    renderPenguin(){
        this.canvases['penguin'] = document.getElementsByClassName('canvas-penguin')[0];
        this.ctxPenguin = this.canvases['penguin'].getContext('2d');
        // const penguinImage=new Image();
        const x = this.getX(this.state.penguin.alpha);
        const y = this.getY(this.state.penguin.alpha);
        // penguinImage.onload = function (){
        this.ctxPenguin.clearRect(0, 0, this.canvases['penguin'].width, this.canvases['penguin'].height);
        this.ctxPenguin.translate(x, y);
        if (this.state.penguin.clockwise) {
            this.ctxPenguin.rotate(this.degreesToRadians(this.state.penguin.alpha+90));
        } else {
            this.ctxPenguin.rotate(this.degreesToRadians(this.state.penguin.alpha-90));
        }
        this.ctxPenguin.drawImage(this.penguinImage, -this.penguinWidth / 2, -this.penguinHeigth / 2, this.penguinWidth, this.penguinHeigth);
        if (this.state.penguin.clockwise) {
            this.ctxPenguin.rotate(-this.degreesToRadians(this.state.penguin.alpha+90));
        } else {
            this.ctxPenguin.rotate(-this.degreesToRadians(this.state.penguin.alpha-90));
        }
        this.ctxPenguin.translate(-x, -y);
    }

    renderInjuredPenguin(){
        this.canvases['penguin'] = document.getElementsByClassName('canvas-penguin')[0];
        this.ctxPenguin = this.canvases['penguin'].getContext('2d');
        // const penguinImage=new Image();
        const x = this.getX(this.state.penguin.alpha);
        const y = this.getY(this.state.penguin.alpha);
        // penguinImage.onload = function (){
        this.ctxPenguin.clearRect(0, 0, this.canvases['penguin'].width, this.canvases['penguin'].height);
        this.ctxSnow.clearRect(0, 0, this.canvases['snow'].width, this.canvases['snow'].height);
        this.ctxPenguin.translate(x, y);
        if (this.state.penguin.clockwise) {
            this.ctxPenguin.rotate(this.degreesToRadians(this.state.penguin.alpha + 90));
        } else {
            this.ctxPenguin.rotate(this.degreesToRadians(this.state.penguin.alpha - 90));
        }
        this.ctxPenguin.drawImage(this.injuredPenguinImage, -this.penguinWidth / 2, -this.penguinHeigth / 2, this.penguinWidth, this.penguinHeigth);
        if (this.state.penguin.clockwise) {
            this.ctxPenguin.rotate(-this.degreesToRadians(this.state.penguin.alpha + 90));
        } else {
            this.ctxPenguin.rotate(-this.degreesToRadians(this.state.penguin.alpha - 90));
        }
        this.ctxPenguin.translate(-x, -y);
    }

    renderBullet(){
        this.canvases['snow'] = document.getElementsByClassName('canvas-snow')[0];
        this.ctxSnow = this.canvases['snow'].getContext('2d');
        // const bulletImage=new Image();
        const x = this.getX(this.state.gun.bullet.alpha, this.state.gun.bullet.distance_from_center * this.increasePercentage);
        const y = this.getY(this.state.gun.bullet.alpha, this.state.gun.bullet.distance_from_center * this.increasePercentage);
        // bulletImage.onload = function (){
        this.ctxSnow.clearRect(0, 0, this.canvases['snow'].width, this.canvases['snow'].height);
        this.ctxSnow.drawImage(this.bulletImage, x-this.bulletWidth/2, y-this.bulletHeight/2, this.bulletWidth, this.bulletHeight);

    }

    renderGun(){
        this.canvases['gun'] = document.getElementsByClassName('canvas-gun')[0];
        this.ctxGun = this.canvases['gun'].getContext('2d');
        this.ctxGun.clearRect(0, 0, this.canvases['gun'].width, this.canvases['gun'].height);
        const gunWidth = this.canvases['gun'].width / 10;
        const gunHeigth = this.canvases['gun'].height / 10;
        this.ctxGun.translate(this.canvases['gun'].width / 2, this.canvases['gun'].height / 2);
        
        this.ctxGun.rotate(this.degreesToRadians(this.state.gun.alpha+180));
        
        this.ctxGun.drawImage(this.penguinGunImage, -gunWidth / 2, -gunHeigth / 2, gunWidth, gunHeigth);
        this.ctxGun.rotate(-this.degreesToRadians(this.state.gun.alpha+180));

        this.ctxGun.translate(-this.canvases['gun'].width / 2, -this.canvases['gun'].height / 2);
    }

    renderCloud(){
        this.canvases['gun'] = document.getElementsByClassName('canvas-gun')[0];
        this.ctxGun = this.canvases['gun'].getContext('2d');
        this.ctxGun.clearRect(0, 0, this.canvases['gun'].width, this.canvases['gun'].height);
        const gunWidth = this.canvases['gun'].width / 10;
        const gunHeigth = this.canvases['gun'].height / 10;
        // const gunImage=new Image();
        // gunImage.onload = function (){
        // }.bind(this);
        if (this.gunImage.complete) {
            this.ctxGun.drawImage(this.gunImage, this.canvases['gun'].width/2-gunWidth/2, this.canvases['gun'].height/2-gunHeigth/2, gunWidth, gunHeigth);
        } else {
            this.gunImage.onload = function () {
                this.ctxGun.drawImage(this.gunImage, this.canvases['gun'].width/2-gunWidth/2, this.canvases['gun'].height/2-gunHeigth/2, gunWidth, gunHeigth);
            }.bind(this);
        }

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

    renderAllAsGun(){
        this.renderPisces();
        this.renderPenguin();
        this.renderBullet();
        this.renderGun();
    }

    renderAsGun(){
        this.renderPenguin();
        this.renderBullet();
        this.renderGun();
    }

    setNames(penguin, gun) {
        this.players = { penguin, gun };
    }

    destroy() {
        // window.removeEventListener('resize', this.bindedResizer);
    }
}
