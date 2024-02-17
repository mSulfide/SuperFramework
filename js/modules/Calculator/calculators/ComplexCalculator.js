class ComplexCalculator{
    add(a, b){
        return new Complex(a.re + b.re, a.im + b.im);
    }

    sub(a, b){
        return new Complex(a.re - b.re, a.im - b.im);
    }

    mult(a, b){
        return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
    }

    inv(a){
        const q = a.re * a.re + a.im * a.im;
        return new Complex(a.re / q, -a.im / q);
    } 

    div(a, b){
        return this.mult(a, this.inv(b));
    }

    prod(a, p){
        return new Complex(a.re * p, a.im * p);
    }

    pow(a, n){
        let z = this.one();
        for (let i = 0; i < n; i++) z = this.mult(z, a);
        return z;
    }

    one(){
        return new Complex(super.one())
    }

    zero(){
        return new Complex();
    }
}