Surfaces.prototype.torus = (radius = 1, offset = 2) => {
    const calc = new Calculator3D;

    const vertices = [];
    const edges = [];
    const polygons = [];
    const verticalEdgeCount = 20;
    const horizontalEdgeCount = 15;

    for (let i = 0; i < verticalEdgeCount; i++) {
        const alpha = 2 * Math.PI * i / verticalEdgeCount;
        for (let j = 0; j < horizontalEdgeCount; j++) {
            const beta = 2 * Math.PI * j / horizontalEdgeCount;
            vertices.push(new Point(
                radius * Math.sin(beta) * Math.cos(alpha) + offset * Math.cos(alpha),
                radius * Math.cos(beta),
                radius * Math.sin(alpha) * Math.sin(beta) + offset * Math.sin(alpha)
            ));
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

    for (let i = 0; i < verticalEdgeCount; i++) {
        for (let j = 0; j < horizontalEdgeCount; j++) {
            polygons.push(new Polygon([
                j + i * horizontalEdgeCount,
                (j + 1) % horizontalEdgeCount + i * horizontalEdgeCount,
                (j + 1) % horizontalEdgeCount + (i + 1) % verticalEdgeCount * horizontalEdgeCount,
                j + (i + 1) % verticalEdgeCount * horizontalEdgeCount
            ]));
        }
    }

    return new Surface(vertices, edges, polygons);
}