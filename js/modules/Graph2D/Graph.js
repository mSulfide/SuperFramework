function Graph({
    id,
    width = 300,
    height = 300,
    WIN,
    callbacks = {
        wheel: () => '',
        mousemove: () => '',
        mouseleave: () => '',
        mouseup: () => '',
        mousedown: () => ''
    }
}) {
    let canvas;
    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    const { wheel, mousemove, mouseleave, mouseup, mousedown } = callbacks;
    canvas.addEventListener('wheel', wheel);
    canvas.addEventListener('mousemove', mousemove);
    canvas.addEventListener('mouseleave', mouseleave);
    canvas.addEventListener('mouseup', mouseup);
    canvas.addEventListener('mousedown', mousedown);
    const PI2 = 2 * Math.PI;

    xs = x => (x - this.WIN.left) / this.WIN.width * canvas.width;

    ys = y => (-y + (this.WIN.bottom + this.WIN.height)) / this.WIN.height * canvas.height;

    sx = x => x * this.WIN.width / canvas.width;

    sy = y => -y * this.WIN.height / canvas.height

    clear = () => {
        this.context.fillStyle = '#efe';
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }

    line = (x1, y1, x2, y2, color = '#f00', width = 1) => {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
        this.context.closePath();
    }

    point = (x, y, color = '#f00', size = 2) => {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath();
    }

    triangle(x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0, color = '#f00') {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.lineTo(this.xs(x3), this.ys(y3));
        this.context.fill()
        this.context.closePath();
    }

    text = (x, y, text, color = "#000") => {
        this.context.font = "24pt arial";
        this.context.fillStyle = color;
        this.context.fillText(text, this.xs(x), this.ys(y));
    }
}