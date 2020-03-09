class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get copy() {
        return new Vector(this.x, this.y);
    }

    get xy() {
        return [this.x, this.y];
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }


    add(it) {
        this.x += it.x;
        this.y += it.y;
        return this;
    }

    sub(it) {
        this.x -= it.x;
        this.y -= it.y;
        return this;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    div(n) {
        if (this.x !== 0) {
            this.x /= n;
        }

        if (this.y !== 0) {
            this.y /= n;
        }

        return this;
    }


    static add(v1, v2) {
        return v1.copy.add(v2);
    }

    static sub(v1, v2) {
        return v1.copy.sub(v2);
    }

    static mult(v, n) {
        return v.copy.mult(n);
    }

    static div(v, n) {
        return v.copy.div(n);
    }


    get mag() {
        return Math.hypot(this.x, this.y);
    }

    get magSq() {
        return this.x * this.x + this.y * this.y;
    }

    set mag(mag) {
        const prev = this.mag;
        if (prev !== 0) {
            this.div(prev).mult(mag);
        }
        return this.mag;
    }

    clamp(min, max) {
        if (this.mag < min) {
            this.mag = min;
        } else if (this.mag > max) {
            this.mag = max;
        }

        return this;
    }

    static clamp(v, min, max) {
        return v.copy.clamp(min, max);
    }


    static rand(rmin, rmax, amin = 0, amax = Math.PI * 2) {
        if (rmin === undefined) {
            rmin = 1;
        }

        if (rmax === undefined) {
            rmax = rmin;
        }

        const v = new Vector(rmin + Math.random() * (rmax - rmin), 0);
        v.rad = amin + Math.random() * (amax - amin);
        return v;
    }


    get rad() {
        return Math.atan2(-this.y, -this.x) + Math.PI;
    }

    set rad(angle) {
        const mag = this.mag;
        this.x = Math.cos(angle) * mag;
        this.y = Math.sin(angle) * mag;
        return this.rad;
    }

    get deg() {
        return this.rad / Math.PI * 180;
    }

    set deg(angle) {
        const mag = this.mag;
        this.x = Math.cos(angle / 180 * Math.PI) * mag;
        this.y = Math.sin(angle / 180 * Math.PI) * mag;
        return this.deg;
    }

    static polar(angle, radius) {
        return new Vector(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }

    draw(ctx, x = 0, y = 0) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();
    }
}
