Surfaces.prototype.cube = (edge = 1) => {
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