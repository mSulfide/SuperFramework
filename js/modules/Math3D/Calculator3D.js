class Calculator3D {
    sub(p1, p2) {
        return new Point(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
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
}