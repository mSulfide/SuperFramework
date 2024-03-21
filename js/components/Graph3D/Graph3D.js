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
        }
        this.WIN = WIN;
        this.canMove = false;
        this.graph = new Graph({
            id: 'graph3DCanvas',
            width: 600,
            height: 600,
            WIN,
            callbacks: {
                wheel: event => this.wheel(event),
                mousemove: event => this.mousemove(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown()
            }
        });
        this.math3D = new Math3D({ WIN });
        this.ligth = new Light(-40, 15, 0, 1500);
        this.scene = (new Surfaces).torus(2, 5);
        this.renderScene();
    }

    mouseup() {
        this.canMove = false;
    }

    mousedown() {
        this.canMove = true;
    }

    wheel(event) {
        event.preventDefault();
        const delta = (event.wheelDelta > 0) ? 1.25 : 0.8;
        this.scene.points.forEach(point => this.math3D.zoom(point, delta));
        this.renderScene();
    }

    mousemove(event) {
        if (this.canMove) {
            const gradus = Math.PI / 180 / 4;
            this.scene.points.forEach(point => {
                this.math3D.rotateOx(point, (this.dy - event.offsetY) * gradus);
                this.math3D.rotateOy(point, (this.dx - event.offsetX) * gradus);
            });
            this.renderScene();
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    renderScene() {
        this.graph.clear();
        this.scene.points.forEach(point => {
            this.graph.point(this.math3D.xs(point), this.math3D.ys(point));
        });

        this.scene.edges.forEach(edge => {
            const point1 = this.scene.points[edge.p1];
            const point2 = this.scene.points[edge.p2];
            this.graph.line(this.math3D.xs(point1), this.math3D.ys(point1), this.math3D.xs(point2), this.math3D.ys(point2));
        });

        this.math3D.calcDistance(this.scene, this.WIN.camera, `distance`);
        this.math3D.calcDistance(this.scene, this.ligth, 'lumen');
        this.math3D.sortByArtistAlgorithm(this.scene);
        this.scene.polygons.forEach(polygon => {
            const points = polygon.points.map(
                index => new Point(this.math3D.xs(this.scene.points[index]), this.math3D.ys(this.scene.points[index]))
            );
            const lumen = this.math3D.calcIllumination(polygon.lumen, this.ligth.lumen);
            let {r, g, b} = polygon.color;
            r = Math.round(r * lumen);
            g = Math.round(g * lumen);
            b = Math.round(b * lumen);
            this.graph.polygon(points, polygon.rgbToHex(r, g, b));
        });
    }
}