Surfaces.prototype.sphere = (radius = 1) => {
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