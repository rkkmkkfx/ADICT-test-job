(function () {
    window.requestAnimationFrame = requestAnimationFrame;
})();

const canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let parts = [],
    minSpawnTime = 100,
    lastTime = new Date().getTime(),
    maxLifeTime = Math.min(5000, (canvas.height/(1.5*60)*500)),
    emitterY = - 1000,
    smokeImage = new Image();

function spawn() {
    if (new Date().getTime() > lastTime + minSpawnTime) {
        lastTime = new Date().getTime();
        parts.push(new Smoke(- 100, emitterY));
    }
}

function render() {
    let len = parts.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    while (len--) {
        if (parts[len].y > 1000 || parts[len].lifeTime > maxLifeTime) {
            parts.splice(len, 1);
        } else {
            parts[len].update();

            ctx.save();
            let offsetX = -parts[len].size/2,
                offsetY = -parts[len].size/2;

            ctx.translate(parts[len].x-offsetX, parts[len].y-offsetY);
            ctx.rotate(parts[len].angle / 180 * Math.PI);
            ctx.globalAlpha  = parts[len].alpha;
            ctx.drawImage(smokeImage, offsetX,offsetY, parts[len].size, parts[len].size);
            ctx.restore();
        }
    }
    spawn();
    requestAnimationFrame(render);
}

function Smoke(x, y) {
    this.x = x;
    this.y = y;

    this.size = 1;
    this.startSize = 32;
    this.endSize = 500;

    this.angle = Math.random() * 359;

    this.startLife = new Date().getTime();
    this.lifeTime = 0;

    this.velY = -1 - (Math.random()*0.5);
    this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
}

Smoke.prototype.update = function () {
    this.lifeTime = new Date().getTime() - this.startLife;
    this.angle += 0.2;

    let lifePerc = ((this.lifeTime / maxLifeTime) * 1000);

    this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .01);

    this.alpha = 1 - (lifePerc * .0017);
    this.alpha = Math.max(this.alpha,0);

    this.x += this.velX;
    this.y += this.velY;
}

smokeImage.src = "/static/img/general/smoke-3.png";
smokeImage.onload = function () {
    render();
}


window.onresize = resizeMe;
window.onload = resizeMe;
function resizeMe() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}
