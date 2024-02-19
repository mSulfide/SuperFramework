class Surface {
    constructor(points = [], edges = [], polygons = []) {
        this.points = points;
        this.edges = edges;

        this.polygons = polygons;
        const calc = new Calculator3D;
        this.normals = [];
        polygons.forEach(polygon => {
            const p1 = this.points[polygon.p1];
            const p2 = this.points[polygon.p2];
            const p3 = this.points[polygon.p3];

            const a = calc.sub(p3, p1);
            const b = calc.sub(p2, p1);

            this.normals.push(calc.normalize(calc.vectMult(b, a)));
        });
    }
}