Surfaces.prototype.sphere = (radius = 1) => {
    const vertices = [];
    const edges = [];
    const polygons = [];
    const verticalEdgeCount = 20;
    const horizontalEdgeCount = 9;

    vertices.push(new Point(0, radius, 0));
    for (let i = 0; i < verticalEdgeCount; i++) {
        const alpha = 2 * Math.PI * i / verticalEdgeCount;
        for (let j = 1; j < horizontalEdgeCount; j++) {
            const beta = Math.PI * j / horizontalEdgeCount;
            vertices.push(new Point(
                radius * Math.sin(beta) * Math.cos(alpha),
                radius * Math.cos(beta),
                radius * Math.sin(alpha) * Math.sin(beta)
            ));
        }
    }
    vertices.push(new Point(0, -radius, 0));

    for (let i = 0; i < verticalEdgeCount; i++) {
        edges.push(new Edge(0, i * (horizontalEdgeCount - 1) + 1));
        for (let j = 1; j < horizontalEdgeCount - 1; j++) {
            edges.push(new Edge(j + i * (horizontalEdgeCount - 1), j + i * (horizontalEdgeCount - 1) + 1));
        }
        edges.push(new Edge((i + 1) * (horizontalEdgeCount - 1), (horizontalEdgeCount - 1) * verticalEdgeCount + 1));
    }
    for (let j = 1; j < horizontalEdgeCount; j++) {
        for (let i = 0; i < verticalEdgeCount; i++) {
            edges.push(new Edge(i * (horizontalEdgeCount - 1) + j, (i + 1) % verticalEdgeCount * (horizontalEdgeCount - 1) + j));
        }
    }

    for (let i = 0; i < verticalEdgeCount; i++) {
        polygons.push(new Polygon([
            0, 
            i * (horizontalEdgeCount - 1) + 1, 
            (i + 1) % verticalEdgeCount * (horizontalEdgeCount - 1) + 1
        ]));
        for (let j = 1; j < horizontalEdgeCount - 1; j++) {
            polygons.push(new Polygon([
                j + i * (horizontalEdgeCount - 1), 
                j + i * (horizontalEdgeCount - 1) + 1, 
                (i + 1) % verticalEdgeCount * (horizontalEdgeCount - 1) + j + 1, 
                (i + 1) % verticalEdgeCount * (horizontalEdgeCount - 1) + j
            ]));
        }
        polygons.push(new Polygon([
            (horizontalEdgeCount - 1) * ((i + 1) % verticalEdgeCount + 1),
            (horizontalEdgeCount - 1) * (i + 1),
            (horizontalEdgeCount - 1) * verticalEdgeCount + 1
        ]));
    }

    return new Surface(vertices, edges, polygons);
}