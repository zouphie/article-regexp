import template from './search.hbs';
import './search.scss';
import XRegExp from 'xregexp';

export default class SearchPage {
    constructor(root) {
        console.log('Hello from Search');
        this.root = root;
        this.data = [];
        this.template = template;
        this.loadData();
    }

    searchStorage() {
        let store = JSON.parse(Storage);

        for(obj in store) {
            console.log(store[obj].name);
        }
    }

    async loadData() {
        const response = [];
        this.data = response;
        this.render();
    }

    render() {
        this.root.innerHTML = this.template({ questions: this.data });
        this.searchStorage();
    }
}