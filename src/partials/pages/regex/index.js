import template from './regex.hbs';
import './regex.scss';
import VerEx from 'verbal-expressions';

export default class RegexPage {
    constructor(root) {
        console.log('Hello from Regular Expression Page');
        this.root = root;
        this.data = [];
        this.template = template;
        this.loadData();
    }

    //TODO1: RegEx im Input Feld zusammen bauen

    setAttributes(el, attrs) {
        for(var key in attrs) {
          el.setAttribute(key, attrs[key]);
        }
    }

    buildRegEx() {
        const input = document.getElementById('input');
        const select = document.getElementById('limit');
        const buttons = document.querySelectorAll('.button--regex');
        const btnArr = Array.from(buttons);
        const btn = document.getElementById('limit-btn');

        btn.addEventListener('click', () => {
            let limit = select.options[select.selectedIndex];
            console.log(limit.text)
            input.setAttribute('value', limit.text);
        })


        btnArr.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                input.setAttribute('value', btn.value);
            })
        }) 
    }

    createRegEx() {
        const create = document.getElementById('create');
        const input = document.getElementById('input');
        const result = document.getElementById('result');

        create.addEventListener('click', (e) => {
            e.preventDefault();
            result.innerHTML = input.value;
            Storage.setItem(input.value, input.value);
        })
    }

    async loadData() {
        const response = [];
        this.data = response;
        this.render();
    }

    render() {
        this.root.innerHTML = this.template({ questions: this.data });
        this.buildRegEx();
        this.createRegEx();
        this.setAttributes();
    }
}