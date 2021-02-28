class Ball {
    constructor(pos, radius, vel = new Vector2D(0,0), acc  = new Vector2D(0,0)) {
        this.pos = pos;
        this.radius = radius;
        this.vel = vel;
        this.acc = acc;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "rgba(250, 250, 250, 0.7)";
        ctx.arc(this.pos.x,
                this.pos.y,
                this.radius,
                0,
                2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    update(size) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.reset(0, 0);

        if(this.pos.x > size.x) {
            this.pos.x = size.x / 2 + 300;
            this.pos.y = size.y / 2;
            this.vel.mul(-1);
            player1.goals += 1;
            //this.acc.reset(-1, 0);
        } 
        if(this.pos.x < 0) {
            this.pos.x = size.x / 2 - 300;
            this.pos.y = size.y / 2;
            this.vel.mul(-1);
            player2.goals += 1;
            //this.acc.reset(1, 0);
        }
        if(this.pos.y > size.y) {
            audioBounce.play();
            this.pos.y = size.y;
            this.vel.y *= -1;
            //this.acc.reset(0, -1);
        } 
        if(this.pos.y - this.radius < 30) {
            audioBounce.play();
            this.pos.y = 30 + this.radius;
            this.vel.y *= -1;
            //this.acc.reset(0, 1);
        }
    }
}
