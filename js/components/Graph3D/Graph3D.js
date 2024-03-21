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
        this.mouse0 = false;
        this.mouse1 = false;
        this.mouse2 = false;
        this.graph = new Graph({
            id: 'graph3DCanvas',
            width: 600,
            height: 600,
            WIN,
            callbacks: {
                wheel: event => this.wheel(event),
                mousemove: event => this.mousemove(event),
                mouseup: () => this.mouseup(event),
                mousedown: () => this.mousedown(event)
            }
        });
        this.math3D = new Math3D({ WIN });
        this.ligth = new Light(-40, 15, 0, 1500);
        this.surfaces = new Surfaces;
        this.scene = [this.surfaces.torus(2, 5)];
        setInterval(() => {
            this.scene.forEach(surface => surface.doAnimation(this.math3D));
            this.renderScene();
        }, 50);
    }

    mouseup(event) {
        switch (event.button) {
            case 0:
                this.mouse0 = false;
                break;
            case 1:
                this.mouse1 = false;
                break;
            case 2:
                this.mouse2 = false;
                break;
        }
    }

    mousedown(event) {
        switch (event.button) {
            case 0:
                this.mouse0 = true;
                break;
            case 1:
                this.mouse1 = true;
                break;
            case 2:
                this.mouse2 = true;
                break;
        }
    }

    wheel(event) {
        event.preventDefault();
        const delta = (event.wheelDelta > 0) ? 1.2 : 0.8;
        const matrix = this.math3D.zoom(delta);
        this.scene.forEach(surface => surface.points.forEach(point => this.math3D.transform(matrix, point)));
    }

    mousemove(event) {
        if (this.mouse0 || this.mouse2) {
            const gradus = Math.PI / 180 / 4;
            const matrix = this.math3D.multMatrix(
                this.math3D.rotateOx((this.dy - event.offsetY) * gradus),
                this.mouse2 ? 
                this.math3D.rotateOz((this.dx - event.offsetX) * gradus) :
                this.math3D.rotateOy((this.dx - event.offsetX) * gradus)
            );
            this.scene.forEach(surface => surface.points.forEach(point => this.math3D.transform(matrix, point)));
        }
        if (this.mouse1) {
            const offset = 0.05;
            const matrix = this.math3D.move(
                (this.dx - event.offsetX) * -offset,
                (this.dy - event.offsetY) * offset,
                0
            );
            this.scene.forEach(surface => surface.points.forEach(point => this.math3D.transform(matrix, point)));
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    SolarSystem() {
        const Earth = this.surfaces.sphere(3);
        Earth.addAnimation('rotateOy', 0.1);
        const Moon = this.surfaces.cube(1);
        Moon.addAnimation('rotateOx', 0.2);
        Moon.addAnimation('rotateOz', 0.05);
        return [Earth, Moon];
    }

    renderScene() {
        this.graph.clear();
        this.scene.forEach(surface => {
            surface.points.forEach(point => {
                this.graph.point(this.math3D.xs(point), this.math3D.ys(point));
            });

            surface.edges.forEach(edge => {
                const point1 = surface.points[edge.p1];
                const point2 = surface.points[edge.p2];
                this.graph.line(this.math3D.xs(point1), this.math3D.ys(point1), this.math3D.xs(point2), this.math3D.ys(point2));
            });

            this.math3D.calcDistance(surface, this.WIN.camera, `distance`);
            this.math3D.calcDistance(surface, this.ligth, 'lumen');
            this.math3D.sortByArtistAlgorithm(surface);
            surface.polygons.forEach(polygon => {
                const points = polygon.points.map(
                    index => new Point(this.math3D.xs(surface.points[index]), this.math3D.ys(surface.points[index]))
                );
                const lumen = this.math3D.calcIllumination(polygon.lumen, this.ligth.lumen);
                let { r, g, b } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.graph.polygon(points, polygon.rgbToHex(r, g, b));
            });
        });

    }
}