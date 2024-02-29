Surfaces.prototype.sphere = (radius = 1) => {
    const calc = new Calculator3D;

    const vertices = [];
    const edges = [];
    const verticalEdgeCount = 20;
    const horizontalEdgeCount = 9;

    vertices.push(new Point(0, radius, 0));
    for (let i = 0; i < verticalEdgeCount; i++) {
        const rotateY = 2 * Math.PI * i / verticalEdgeCount;
        for (let j = 1; j <= horizontalEdgeCount; j++) {
            const rotateX = Math.PI * j / horizontalEdgeCount;
            vertices.push(calc.prod(calc.rotateY(new Point(Math.sin(rotateX), Math.cos(rotateX), 0), rotateY), radius));
        }
    }
    vertices.push(new Point(0, -radius, 0));

    for (let j = 1; j <= horizontalEdgeCount; j++) {
        for (let i = 0; i < verticalEdgeCount - 1; i++) {
            edges.push(new Edge(horizontalEdgeCount * i + j, horizontalEdgeCount * (i + 1) + j));
        }
        edges.push(new Edge(j, (verticalEdgeCount - 1) * horizontalEdgeCount + j));
    }
    for (let i = 0; i < verticalEdgeCount; i++) {
        edges.push(new Edge(horizontalEdgeCount * i + 1, 0));
        for (let j = 1; j < horizontalEdgeCount; j++) {
            edges.push(new Edge(horizontalEdgeCount * i + j, horizontalEdgeCount * i + j + 1));
        }
        edges.push(new Edge(horizontalEdgeCount * i + horizontalEdgeCount, vertices.length - 1));
    }

    return new Surface(vertices, edges);
}