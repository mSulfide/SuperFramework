Surfaces.prototype.torus = (radius = 1, offset = 2) => {
    const calc = new Calculator3D;

    const vertices = [];
    const edges = [];
    const verticalEdgeCount = 20;
    const horizontalEdgeCount = 15;

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