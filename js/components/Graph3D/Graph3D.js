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
        this.scene = this.torus(2, 5);
        this.renderScene();
    }

    torus(radius = 1, offset = 2) {
        const calc = new Calculator3D;

        const vertices = [];
        const edges = [];
        const verticalEdgeCount = 80;
        const horizontalEdgeCount = 30;

        for (let i = 0; i < verticalEdgeCount; i++) {
            const circleRotate = 2 * Math.PI * i / verticalEdgeCount;

            for (let j = 0; j < horizontalEdgeCount; j++) {
                const centerRotate = 2 * Math.PI * j / horizontalEdgeCount + Math.PI / 2;

                vertices.push(
                    calc.rotateY(
                        calc.add(
                            calc.prod(
                                new Point(
                                    -Math.cos(centerRotate),
                                    Math.sin(centerRotate),
                                    0
                                ),
                                radius
                            ),
                            new Point(offset, 0, 0)
                        ),
                        circleRotate
                    )
                );
            }
        }

        //vertical edges
        for (let i = 0; i < verticalEdgeCount; i++) {
            for (let j = 1; j < horizontalEdgeCount; j++) {
                edges.push(new Edge(horizontalEdgeCount * i + j - 1, horizontalEdgeCount * i + j));
            }
            edges.push(new Edge(horizontalEdgeCount * i, horizontalEdgeCount * (i + 1) - 1));
        }

        //horizontal edges
        for (let j = 0; j < horizontalEdgeCount; j++) {
            for (let i = 1; i < verticalEdgeCount; i++) {
                edges.push(new Edge(horizontalEdgeCount * (i - 1) + j, horizontalEdgeCount * i + j));
            }
            edges.push(new Edge(j, horizontalEdgeCount * (verticalEdgeCount - 1) + j));
        }

        return new Surface(vertices, edges);
    }

    sphere(radius = 1) {
        const calc = new Calculator3D;

        const vertices = [];
        const edges = [];

        vertices.push(new Point(0, radius, 0));
        for (let i = 0; i < 20; i++) {
            const rotate = 2 * Math.PI * i / 20;
            vertices.push(calc.prod(calc.rotateY(new Point(0.30902, 0.95106, 0), rotate), radius));
            vertices.push(calc.prod(calc.rotateY(new Point(0.58779, 0.80902, 0), rotate), radius));
            vertices.push(calc.prod(calc.rotateY(new Point(0.80902, 0.58779, 0), rotate), radius));
            vertices.push(calc.prod(calc.rotateY(new Point(0.95105, 0.30902, 0), rotate), radius));
            vertices.push(calc.prod(calc.rotateY(new Point(1.00000, 0.00000, 0), rotate), radius));
            vertices.push(calc.prod(calc.rotateY(new Point(0.95105, -0.30902, 0), rotate), radius));
            vertices.push(calc.prod(calc.rotateY(new Point(0.80902, -0.58779, 0), rotate), radius));
            vertices.push(calc.prod(calc.rotateY(new Point(0.58779, -0.80902, 0), rotate), radius));
            vertices.push(calc.prod(calc.rotateY(new Point(0.30902, -0.95106, 0), rotate), radius));
        }
        vertices.push(new Point(0, -radius, 0));

        for (let i = 0; i < 19; i++) {
            for (let j = 1; j <= 9; j++) {
                edges.push(new Edge(9 * i + j, 9 * (i + 1) + j));
            }
        }
        for (let i = 0; i < 19; i++) {
            for (let j = 1; j < 9; j++) {
                edges.push(new Edge(9 * i + j, 9 * i + j + 1));
            }
        }

        return new Surface(vertices, edges);
    }

    cube(edge = 1) {
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