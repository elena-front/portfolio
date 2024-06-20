'use strict';

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");
let raf;

const imgRoad = new Image();
imgRoad.src = "/img/pavement.svg";
let roadPattern = null;
imgRoad.onload = () => {
    roadPattern = ctx.createPattern(imgRoad, "repeat");
}

const car1Pic = new Image();
car1Pic.src = "/img/car-1.svg";


const car2Pic = new Image();
car2Pic.src = "/img/car-2.svg";


const car3Pic = new Image();
car3Pic.src = "/img/car-3.svg";

const carSound = new Audio("/audio/car.wav");
function playRoadSound() {
    carSound.play().then(() => {
        playRoadSound();
    })
}
const hornSound = new Audio("/audio/horn.wav");

function Car(x0, y0, vx, vy, pic) {
    this.x = x0;
    this.y = y0;
    this.vx = vx;
    this.vy = vy;
    this.width = 100;
    this.height = 100;
    this.pic = pic;
    this.draw = (ctx) => {
        ctx.save();
        ctx.drawImage(this.pic, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
    this.move = () => {
        this.x += this.vx;
        this.y += this.vy;
    
        if (
            this.y + this.vy > canvas.height - 70 || this.y + this.vy < 10
        ) {
            this.vy = -this.vy;
        }
        if (
            this.x + this.vx > canvas.width - 80 || this.x + this.vx < 10
        ) {
            this.vx = -this.vx;
        }
    }
}

const car1 = new Car(10, 400, 3, 4, car1Pic);
const car2 = new Car(600, 200, 4, 2, car2Pic);
const car3 = new Car(600, 400, 1, 1, car3Pic);

const bounceLimit = 50;

function draw() {
    ctx.clearRect(10, 10, 700, 500);
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.lineJoin = "round";
    ctx.moveTo(10, 10);
    ctx.lineTo(10, 510);
    ctx.lineTo(710, 510);
    ctx.lineTo(710, 10);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = roadPattern;
    ctx.fillRect(10, 10, 700, 500);

    car1.draw(ctx);
    car2.draw(ctx);
    car3.draw(ctx);

    car1.move();
    car2.move();
    car3.move();

    if (handleCrash(car1, car2) || handleCrash(car2, car3) || handleCrash(car1, car3)) {
        raf = undefined;
        return;
    }

    raf = window.requestAnimationFrame(draw);
};

canvas.addEventListener("click", (e) => {
    if (raf) {
        window.cancelAnimationFrame(raf);
        raf = undefined;
    } else {
        raf = window.requestAnimationFrame(draw);
    }
});

function handleCrash(c1, c2) {
    if (Math.abs(c1.x - c2.x) <= bounceLimit && Math.abs(c1.y - c2.y) <= bounceLimit) {
        hornSound.play();
        c1.vx *= -1;
        c1.vy *= -1;
        c2.vx *= -1;
        c2.vy *= -1;
        return true;
    }
    return false;
}

raf = window.requestAnimationFrame(draw);
