class UI extends Component {
    constructor({id, parent, addFunction, delFunction }) {
        super({id, parent, template: () => ''});
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.num = 0;
    }

    addClickHandler() {
        const input = document.createElement('input');
        input.setAttribute('placeholder', 'Функция №' + this.num);
        input.dataset.num = this.num;
        input.addEventListener('keyup', () => this.keyupHandler(input));

        const button = document.createElement('button');
        button.innerHTML = 'Удалить';
        button.addEventListener('click', () => {
            this.delFunction(input.dataset.num - 0);
            funcInputs.removeChild(input);
            funcInputs.removeChild(button);
        });

        const funcInputs = document.getElementById('funcInputs');
        funcInputs.appendChild(input);
        funcInputs.appendChild(button);
        this.num++;
    }

    keyupHandler(input) {
        try{
            let f;
            eval(`f = x => ${input.value};`);
            this.addFunction(f, input.dataset.num - 0);
        } catch(e) {
            console.log(e);
        }
    }

    addEventListeners(){
        document.getElementById('addFunction').addEventListener('click', () => {
            (ui => {
                ui.addClickHandler();
            })(this);
        });
    }
}