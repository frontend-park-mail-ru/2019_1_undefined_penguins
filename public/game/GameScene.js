export default class GameScene {
    constructor(canvas) {
        console.log('GameScene.fn');

        this.canvas = canvas;
        ctx = this.canvas.getContext('2d');
        this.fieldSize = 1;

        // this.bindedResizer = this.resizer.bind(this);
        // window.addEventListener('resize', this.bindedResizer);
        // this.resizer();

        this.setState({});
        this._init(); // TODO: объединить с setState
        this.render();
    }

    // resizer() {
    //     const height = window.innerHeight;
    //     this.fieldSize = (height / HDim) | 0;

    //     this.canvas.dheight = this.fieldSize * HDim;
    //     this.canvas.dwidth = this.fieldSize * WDim;

    //     this.canvas.height = this.canvas.dheight;
    //     this.canvas.width = this.canvas.dwidth;
    // }

    setState(state) {
        // console.log(`GameScene.fn.setState`, state);

        this.state = state;
    }

    render() {
        // console.log(`GameScene.fn.render`);

        if (!this.state) {
            return;
        }

        const ctx = this.ctx;

        if (this.penguinAlpha == 360) {
            this.penguinAlpha = 0;
        }
        if (this.penguinAlpha == -1) {
            this.penguinAlpha = 359;
        }
        // если съедает рыбку полностью, то увеличивается количество очков
        let eaten = -1;

        for (let i = 0; i < this.pisces.length; i++) {
            if (this.penguinAlpha == this.pisces[i].degree) {
                this.score++;
                this.scoreElement.innerText = this.score;

                eaten = i;
                break;
            }
            ctx.fillStyle = 'lime';
            ctx.fillRect(this.pisces[i].x, this.pisces[i].y, this.fishWidth, this.fishHeigth);
        }


        if (eaten != -1) {
            this.pisces.splice(eaten, 1);
            if (this.pisces.length == 0) {
                alert('Вы выиграли');
                clearInterval(this.interval1);
                clearInterval(this.interval2);
                Bus.emit('open-menu');
            }
        }

        // удаляем старого пингвина
        ctx.clearRect(this.penguinX - 5, this.penguinY - 5, this.penguinWidth + 10, this.penguinHeigth + 10);

        // считаем нового пингвина
        if (this.clockwise) {
            this.penguinAlpha++;
        } else {
            this.penguinAlpha--;
        }
        this.penguinX = Math.floor(this.canv.width / 2 + Math.sin(this.degreesToRadians(this.penguinAlpha)) * this.circleSize / 2);
        this.penguinY = Math.floor(this.canv.width / 2 - Math.cos(this.degreesToRadians(this.penguinAlpha)) * this.circleSize / 2);

        // назначаем нового пингвина
        ctx.fillStyle = '#9932CC';
        ctx.fillRect(this.penguinX, this.penguinY, this.penguinWidth, this.penguinHeigth);
    }
}

_init() {
    // устанавливаем счетчик
    this.score = 0;
    // рисуем бэкграунд
    ctx.fillStyle = 'rgba(130,130,130,0)';
    // ctx.fillStyle = 'rgba(130,130,130,0)'; //прозрачный
    ctx.fillRect(0, 0, this.canv.width, this.canv.height);


    // рисуем пушку
    ctx.fillStyle = 'red';
    ctx.fillRect(this.canv.width / 2, this.canv.height / 2, this.gunWidth, this.gunHeigth);

    // рисуем рыбок
    ctx.fillStyle = 'lime';
    for (let i = 0; i < this.piscesCount; i++) {
        const length = (this.circleSize / 2);
        const alpha = (360 / this.piscesCount) * i;


        const alphaRad = this.degreesToRadians(alpha);
        const x = Math.floor(this.canv.width / 2 + Math.sin(alphaRad) * length);
        const y = Math.floor(this.canv.height / 2 - Math.cos(alphaRad) * length);

        this.pisces.push({ x, y, degree: alpha });
        ctx.fillRect(x, y, this.fishWidth, this.fishHeigth);
    }
    // назначаем стартовую позицию пингвину
    this.penguinAlpha = Math.floor(Math.random() * 360);

    this.penguinX = Math.floor(this.canv.width / 2 + Math.sin(this.degreesToRadians(this.penguinAlpha)) * this.circleSize / 2);

    this.penguinY = Math.floor(this.canv.width / 2 - Math.cos(this.degreesToRadians(this.penguinAlpha)) * this.circleSize / 2);

    // рисуем пингвина
    ctx.fillStyle = '#9932CC';
    ctx.fillRect(this.penguinX, this.penguinY, this.penguinWidth, this.penguinHeigth);

    // направление движения пингвина
    this.clockwise = true;

    // this.interval1 = setInterval(() => this.game(), 15);
    // this.interval2 = setInterval(() => this.shot(), 20);
}
}

    // setNames(me, opponent) {
    //     this.players = {me, opponent};
    // }

    // destroy() {
    //     window.removeEventListener('resize', this.bindedResizer);
    // }