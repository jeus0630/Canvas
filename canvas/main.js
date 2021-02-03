function Canvas(x,y,dx,dy,radius){
    this.init(x,y,dx,dy,radius);
    this.draw();
}

Canvas.prototype.init = function(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = this.radius;
    this.maxRadius = 60;
    this.color = colors[Math.floor( Math.random() * colors.length)];

    if(Math.floor(this.dx) % 2 == 0) this.dx = -this.dx;
    if(Math.floor(this.dy) % 2 == 0) this.dy = -this.dy;

    this.canvas = document.querySelector('canvas');
    this.ctx = canvas.getContext('2d');
}

Canvas.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    this.x += this.dx;
    this.y += this.dy;

    if(this.x + this.dx > innerWidth || this.x + this.dx < 0) this.dx = -this.dx;
    if(this.y + this.dy > innerHeight || this.y + this.dy < 0) this.dy = -this.dy;

    if(this.x - mouse.x < 100 && this.x - mouse.x > -100 && this.y - mouse.y < 100 && this.y - mouse.y > -100){
        if(this.radius < this.maxRadius) this.radius += 2;
    }else if(this.radius > this.minRadius){
        this.radius -= 2;
    }
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let arr = [];
let colors = ['#020659','#010440','#010326','#C0D904','#888C03'];
let mouse = {
    x : undefined,
    y : undefined
}

canvas.width = innerWidth;
canvas.height = innerHeight;

loop();
createCircles();

function loop(){
    ctx.clearRect(0,0,innerWidth, innerHeight);

    arr.forEach(function(el,index){
        el.draw();
    })

    requestAnimationFrame(loop);
}

function createCircles(){

    for(let i = 0; i < 500; i++){
        let x = Math.random()*innerWidth;
        let y= Math.random()*innerHeight;
        const dx = Math.random()*5;
        const dy = Math.random()*5;
        const radius = Math.random()*10 + 2;

        if(x + radius > innerWidth) x -= radius;
        if(x - radius < 0) x += radius;
        if(y + radius > innerHeight) y -= radius;
        if(y - radius < 0) y += radius;

        arr.push(new Canvas(x,y,dx,dy,radius));
    }

}

$(window).on({
    mousemove : function(e){
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
});