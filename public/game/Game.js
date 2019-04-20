import Bus from '../scripts/EventBus.js';

export default class Game {
  constructor() {
    //объявляем диаметр круга
    this.circleSize = 500;
    //параметры рыбы
    this.fishWidth = 60;
    this.fishHeigth = 30;

    //массив рыб со свойствами: x(от левого верхнего угла), y(от левого верхнего угла), degree(в градусах как на тригонометрическом круге)
    this.pisces = [];

    //объект "пингвин" со свойствами: this.penguinPosition.clockwise, x(от левого верхнего угла), y(от левого верхнего угла), Alpha(в градусах как на тригонометрическом круге)
    this.penguinPosition = new Object();
    this.score = 0;
    this.scoreElement = document.getElementById("this.score");

    this.bullet = new Object();
    this.scoreElement = document.getElementById('score');

    this.canv = document.getElementById('gc');
    this.ctx = this.canv.getContext("2d");
    this.init(24);
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.keyPush(event);
    });
  }

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  init(piscesCount) {

    //рассчитываем рыбок
    for (let i = 0; i < piscesCount; i++) {
      let length = (this.circleSize / 2);
      let alpha = (360 / piscesCount) * i;
      const alphaRad = this.degreesToRadians(alpha);
      const x = Math.floor(this.canv.width / 2 + Math.sin(alphaRad) * length);
      const y = Math.floor(this.canv.height / 2 - Math.cos(alphaRad) * length);
      this.pisces.push({ x: x, y: y, degree: alpha });
    }
    //назначаем стартовую позицию пингвину
    this.penguinPosition.Alpha = Math.floor(Math.random() * 360);

    //направление движения пингвина
    this.penguinPosition.clockwise = true;

    this.interval1 = setInterval(() => this.game(), 20);
    this.interval2 = setInterval(() => this.shot(), 20);

    // this.requestID = requestAnimationFrame(this.game.bind(this));

  }

  drawCanvas() {
    const ctx = this.ctx;
    const pisces = this.pisces;
    const fishWidth = 30;
    const fishHeigth = 15;
    const penguinPosition = this.penguinPosition
    //СТЕРЕТЬ ВСЁ
    if (this.bullet.shoted === false) {
      ctx.clearRect(0, 0, this.canv.width, this.canv.height);
    }

    //ОТРИСОВКА РЫБОК
    for (let i = 0; i < this.pisces.length; i++) {
      // this.fishImage.src = "fish-3.png";
      // this.ctx.drawImage(this.fishImage, this.pisces[i].x-this.fishWidth/2, this.pisces[i].y-this.fishHeigth/2, this.fishWidth, this.fishHeigth);
      const fishImage = new Image();

      fishImage.onload = function () {
        ctx.drawImage(fishImage, pisces[i].x-fishWidth/2, pisces[i].y-fishHeigth/2, fishWidth, fishHeigth);
      };
      fishImage.src = "../images/fish-3.png";
    }
    //ОТРИСОВКА ПИНГВИНА
    //параметры пингвина
    const penguinWidth = 60;
    const penguinHeigth = 90;

    // ctx.translate(this.penguinPosition.x, this.penguinPosition.y);
    // if (this.penguinPosition.clockwise) {
    //     ctx.rotate(this.degreesToRadians(this.penguinPosition.Alpha+90));
    // } else {
    //     ctx.rotate(this.degreesToRadians(this.penguinPosition.Alpha-90));
    // }
    // const penguinImage=new Image();

    // penguinImage.onload= function() {
    //   ctx.drawImage(penguinImage, penguinPosition.x, penguinPosition.y, penguinWidth, penguinHeigth);

    // };
    // penguinImage.src="penguin-2.png";


    // if (this.penguinPosition.clockwise) {
    //     ctx.rotate(-this.degreesToRadians(this.penguinPosition.Alpha+90));
    // } else {
    //     ctx.rotate(-this.degreesToRadians(this.penguinPosition.Alpha-90));
    // }
    // ctx.translate(-this.penguinPosition.x, -this.penguinPosition.y);

    //ОТРИСОВКА ПУЛИ
    // this.bulletImage.src = "img/snow-1.png";
    // let bulletWidth = 20;
    // let bulletHeight = 20;
    // this.ctx.drawImage(this.bulletImage, this.bullet.x-bulletWidth/2, this.bullet.y-bulletHeight/2, bulletWidth, bulletHeight);

    const bulletImage = new Image();
    const bullet = this.bullet
    const bulletWidth = 20;
    const bulletHeight = 20;
    const lastBullet = this.lastBullet;
    bulletImage.onload = function () {
      if (lastBullet) {
        ctx.clearRect(lastBullet.x - bulletWidth / 2-10, lastBullet.y - bulletHeight / 2-10, bulletWidth+20, bulletHeight+20);
      }
      ctx.drawImage(bulletImage, bullet.x - bulletWidth / 2, bullet.y - bulletHeight / 2, bulletWidth, bulletHeight);

    };
    bulletImage.src = "../images/snow-1.png";
    this.lastBullet = this.bullet;

    //ОТРИСОВКА ПУШКИ
    // const gunWidth = 130;
    // const gunHeigth = 130;
    // this.gunImage.src = "cloud.png";
    // this.ctx.drawImage(this.gunImage, this.canv.width/2-gunWidth/2, this.canv.height/2-gunHeigth/2, gunWidth, gunHeigth);
    const canv = this.canv
    const gunImage = new Image();
    const gunWidth = 130;
    const gunHeigth = 130;
    gunImage.onload = function () {
      ctx.drawImage(gunImage, canv.width / 2 - gunWidth / 2, canv.height / 2 - gunHeigth / 2, gunWidth, gunHeigth);
    };
    gunImage.src = "../images/cloud.png";

    const penguinImage = new Image();

    penguinImage.onload = function () {
      ctx.translate(penguinPosition.x, penguinPosition.y);
      if (penguinPosition.clockwise) {
        ctx.rotate((Math.PI / 180) * (penguinPosition.Alpha + 90));
      } else {
        ctx.rotate((Math.PI / 180) * (penguinPosition.Alpha - 90));
      }
      ctx.clearRect(-penguinWidth / 2, -penguinHeigth / 2+5, penguinWidth+10, penguinHeigth);
      ctx.drawImage(penguinImage, -penguinWidth / 2, -penguinHeigth / 2, penguinWidth, penguinHeigth);

      if (penguinPosition.clockwise) {
        ctx.rotate(-(Math.PI / 180) * (penguinPosition.Alpha + 90));
      } else {
        ctx.rotate(-(Math.PI / 180) * (penguinPosition.Alpha - 90));
      }
      ctx.translate(-penguinPosition.x, -penguinPosition.y);
    };
    penguinImage.src = "../images/penguin-2.png";
  }

  game() {
    if (this.penguinPosition.Alpha == 360) {
      this.penguinPosition.Alpha = 0;
    }
    if (this.penguinPosition.Alpha == -1) {
      this.penguinPosition.Alpha = 359;
    }
    let eaten = -1;
    for (let i = 0; i < this.pisces.length; i++) {
      if (this.penguinPosition.Alpha == this.pisces[i].degree) {
        this.score++;
        this.scoreElement.innerText = this.score;
        eaten = i;
        break;
      }
    }
    if (eaten != -1) {
      this.pisces.splice(eaten, 1);
      if (this.pisces.length == 0) {
        clearInterval(this.interval1);
        clearInterval(this.interval2);
        // cancelAnimationFrame(this.requestID);
        Bus.emit('open-win-view', this.score);
      }
    }
    //считаем нового пингвина
    if (this.penguinPosition.clockwise) {
      this.penguinPosition.Alpha++;
    } else {
      this.penguinPosition.Alpha--;
    }
    this.penguinPosition.x = Math.floor(this.canv.width / 2 + Math.sin(this.degreesToRadians(this.penguinPosition.Alpha)) * this.circleSize / 2);
    this.penguinPosition.y = Math.floor(this.canv.width / 2 - Math.cos(this.degreesToRadians(this.penguinPosition.Alpha)) * this.circleSize / 2);
    // this.requestID = requestAnimationFrame(this.shot.bind(this));
  }

  shot() {
    if (!this.bullet.shoted) {
      this.bullet.shoted = true;
      if (this.penguinPosition.clockwise) {
        this.bullet.Alpha = this.penguinPosition.Alpha + Math.floor(Math.random() * 100);
      } else {
        this.bullet.Alpha = this.penguinPosition.Alpha - Math.floor(Math.random() * 100);
      }

      this.bullet.length = 20;
    }
    this.bullet.x = Math.floor(this.canv.width / 2 + Math.sin(this.degreesToRadians(this.bullet.Alpha)) * this.bullet.length);
    this.bullet.y = Math.floor(this.canv.width / 2 - Math.cos(this.degreesToRadians(this.bullet.Alpha)) * this.bullet.length);
    this.bullet.length += 10;
    if (this.bullet.length > this.circleSize / 2) {
      this.bullet.shoted = false;
    }
    //НАД ЭТОЙ ЛОГИКОЙ ПРЯМ ПОСИДЕТЬ ПОДУМАТЬ(ПО-ХОРОШЕМУ ПО УГЛУ СЧИТАТЬ)
    if (this.bullet.length > this.circleSize / 2 && this.bullet.Alpha >= this.penguinPosition.Alpha - 7 && this.bullet.Alpha <= this.penguinPosition.Alpha + 7) {
      clearInterval(this.interval1);
      clearInterval(this.interval2);
      // cancelAnimationFrame(this.requestID);
      Bus.emit('open-lost-view', this.score);
    }
    this.drawCanvas()
    // this.requestID = requestAnimationFrame(this.game.bind(this));
  }

  keyPush(evt) {
    // привязываем пробел
    switch (evt.keyCode) {
      case 32:
        this.penguinPosition.clockwise = !this.penguinPosition.clockwise;
        break;
    }
  }
}