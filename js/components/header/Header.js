class Header extends Component {
    addEventListeners() {
        document.getElementById('show2D').addEventListener('click', () => this.callbacks.showPage('graph2D'));
        document.getElementById('showCalc').addEventListener('click', () => this.callbacks.showPage('calc'));
    }
}