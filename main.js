const sin   = Math.sin,
      cos   = Math.cos,
      abs   = Math.abs,
      sqrt  = Math.sqrt,
      min   = Math.min,
      max   = Math.max,
      PI    = Math.PI,
      TAU   = PI * 2,
      PHI   = (1+sqrt(5))/2,
      RT2   = sqrt(2);

const cnv  = document.getElementById('cnv'),
      c    = cnv.getContext('2d');

let   w    = cnv.width  = Math.floor(min(innerWidth, innerHeight)/2),
      h    = cnv.height = w;
c.fillStyle = '#fff';

window.addEventListener('resize', () => {
    w = cnv.width  = Math.floor(min(innerWidth, innerHeight)/2);
    h = cnv.height = w;
    c.fillStyle = '#fff';
});

class Particle {
    constructor(x = 0, y = 0) {
        this.pos = new Vector(x, y);
        this.vel = new Vector();
        this.acc = new Vector();
        this.isAlive = true;
        this.size = Math.random() * 3 + 1;
    }

    clone() {
        const clone = new Particle(this.pos.x, this.pos.y);
        clone.vel.x = this.vel.x;
        clone.vel.y = this.vel.y;
        clone.pos.add(Vector.rand(2, this.size + clone.size));
        append.push(clone);
    }

    repel() {
        // other particles
        for (const part of particles) {
            if (part === this) {
                continue;
            }

            let diff = Vector.sub(this.pos, part.pos);
            diff.mag = 10 * this.size**2 / diff.magSq;
            this.acc.add(diff);
        }

        // walls
        const maxForce = 100;

        if (this.pos.x < this.size) {
            this.pos.x = this.size;
            this.vel.x = 0;
        }
        let left = new Vector();
        left.x = maxForce / max(1, this.pos.x**2);
        this.acc.add(left);

        if (w - this.pos.x < this.size) {
            this.pos.x = w - this.size;
            this.vel.x = 0;
        }
        let right = new Vector();
        right.x = -maxForce / max(1, (w - this.pos.x)**2);
        this.acc.add(right);

        if (this.pos.y < this.size) {
            this.pos.y = this.size;
            this.vel.y = 0;
        }
        let top = new Vector();
        top.y = maxForce / max(1, this.pos.y**2);
        this.acc.add(top);

        if (h - this.pos.y < this.size) {
            this.pos.y = h - this.size;
            this.vel.y = 0;
        }
        let bottom = new Vector();
        bottom.y = -maxForce / max(1, (h - this.pos.y)**2);
        this.acc.add(bottom);
    }

    move() {
        this.acc.div(this.size**2);
        this.vel.add(this.acc);
        this.vel.mult(0.99);
        this.vel.clamp(0, this.size*2);
        this.pos.add(this.vel);
        this.acc.mult(0);

    }

    rand() {
        const x = particles.length;
        if (Math.random() < 10/x/x) {
            this.clone();
        }
    }

    draw() {
        c.beginPath();
        c.arc(this.pos.x, this.pos.y, this.size, 0, TAU);
        c.fill();
    }
}

let particles = [new Particle(w/2, h/2)];
let append = [];

//window.addEventListener('click', () => {
//    particles.forEach(p => p.clone());
//});

function draw(frame = 0) {
    c.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; ++i) {
        particles[i].draw();
        particles[i].repel();
    }

    for (let i = 0; i < particles.length; ++i) {
        particles[i].move();
        particles[i].rand();
    }

    particles.push(...append);
    append = [];

    requestAnimationFrame( () => draw(frame + 1) );
}

draw();
