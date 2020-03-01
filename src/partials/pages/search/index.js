import template from './search.hbs';
import './search.scss';

export default class SearchPage {
    constructor(root) {
        console.log('Hello from Search');
        this.root = root;
        this.data = [];
        this.template = template;
        this.loadData();
    }

    searchStorage() {
        let store = JSON.parse(localStorage.getItem('items'));
        const input = document.getElementById('textsearch');
        const form = document.getElementById('search');
        const result = document.getElementById('search-result');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let regexResult = [];

            store.forEach((item) => {
                const regex = RegExp(item.value);
                if(regex.test(input.value)) {
                    regexResult.push(regex);
                }
            })

            if(regexResult.length === 0) {
                regexResult.push('No match found');
            }
            result.innerHTML = regexResult.join(', ');
        })
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