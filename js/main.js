const _WIDTH = 1000, _HEIGHT = 500;
var audioBounce = new Audio('bounce.wav');
var c = document.getElementById('ping_pong');
c.setAttribute('width', _WIDTH);
c.setAttribute('height', _HEIGHT);
var ctx = c.getContext("2d");
var staticKey = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
},
refresh,
gameRunning = false;

let menu = {
    pos: new Vector2D(0, 0),
    size: new Vector2D(_WIDTH, 30),
    bg: 'green',
},
ball = new Ball(
    new Vector2D(50, 50),
    10,
    new Vector2D(6, 2),
    new Vector2D(0, 0)
),
player1 = new Player(
    new Vector2D(30, _HEIGHT / 2),
    new Vector2D(20, 100),
    'blue',
    new Vector2D(0, 0),
    new Vector2D(0, 0),
    0
),
player2 = new Player(
    new Vector2D(_WIDTH - 50, _HEIGHT / 2),
    new Vector2D(20, 100),
    'red',
    new Vector2D(0, 0),
    new Vector2D(0, 0),
    0
);

let game = new Game(menu, player1, player2, ball, new Vector2D(_WIDTH, _HEIGHT));

document.addEventListener('keydown', function (event) {
    if(event.key == 'w') {
        game.player1.vel.reset(0, -5);
    } 
    if(event.key == 's') {
        game.player1.vel.reset(0, 5);
    }
    if(event.key == 'ArrowUp') {
        game.player2.vel.reset(0, -5);
    } 
    if(event.key == 'ArrowDown') {
        game.player2.vel.reset(0, 5);
    }
});

document.addEventListener('keyup', function (event) {
    if(event.key == 'w') {
        game.player1.vel.reset(0, 0);
    } 
    if(event.key == 's') {
        game.player1.vel.reset(0, 0);
    }
    if(event.key == 'ArrowUp') {
        game.player2.vel.reset(0, 0);
    } 
    if(event.key == 'ArrowDown') {
        game.player2.vel.reset(0, 0);
    }
});

document.onmousedown = checkClick;

function checkClick(e) {
    if(!gameRunning) {
        if(e.clientX >= (_WIDTH / 4) + (_WIDTH / 2) - 30 && e.clientX <= (_WIDTH / 4) + (_WIDTH / 2) && e.clientY >= _HEIGHT / 4  && e.clientY <= _HEIGHT / 4 + 30) {
            refresh = setInterval(loop, 1000/60);
            gameRunning = true;
        }
        if(e.clientX >= _WIDTH / 2 - 70 && e.clientX <= _WIDTH / 2 + 70 && e.clientY >= 323 && e.clientY <= 350) {
            document.location.reload();
        }
    }
    if(e.clientX >= 13 && e.clientX <= 60 && e.clientY >= 6 && e.clientY <= 21) {
        showMenu();
    }
}

function showMenu() {
    if(gameRunning === true) {
        clearInterval(refresh);
        gameRunning = false;
    } else {
        refresh = setInterval(loop, 1000/60);
        gameRunning = true;
    }

    ctx.fillStyle = menu.bg;
    ctx.fillRect(_WIDTH / 4, _HEIGHT / 4, _WIDTH / 2, _HEIGHT / 2);
    ctx.fillStyle = 'rgba(4, 4, 4, 0.5)';
    ctx.fillRect((_WIDTH / 4) + (_WIDTH / 2) - 30, _HEIGHT / 4, 30, 30);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo((_WIDTH / 4) + (_WIDTH / 2) - 30, _HEIGHT / 4);
    ctx.lineTo((_WIDTH / 4) + (_WIDTH / 2), _HEIGHT / 4 + 30);
    ctx.moveTo((_WIDTH / 4) + (_WIDTH / 2), _HEIGHT / 4);
    ctx.lineTo((_WIDTH / 4) + (_WIDTH / 2) - 30, _HEIGHT / 4 + 30);
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.font = '60px Arial';
    ctx.fillText('Game stopped!', _WIDTH / 2 - 200, _HEIGHT / 2 + 10);
    ctx.fillStyle = 'lightgreen';
    ctx.font = '40px Arial';
    ctx.fillText('Restart', _WIDTH / 2 - 70, _HEIGHT/2 + 100);
}

function loop() {
    gameRunning = true;
    game.update();
    game.loop(ctx);
}

refresh = setInterval(loop, 1000/60);