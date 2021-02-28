class Player {
    constructor(pos, size, color, vel, acc, goals) {
        this.pos = pos;
        this.size = size;
        this.color = color;
        this.vel = vel;
        this.acc = acc;
        this.goals = goals;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    update(size) {
        this.pos.add(this.vel);

        if(this.pos.y < 30) {
            this.pos.y = 30;
        }
        if(this.pos.y +  this.size.y > size.y) {
            this.pos.y = size.y - this.size.y;
        }
    }
}
