class App extends Component {
    constructor(props) {
        super(props);
        this.header = new Header({
            id: 'header',
            parent: this.id,
            template: template.headerTemplate,
            callbacks: {
                showPage: name => this.showPage(name)
            }
        });
        this.calc = new Calc({
            id: 'calc',
            parent: this.id,
            template: template.calcTemplate
        });
        this.graph2D = new Graph2D({
            id: 'graph2D',
            parent: this.id,
            template: template.graph2DTemplate
        });
        this.graph3D = new Graph3D({
            id: 'graph3D',
            parent: this.id,
            template: template.graph3DTemplate
        });
        this.esse = new Esse({
            id: 'esse',
            parent: this.id,
            template: template.esseTemplate
        });

        this.showPage('graph2D');
    }

    showPage(name) {
        this.calc.hide();
        this.graph2D.hide();
        this.graph3D.hide();
        this.esse.hide();
        if (this[name]?.show) {
            this[name].show();
        }
    }
}
//эссе, рпг, затащить весь код, чтобы работало