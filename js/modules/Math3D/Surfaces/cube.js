Surfaces.prototype.cube = (edge = 5) => {
    return new Surface([
        new Point(edge, edge, edge),
        new Point(edge, -edge, edge),
        new Point(-edge, -edge, edge),
        new Point(-edge, edge, edge),
        new Point(edge, edge, -edge),
        new Point(edge, -edge, -edge),
        new Point(-edge, -edge, -edge),
        new Point(-edge, edge, -edge),
    ], [
        new Edge(0, 1),
        new Edge(1, 2),
        new Edge(2, 3),
        new Edge(3, 0),
        new Edge(0, 4),
        new Edge(1, 5),
        new Edge(2, 6),
        new Edge(3, 7),
        new Edge(4, 5),
        new Edge(5, 6),
        new Edge(6, 7),
        new Edge(7, 4),
    ], [
        new Polygon([0, 1, 2, 3], '#55ff55'),
        new Polygon([0, 4, 5, 1], '#ff5555'),
        new Polygon([0, 3, 7, 4], '#5555ff'),
        new Polygon([6, 5, 4, 7], '#55ffff'),
        new Polygon([6, 7, 3, 2], '#ffff55'),
        new Polygon([6, 2, 1, 5], '#ff55ff')
    ]);
}