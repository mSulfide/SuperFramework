class Calc extends Component {
    operandHandler(event) {
        const nCalc = new Calculator;
        const a = nCalc.getValue(document.getElementById('a').value);
        const b = nCalc.getValue(document.getElementById('b').value);
        const calc = this.getCalculator(a);
        const operand = event.target.dataset.operand;
        const result = calc[operand](a, b);
        document.getElementById('c').value = result.toString();
    }

    getCalculator(value) {
        if (value instanceof Matrix) {
            return new MatrixCalculator;
        }
        if (value instanceof Vector) {
            return new VectorCalculator;
        }
        if (value instanceof Complex) {
            return new ComplexCalculator;
        } 
        if (value instanceof Polynomial) {
            return new PolynomialCalculator;
        } 
        return new RealCalculator;
    }

    addEventListeners() {
        const buttons = document.querySelectorAll('.operand');
        buttons.forEach(button => {
            button.addEventListener('click', event => this.operandHandler(event));
        });
    }
}