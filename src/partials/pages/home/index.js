import template from './home.hbs';
import './home.scss';

export default class HomePage {
    constructor(root) {
        console.log('Hello from Homepage');
        this.root = root;
        this.data = [];
        this.template = template;
        this.loadData();
    }

    async loadData() {
        const response = [];
        this.data = response;
        this.render();
    }

    render() {
        this.root.innerHTML = this.template({ questions: this.data });

    }
}