import template from './regex.hbs';
import './regex.scss';

export default class RegexPage {
    constructor(root) {
        console.log('Hello from Regular Expression Page');
        this.root = root;
        this.data = [];
        this.template = template;
        this.loadData();
    }

    showInformation() {
        const infobox = document.getElementById('info');
        const infobtn = document.getElementById('info-btn');
        const close = document.getElementById('close');
        const content = document.getElementById('app');
        const footer = document.getElementById('footer');

        infobtn.addEventListener('click', () => {
            infobox.style.display = 'block';
            infobox.style.width = '20%';
        })

        close.addEventListener('click', () => {
            infobox.style.display = 'none';
            infobox.style.width = '0';
        })
    }

    checkValidExpression(displayname) {
        try {
            new RegExp(displayname);
        } catch(e) {
            alert('Please type in a valid Regular Expression!');
            return;
        }
    }

    setInputAttribute(attr) {
        const input = document.getElementById('input');
        let value = input.value;
            if(value.length === 0) {
                value = '';
            }
            input.value = value+attr;
    }

    buildRegEx() {
        const select = document.getElementById('limit');
        const buttons = document.querySelectorAll('.button--regex');
        const btnArr = Array.from(buttons);
        const btn = document.getElementById('limit-btn');

        btn.addEventListener('click', () => {
            let limit = select.options[select.selectedIndex];
            this.setInputAttribute(limit.text)
        })


        btnArr.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.setInputAttribute(btn.value)
            })
        }) 
    }

    createListEl(text) {
        const ul = document.getElementById('result-list');
        const li = document.createElement('li');
        li.className = 'result--elem';
        li.textContent = text;
        ul.appendChild(li);
    }

    iterateStorage() {
        const data = JSON.parse(localStorage.getItem('items'));

        data.forEach((item) => {
            this.createListEl(item.displayname);
        })
    }

    createRegEx() {
        const form = document.getElementById('regex');
        const input = document.getElementById('input');
        const result = document.getElementById('result');
        let itemsArr = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let displayname = '/'+input.value+'/';
            this.checkValidExpression(displayname);

            result.innerHTML = displayname;
            itemsArr.push({'value': input.value, 'displayname': displayname});
            localStorage.setItem('items', JSON.stringify(itemsArr));
            this.createListEl(displayname);
            input.value = '';
        })

        this.iterateStorage();
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
        this.showInformation();
    }
}