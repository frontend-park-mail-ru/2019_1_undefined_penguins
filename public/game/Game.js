import Bus from '../scripts/EventBus.js';
export default class Game{
    constructor() {
        this.circleSize = 1000;
        this.piscesCount = 24;


        //размеры рыбы
        this.fishWidth = 20;
        this.fishHeigth = 20;

        //размеры пушки
        this.gunWidth = 40;
        this.gunHeigth = 40;

        //размеры пингвина
        this.penguinWidth = 40;
        this.penguinHeigth = 40;

        //позиция пингвина
        this.penguinX;
        this.penguinY;
        this.penguinAlpha;

        this.clockwise;

        this.score;
        this.scoreElement=document.getElementById("score");
        this.canv=document.getElementById("gc");
        this.pisces=[];

        this.shoted = false;
        this.bulletX;
        this.bulletY;
        this.bulletLength;
        this.bulletAlpha;
        this.bulletWidth = 20;
        this.bulletHeight = 20;

        this.ctx=this.canv.getContext("2d");
        this.init();
        document.addEventListener("keydown", (event) => {
            event.preventDefault();
            this.keyPush(event);
        });
        // document.getElementById('application').onkeypress = function(e) {
        //     this.keyPush(e);
        // }
    }
    degreesToRadians(degrees){
        return degrees * (Math.PI/180);
    }

    init(){

        //устанавливаем счетчик
        this.score = 0;
        //рисуем бэкграунд
        this.ctx.fillStyle='rgba(130,130,130,0)';
        // ctx.fillStyle = 'rgba(130,130,130,0)'; //прозрачный
        this.ctx.fillRect(0,0,1200,this.canv.height);
    
    
    
        //рисуем пушку
        this.ctx.fillStyle="red";
        this.ctx.fillRect(1200/2, this.canv.height/2, this.gunWidth, this.gunHeigth);
    
        //рисуем рыбок
        this.ctx.fillStyle="lime";
        for (let i = 0; i < this.piscesCount; i++) {
            let length = (this.circleSize/2);
            let alpha = (360/this.piscesCount)*i;

    
            let alphaRad = this.degreesToRadians(alpha);
            let x = Math.floor(1200/2 + Math.sin(alphaRad)*length); 
            let y = Math.floor(this.canv.height/2 - Math.cos(alphaRad)*length);
 
            this.pisces.push({x:x,y:y, degree:alpha});
            this.ctx.fillRect(x, y, this.fishWidth, this.fishHeigth);
        }
        //назначаем стартовую позицию пингвину
        this.penguinAlpha =  Math.floor(Math.random()*360);

        this.penguinX = Math.floor(1200/2 + Math.sin(this.degreesToRadians(this.penguinAlpha))*this.circleSize/2); 

        this.penguinY = Math.floor(1200/2 - Math.cos(this.degreesToRadians(this.penguinAlpha))*this.circleSize/2); 

        //рисуем пингвина
        this.ctx.fillStyle="#9932CC";
        this.ctx.fillRect(this.penguinX, this.penguinY, this.penguinWidth, this.penguinHeigth);
    
        //направление движения пингвина
        this.clockwise = true;
        console.log(this)

        this.interval1 = setInterval(() => this.game(), 15);
        this.interval2 = setInterval(() => this.shot(), 15);
    
    }

    game() {
        console.log(this)

        if (this.penguinAlpha == 360) {
            this.penguinAlpha = 0;
        }
        if (this.penguinAlpha == -1) {
            this.penguinAlpha = 359;
        }
        //если съедает рыбку полностью, то увеличивается количество очков
        let eaten = -1;

        for (let i = 0; i < this.pisces.length; i++) {
            if (this.penguinAlpha == this.pisces[i].degree) {
                this.score++;
                this.scoreElement.innerText = this.score;
                
                eaten = i;
                break;
            }
            this.ctx.fillStyle="lime";
            this.ctx.fillRect(this.pisces[i].x, this.pisces[i].y, this.fishWidth, this.fishHeigth);
            
        }


        if (eaten != -1) {
            this.pisces.splice(eaten, 1);
            if (this.pisces.length == 0) {
                alert("Вы выиграли");
                clearInterval(this.interval1);
                clearInterval(this.interval2);
                Bus.emit('open-menu');

            }
        }
    
        //удаляем старого пингвина
        this.ctx.clearRect(this.penguinX-5, this.penguinY-5, this.penguinWidth+10, this.penguinHeigth+10);
        
        //считаем нового пингвина
        if (this.clockwise) {
            this.penguinAlpha++;
        } else {
            this.penguinAlpha--;
        }
        this.penguinX = Math.floor(1200/2 + Math.sin(this.degreesToRadians(this.penguinAlpha))*this.circleSize/2); 
        this.penguinY = Math.floor(1200/2 - Math.cos(this.degreesToRadians(this.penguinAlpha))*this.circleSize/2); 
       
        //назначаем нового пингвина 
        this.ctx.fillStyle="#9932CC";
        this.ctx.fillRect(this.penguinX, this.penguinY, this.penguinWidth, this.penguinHeigth);
    }

    shot() {
        console.log(this)
        if (!this.shoted) {
            this.shoted = true;
            if (this.clockwise) {
                this.bulletAlpha = this.penguinAlpha + Math.floor(Math.random()*100);
            } else {
                this.bulletAlpha = this.penguinAlpha - Math.floor(Math.random()*100);
            }
            
            this.bulletLength = 20;
        }
        this.ctx.clearRect(this.bulletX, this.bulletY, this.bulletWidth, this.bulletHeight);

        // degrees * (Math.PI/180);
        this.bulletX = Math.floor(1200/2 + Math.sin(this.bulletAlpha*(Math.PI/180))*this.bulletLength);  
        this.bulletY = Math.floor(1200/2 - Math.cos(this.bulletAlpha*(Math.PI/180))*this.bulletLength); 
        this.bulletLength+=15;
        this.ctx.fillStyle="red";
        this.ctx.fillRect(1200/2, this.canv.height/2, this.gunWidth, this.gunHeigth);
        this.ctx.fillStyle="black";
        this.ctx.fillRect(this.bulletX, this.bulletY, this.bulletWidth, this.bulletHeight);
        if (this.bulletLength > this.circleSize/2) {
            this.shoted = false;
            return;
        }
        if (this.bulletLength > this.circleSize/2 - this.penguinHeigth && this.bulletAlpha >= this.penguinAlpha - 3 && this.bulletAlpha <= this.penguinAlpha + 3) {
            alert("Вы проиграли");
            clearInterval(this.interval1);
            clearInterval(this.interval2);
            Bus.emit('open-menu');
            // this.shoted = false;
        }
        
    
    }

    keyPush(evt) {
        //привязываем пробел
        switch(evt.keyCode) {
            case 32:
                this.clockwise = !this.clockwise
                break;
        }
    }
}