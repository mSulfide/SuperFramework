class Calculator {

    getValue(str) {
        if (str.includes('*x^')) { return this.getPolynomial(str); }
        if (str.includes('\n')) { return this.getMatrix(str) };
        if (str.includes('(')) { return this.getVector(str) };
        if (str.includes('i')) { return this.getComplex(str) };
        return str - 0;
    }

    getPolynomial(str) {
        if (str instanceof Array) {
            return new Polynomial(str)
        }
        if (typeof str == 'string' && str) {
            const members = [];
            const arrStr = str.replace(/\s+/g, '').replace(/-/g, ' -').split(/[+ ]/g);
            for (let i = 0; i < arrStr.length; i++) {
                members.push(this.getMember(arrStr[i]));
            }
            return new Polynomial(members);
        }
    }

    getMember(str) {
        if (typeof str === 'number') {
            return new Member(str);
        }
        if (typeof str === 'string' && str) {
            const arrStr = str.split('*x^');
            return new Member(this.getValue(arrStr[0]), arrStr[1] - 0);
        }
    }

    getMatrix(str) {
        if (str instanceof Array) return new Matrix(str);
        if (str && typeof str === 'string') {
            const arr = str.split('\n');
            const values = [];
            for (let i = 0; i < arr.length; i++) {
                values.push(arr[i].split(' ').map(el => this.getValue(el)));
            }
            if (values[0] instanceof Array) {
                return new Matrix(values);
            }
        }
        return null;
    }

    getVector(str) {
        if (str instanceof Array) return new Vector(str);
        if (str && typeof str === 'string') {
            const arr = str.replace(' ', '').replace('(', '').replace(')', '').split(';').map(el => this.getValue(el));
            return new Vector(arr);
        }
        return null;
    }

    getComplex(str) {
        if (typeof str === 'number') return new Complex(str);
        if (str && typeof str === 'string') {
            const arrStr = str.split('i*');
            if (arrStr.length === 2) {
                //2+i*5
                if (arrStr[0].includes('+')) {
                    arrStr[0] = arrStr[0].replace('+', '');
                    return new Complex(arrStr[0] - 0, arrStr[1] - 0);
                }
                //2-i*5
                if (arrStr[0].includes('-')) {
                    arrStr[0] = arrStr[0].replace('-', '');
                    return new Complex(arrStr[0] - 0, - arrStr[1] - 0);
                }
            }
            if (arrStr.length === 1) {
                if (isNaN(arrStr[0] - 0)) return null;
                return new Complex(arrStr[0] - 0);
            }
        }
        return null;
    }

    complex(re, im) { return new Complex(re, im); }
    vector(values) { return new Vector(values); }
    matrix(values) { return new Matrix(values); }

    get(elem) {
        if (elem instanceof Matrix) {
            return new MatrixCalculator(this.get(elem.values[0][0]));
        }
        if (elem instanceof Vector) {
            return new VectorCalculator(this.get(elem.values[0]));
        }
        if (elem instanceof Complex) {
            return new ComplexCalculator();
        }
        return new RealCalculator();
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    div(a, b) {
        return this.get(a).div(a, b);
    }

    pow(a, n) {
        if (typeof n === 'number') {
            return this.get(a).pow(a, n);
        }
        return null;
    }

    prod(a, p) {
        if (typeof p === 'number') {
            return this.get(a).prod(a, p);
        }
        return null;
    }

    one(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex': return this.get(this.complex()).one();
            case 'Vector': return this.get(elem).one(elem.values.length);
            case 'Matrix': return this.get(elem).one(elem.values.length);
            default: return this.get().one();
        }
    }

    zero(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex': return this.get(this.complex()).zero();
            case 'Vector': return this.get(elem).zero(elem.values.length);
            case 'Matrix': return this.get(elem).zero(elem.values.length);
            default: return this.get().zero();
        }
    }
}