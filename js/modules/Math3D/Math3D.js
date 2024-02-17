class Math3D {
    constructor({WIN}) {
        this.WIN = WIN;
    }

    xs(point) {
        const zs = this.WIN.center.z;
        const z0 = this.WIN.camera.z;
        const x0 = this.WIN.camera.x;
        return (point.x - x0) / (point.z - z0) * (zs - z0) + x0;
    }

    ys(point) { //
        const zs = this.WIN.center.z;
        const z0 = this.WIN.camera.z;
        const y0 = this.WIN.camera.x;
        return (point.y - y0) / (point.z - z0) * (zs - z0) + y0;
    }
}