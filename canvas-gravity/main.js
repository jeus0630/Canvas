function Canvas(x,y,dx,dy,radius){
    this.init(x,y,dx,dy,radius);
    this.draw();
}

Canvas.prototype.init = function(x,y,dx,dy,radius){
    this.canvas = document.querySelector('canvas');
    this.ctx =this.canvas.getContext('2d');

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    if(Math.floor(this.x) % 2 == 0 ) this.dx = -this.dx;
}

Canvas.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    this.ctx.fill();
    this.ctx.closePath();
}

Canvas.prototype.update = function(){

    if(this.y + this.radius > innerHeight){
        this.dy = -this.dy * 0.6;
        this.x += this.dx;
        if(this.dx < 0){
            this.dx--;
        }else{
            this.dx++;
        }
    }else{
        this.dy++;
    }

    this.y += this.dy;

    this.draw();
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ball = [];
const mouse = {
    x : null,
    y : null
}
init();
loop();

function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

function loop(){
    ctx.clearRect(0,0,innerWidth,innerHeight);

    ball.forEach(function(el,index){
        el.update();
    })

    requestAnimationFrame(loop);
}

$(window).on('click',function(e){
    mouse.x = e.pageX;
    mouse.y = e.pageY;

    for(let i = 0; i < 10; i++){
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;

        ball.push(new Canvas(x,y,1,1,50));
    }

})