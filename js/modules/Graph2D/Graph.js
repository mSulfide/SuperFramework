function Graph({id, width = 300, height = 300, WIN, callbacks}){
    let canvas;
    if(id){
        canvas = document.getElementById(id);
    } else{
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    const {wheel, mousemove, mouseleave, mouseup, mousedown} = callbacks;
    canvas.addEventListener('wheel', wheel);
    canvas.addEventListener('mousemove', mousemove);
    canvas.addEventListener('mouseleave', mouseleave);
    canvas.addEventListener('mouseup', mouseup);
    canvas.addEventListener('mousedown', mousedown);
    const PI2 = 2 * Math.PI;

    const xs = x => (x - WIN.left) / WIN.width * canvas.width;

    const ys = y => (-y + (WIN.bottom + WIN.height)) / WIN.height * canvas.height;

    this.sx = x => x * WIN.width / canvas.width;
    
    this.sy = y => -y * WIN.height / canvas.height

    this.clear = () => {
        context.fillStyle = '#efe';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.line = (x1, y1, x2, y2, color = '#f00', width = 1) => {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = width;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
        context.closePath();
    }

    this.point = (x, y, color = '#f00', size = 2) => {
        context.beginPath();
        context.strokeStyle = color;
        context.arc(xs(x), ys(y), size, 0, PI2);
        context.stroke();
        context.closePath();
    }

    this.text = (x, y, text, color = "#000") => {
        context.font = "24pt arial";
        context.fillStyle = color;
        context.fillText(text, xs(x), ys(y));
    }
}