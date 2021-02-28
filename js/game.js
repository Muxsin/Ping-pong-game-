class Game {
    constructor(menu, player1, player2,ball, size) {
        this.menu = menu;
        this.player1 = player1;
        this.player2 = player2;
        this.ball = ball;
        this.size = size;
    }

    loop(ctx) {
        this.draw(ctx);
    }

    gameMenu(ctx) {
        ctx.fillStyle = this.menu.bg;
        ctx.fillRect(this.menu.pos.x, this.menu.pos.y, this.menu.size.x, this.menu.size.y);
        ctx.fillStyle = 'white';
        ctx.font = "20px Arial";
        ctx.fillText('Menu', 10, 20);
        ctx.fillText(this.player1.goals, this.size.x/2 - 40, 20);
        ctx.fillText('-', this.size.x/2 - 10, 20);
        ctx.fillText(this.player2.goals, this.size.x/2 + 10, 20);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.size.x, this.size.y);
        ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
        ctx.font = "50px Arial";
        ctx.fillText("Made by", 70, 130);
        ctx.font = "200px Arial";
        ctx.fillText("L3@D3R", 60, 300);
        this.gameMenu(ctx);
        this.player1.draw(ctx);
        this.player2.draw(ctx);
        this.ball.draw(ctx);
    }

    update() {
        this.player1.update(this.size);
        this.player2.update(this.size);
        this.ball.update(this.size);
        this.collision();
    }

    collision() {
        if(this.ball.pos.x + this.ball.radius > this.player2.pos.x && this.ball.pos.x + this.ball.radius < this.player2.pos.x + this.player2.size.x && this.ball.pos.y > this.player2.pos.y && this.ball.pos.y < this.player2.pos.y + this.player2.size.y) {
            audioBounce.play();
            this.ball.pos.x =  player2.pos.x - this.ball.radius;
            this.ball.vel.x *= -1;
        }
        if(this.ball.pos.x - this.ball.radius > this.player1.pos.x && this.ball.pos.x - this.ball.radius < this.player1.pos.x + this.player1.size.x && this.ball.pos.y > this.player1.pos.y && this.ball.pos.y < this.player1.pos.y + this.player1.size.y) {
            audioBounce.play();
            this.ball.pos.x =  player1.pos.x + player1.size.x + this.ball.radius;
            this.ball.vel.x *= -1;
        }
    }
}
