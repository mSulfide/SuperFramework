class Calculator3D {
    add(p1, p2) {
        return new Point(p1.x + p2.x, p1.y + p2.y, p1.z + p2.z);
    }

    sub(p1, p2) {
        return new Point(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
    }

    prod(p, scal) {
        return new Point(
            p.x * scal,
            p.y * scal,
            p.z * scal
        );
    }

    scalMult(p1, p2) {
        return (p1.x * p2.x + p1.y * p2.y + p1.z * p2.z) / this.modul(p1) / this.modul(p2);
    }

    vectMult(p1, p2) {
        return new Point(
            p1.y * p2.z - p1.z * p2.y,
            p1.z * p2.x - p1.x * p2.z,
            p1.x * p2.y - p1.y * p2.x,
        );
    }

    normalize(p) {
        const modul = this.modul(p);
        return new Point(p.x / modul, p.y / modul, p.z / modul);
    }

    modul(p) {
        return Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    }

    rotateY(p, angle) {
        const xzModul = this.modul(new Point(p.x, 0, p.z));
        const xzNorm = this.normalize(new Point(p.x, 0, p.z));

        const alpha = this.angle(xzNorm, new Point(1, 0, 0));

        const point = new Point(
            Math.cos(alpha) * Math.cos(angle) - Math.sin(alpha) * Math.sin(angle),
            0,
            Math.sin(alpha) * Math.cos(angle) + Math.sin(angle) * Math.cos(alpha)
        );

        return this.add(this.prod(point, xzModul), new Point(0, p.y, 0));
    }

    angle(p1, p2) {
        return Math.acos(this.scalMult(p1, p2) / this.modul(p1) / this.modul(p2));
    }

    ligth(r = 0, g = 0, b = 0, scalMult = 0) {
        const color = this.prod(new Point(r, g, b), Math.pow(scalMult, 1 / 4));
        const r256 = ('00' + Math.round(255 * color.x).toString(16)).slice(-2);
        const g256 = ('00' + Math.round(255 * color.y).toString(16)).slice(-2);
        const b256 = ('00' + Math.round(255 * color.z).toString(16)).slice(-2);
        return `#${r256}${g256}${b256}`
    }
}