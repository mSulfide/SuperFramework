class Graph {
    constructor({ id, width = 300, height = 300, WIN, callbacks }) {
        if (id) {
            this.canvas = document.getElementById(id);
        } else {
            this.canvas = document.createElement('canvas');
            document.querySelector('body').appendChild(canvas);
        }
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');

        this.WIN = WIN;

        const { wheel, mousemove, mouseleave, mouseup, mousedown } = callbacks | {
            wheel: () => '',
            mousemove: () => '',
            mouseleave: () => '',
            mouseup: () => '',
            mousedown: () => ''
        };
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mousemove', mousemove);
        this.canvas.addEventListener('mouseleave', mouseleave);
        this.canvas.addEventListener('mouseup', mouseup);
        this.canvas.addEventListener('mousedown', mousedown);
    }

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

    text = (x, y, text, color = "#000") => {
        this.context.font = "24pt arial";
        this.context.fillStyle = color;
        this.context.fillText(text, this.xs(x), this.ys(y));
    }
}