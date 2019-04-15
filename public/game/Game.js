// window.onload=function() {
//     this.canv=document.getElementById("gc");
    
//     ctx=this.canv.getContext("2d");
//     init();
//     document.addEventListener("keydown",keyPush);
//     setInterval(game,15);
//     setInterval(shot,15);
// }

// (function(){
//     this.canv=document.getElementById("gc");
    
//     ctx=this.canv.getContext("2d");
//     init();
//     document.addEventListener("keydown",keyPush);
//     setInterval(game,15);
//     setInterval(shot,15);
// }())

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
        document.addEventListener("keydown",this.keyPush);
        setInterval(this.game(this.pisces),15);
        setInterval(this.shot,15);
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

        console.log(10)
        this.penguinX = Math.floor(1200/2 + Math.sin(this.degreesToRadians(this.penguinAlpha))*this.circleSize/2); 
        console.log(11)

        this.penguinY = Math.floor(1200/2 - Math.cos(this.degreesToRadians(this.penguinAlpha))*this.circleSize/2); 
        console.log(12)

        //рисуем пингвина
        this.ctx.fillStyle="#9932CC";
        this.ctx.fillRect(this.penguinX, this.penguinY, this.penguinWidth, this.penguinHeigth);
    
        //направление движения пингвина
        this.clockwise = true;
    
    
    }

    game(pisces) {

        if (this.penguinAlpha == 360) {
            this.penguinAlpha = 0;
        }
        if (this.penguinAlpha == -1) {
            this.penguinAlpha = 359;
        }
        //если съедает рыбку полностью, то увеличивается количество очков
        let eaten = -1;

        for (let i = 0; i < pisces.length; i++) {
            if (this.penguinAlpha == pisces[i].degree) {
                this.score++;
                document.getElementById("score").innerText = this.score;
                
                eaten = i;
                break;
            }
            this.ctx.fillStyle="lime";
            this.ctx.fillRect(pisces[i].x, pisces[i].y, this.fishWidth, this.fishHeigth);
            
        }


        if (eaten != -1) {
            pisces.splice(eaten, 1);
            if (pisces.length == 0) {
                alert("Вы выиграли")
            }
        }
    
        //удаляем старого пингвина
        // this.ctx.clearRect(this.penguinX-5, this.penguinY-5, this.penguinWidth+10, this.penguinHeigth+10);
        
        //считаем нового пингвина
        if (this.clockwise) {
            this.penguinAlpha++;
        } else {
            this.penguinAlpha--;
        }
        console.log(1)
        this.penguinX = Math.floor(1200/2 + Math.sin(this.degreesToRadians(this.penguinAlpha))*this.circleSize/2); 
        console.log(2)
        this.penguinY = Math.floor(1200/2 - Math.cos(this.degreesToRadians(this.penguinAlpha))*this.circleSize/2); 
       
        console.log(3)
        //назначаем нового пингвина 
        this.ctx.fillStyle="#9932CC";
        this.ctx.fillRect(this.penguinX, this.penguinY, this.penguinWidth, this.penguinHeigth);
    }

    shot() {
        if (!this.shoted) {
            this.shoted = true;
            if (this.clockwise) {
                this.bulletAlpha = this.penguinAlpha + Math.floor(Math.random()*100);
            } else {
                this.bulletAlpha = this.penguinAlpha - Math.floor(Math.random()*100);
            }
            
            this.bulletLength = 20;
        }
        // this.ctx.clearRect(this.bulletX, this.bulletY, this.bulletWidth, this.bulletHeight);

        console.log(4)
        // degrees * (Math.PI/180);
        this.bulletX = Math.floor(1200/2 + Math.sin(this.bulletAlpha*(Math.PI/180))*this.bulletLength);  
        console.log(5)
        this.bulletY = Math.floor(1200/2 - Math.cos(this.bulletAlpha*(Math.PI/180))*this.bulletLength); 
        console.log(6)
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
            this.shoted = false;
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



