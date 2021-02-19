$(document).ready(function(){

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const particle_arr = [];

    const mouse = {
        x : null,
        y : null
    }

    const colors = ['#BF414C','#BF9A84','#261914','#8C6658','#8C1B1B'];


    init();
    loop();

    function init(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        for(let i = 0; i < 100; i++){
            const radius = getRand(1,10);
            let x = getRand(radius,innerWidth-radius);
            let y = getRand(radius,innerHeight-radius);
            const dx = getRand(1,3);
            const dy = getRand(1,3);
            const color = getColor();

            if(i !== 0){
                for(let j = 0; j < i; j++){
                    const result = getDistance(x,y,particle_arr[j].x,particle_arr[j].y);
                    if(result < radius + particle_arr[j].radius){
                        x = getRand(radius,innerWidth-radius);
                        y = getRand(radius,innerHeight-radius);
                        j = -1;
                    }
                }
            }

            particle_arr.push(new Canvas(x,y,dx,dy,radius,color));
        }

        $(window).on('mousemove',function(e){
            mouse.x = e.pageX;
            mouse.y = e.pageY;
        })
    }

    function loop(){
        console.log(mouse.x);
        ctx.clearRect(0,0,innerWidth,innerHeight);

        for(let i = 0; i < particle_arr.length; i++){
            particle_arr[i].update();
        }

        requestAnimationFrame(loop);
    }

    function Canvas(x,y,dx,dy,radius,color){

        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.velocity = {
            x : this.dx,
            y : this.dy
        }
        this.radius = radius;
        this.color = color;
        this.mass = 1;

        this.draw = function(){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.stroke();
            ctx.closePath();
        }

        this.update = function(){
            if(getDistance(mouse.x,mouse.y,this.x,this.y) < 100){
                ctx.fill();
            }

            for(let i = 0; i < particle_arr.length; i++){
                const dist =getDistance(this.x,this.y,particle_arr[i].x,particle_arr[i].y);
                if(this === particle_arr[i]) continue;
                if(dist <= this.radius + particle_arr[i].radius){
                    resolveCollision(this,particle_arr[i]);
                }
            }

            // this.x += this.velocity.x;
            // this.y += this.velocity.y;

            if(this.x + this.radius > innerWidth || this.x - this.radius < 0) this.velocity.x = -this.velocity.x;
            if(this.y + this.radius > innerHeight || this.y - this.radius < 0) this.velocity.y = -this.velocity.y;

            this.draw();
        }

    }

    function getRand(min,max){
        let result = null;

        result = Math.floor(Math.random()*(max-min+1)+min);

        return result;
    }

    function getDistance(x1,y1,x2,y2){
        let result = null;

        const xDist = x2-x1;
        const yDist = y2-y1;

        result = Math.hypot(xDist,yDist);

        return result;
    }

    function rotate(velocity, angle) {
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };

        return rotatedVelocities;
    }

    /**
     * Swaps out two colliding particles' x and y velocities after running through
     * an elastic collision reaction equation
     *
     * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
     * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
     * @return Null | Does not return a value
     */

    function resolveCollision(particle, otherParticle) {
        const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
        const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

        const xDist = otherParticle.x - particle.x;
        const yDist = otherParticle.y - particle.y;

        // Prevent accidental overlap of particles
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

            // Grab angle between the two colliding particles
            const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

            // Store mass in var for better readability in collision equation
            const m1 = particle.mass;
            const m2 = otherParticle.mass;

            // Velocity before equation
            const u1 = rotate(particle.velocity, angle);
            const u2 = rotate(otherParticle.velocity, angle);

            // Velocity after 1d collision equation
            const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
            const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

            // Final velocity after rotating axis back to original location
            const vFinal1 = rotate(v1, -angle);
            const vFinal2 = rotate(v2, -angle);

            // Swap particle velocities for realistic bounce effect
            particle.velocity.x = vFinal1.x;
            particle.velocity.y = vFinal1.y;

            otherParticle.velocity.x = vFinal2.x;
            otherParticle.velocity.y = vFinal2.y;
        }
    }

    function getColor(){
        let result = null;

        result = colors[Math.floor(Math.random() * colors.length)];

        return result;
    }

})