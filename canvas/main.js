$(document).ready(function(){
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    let arr = [];

    init();
    draw();
    move();

    function init(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }

    function draw(){
        for(let i = 0; i < 100; i++){
            let x = Math.random()*innerWidth;
            let y = Math.random()*innerHeight;
            const radius = Math.random()*100;
            if(x + radius > innerWidth) x -= radius;
            if(x - radius < 0 ) x += radius;
            if(y + radius > innerHeight) y -= radius;
            if(y - radius < 0) y += radius;

            arr.push(new Canvas(x,y,Math.random()*10, Math.random()*10,radius));
        }
    }

    function move(){

        loop();

        function loop(){
            ctx.clearRect(0,0,innerWidth,innerHeight);

            arr.forEach(function(el,index){
                el.draw();
            })

            requestAnimationFrame(loop);
        }

    }

})

function Canvas(x,y,dx,dy,radius){
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw();
}

Canvas.prototype.draw = function(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#2d185c';
    this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    this.ctx.stroke();

    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
        this.dx = -this.dx;
    }

    if(this.y + this.radius > innerHeight || this.y - this.radius < 0 ){
        this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

}