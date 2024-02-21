class Graph3D extends Component {
    constructor(options) {
        super(options);
        const WIN = {
            left: -5,
            bottom: -5,
            width: 10,
            height: 10,
            center: new Point(0, 0, -30),
            camera: new Point(0, 0, -50),
            ligthDirection: (new Calculator3D).normalize(new Point(-1, 1, -1))
        }
        this.WIN = WIN;
        this.graph = new Graph({ id: 'graph3DCanvas', width: 600, height: 600, WIN });
        this.math3D = new Math3D({ WIN });
        this.scene = this.test();
        this.renderScene();
    }

    test(radius = 0, iteration = 5) {
        const calc = new Calculator3D;
        const vertices = [];
        vertices.push(new Point(0, radius, 0));
        for (let i = 1; i < iteration - 1; i++) {
            for (let j = 0; j < iteration; j++) {
                vertices.push();//
            }
        }
        vertices.push(new Point(0, -radius, 0));
    }

    cube(edge) {
        return new Surface([
            new Point(edge, edge, edge),
            new Point(edge, -edge, edge),
            new Point(-edge, -edge, edge),
            new Point(-edge, edge, edge),
            new Point(edge, edge, -edge),
            new Point(-edge, edge, -edge),
            new Point(-edge, -edge, -edge),
            new Point(edge, -edge, -edge),
        ], [
            new Edge(0, 1),
            new Edge(1, 2),
            new Edge(2, 3),
            new Edge(3, 0),
            new Edge(0, 4),
            new Edge(1, 7),
            new Edge(2, 6),
            new Edge(3, 5),
            new Edge(4, 5),
            new Edge(5, 6),
            new Edge(6, 7),
            new Edge(7, 4)
        ], [
            new Polygon(0, 2, 1),
            new Polygon(2, 0, 3)
        ]);
    }

    renderScene() {
        this.scene.points.forEach(point => {
            this.graph.point(this.math3D.xs(point), this.math3D.ys(point));
        });

        this.scene.edges.forEach(edge => {
            const point1 = this.scene.points[edge.p1];
            const point2 = this.scene.points[edge.p2];
            this.graph.line(this.math3D.xs(point1), this.math3D.ys(point1), this.math3D.xs(point2), this.math3D.ys(point2));
        });

        const polygons = this.scene.polygons;
        for (let i = 0; i < polygons.length; i++) {
            const polygon = polygons[i];
            const normal = this.scene.normals[i];
            const calc = new Calculator3D;

            if (calc.scalMult(new Point(0, 0, -1), normal) <= 0) continue;

            const point1 = this.scene.points[polygon.p1];
            const point2 = this.scene.points[polygon.p2];
            const point3 = this.scene.points[polygon.p3];

            this.graph.triangle(
                this.math3D.xs(point1), this.math3D.ys(point1),
                this.math3D.xs(point2), this.math3D.ys(point2),
                this.math3D.xs(point3), this.math3D.ys(point3),
                calc.ligth(1, 0, 0, calc.scalMult(this.WIN.ligthDirection, normal))
            );
        }
    }
}