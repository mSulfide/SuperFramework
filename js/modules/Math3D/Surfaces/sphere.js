Surfaces.prototype.sphere = (radius = 5, color = '#ffff00', center = new Point) => {
    const vertices = [];
    const edges = [];
    const polygons = [];
    const verticalEdgeCount = 20;
    const horizontalEdgeCount = 9;

    vertices.push(new Point(center.x, radius + center.y, center.z));
    for (let i = 0; i < verticalEdgeCount; i++) {
        const alpha = 2 * Math.PI * i / verticalEdgeCount;
        for (let j = 1; j < horizontalEdgeCount; j++) {
            const beta = Math.PI * j / horizontalEdgeCount;
            vertices.push(new Point(
                radius * Math.sin(beta) * Math.cos(alpha) + center.x,
                radius * Math.cos(beta) + center.y,
                radius * Math.sin(alpha) * Math.sin(beta) + center.z
            ));
        }
    }
    vertices.push(new Point(center.x, -radius + center.y, center.z));

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
        ], color));
        for (let j = 1; j < horizontalEdgeCount - 1; j++) {
            polygons.push(new Polygon([
                j + i * (horizontalEdgeCount - 1), 
                j + i * (horizontalEdgeCount - 1) + 1, 
                (i + 1) % verticalEdgeCount * (horizontalEdgeCount - 1) + j + 1, 
                (i + 1) % verticalEdgeCount * (horizontalEdgeCount - 1) + j
            ], color));
        }
        polygons.push(new Polygon([
            (horizontalEdgeCount - 1) * ((i + 1) % verticalEdgeCount + 1),
            (horizontalEdgeCount - 1) * (i + 1),
            (horizontalEdgeCount - 1) * verticalEdgeCount + 1
        ], color));
    }

    return new Surface(vertices, edges, polygons, center);
}