class Header extends Component {
    addEventListeners() {
        document.getElementById('show2D').addEventListener('click', () => this.callbacks.showPage('graph2D'));
        document.getElementById('showCalc').addEventListener('click', () => this.callbacks.showPage('calc'));
        document.getElementById('show3D').addEventListener('click', () => this.callbacks.showPage('graph3D'));
        document.getElementById('showEsse').addEventListener('click', () => this.callbacks.showPage('esse'));
        document.getElementById('showSim').addEventListener('click', () => this.callbacks.showPage('sim'));
    }
}