/*jshint globalstrict: true, devel: true, browser:true, esversion: 6*/
'use strict';
function setup() {
    let categories = document.querySelectorAll('ul');
    let articles = document.querySelectorAll('li');
    let input = document.createElement('input');
    let reset = document.createElement('button');
    input.type = 'text';
    input.placeholder = "Search...";
    reset.textContent = 'reset';


    document.body.prepend(reset);
    document.body.prepend(input);

    reset.onclick = function () {
        input.value = '';
        for (var li of document.querySelectorAll('li')) {
            li.hidden = false;
        }
        check_category();
    }


    function check_category() {
        for (var category of categories) {
            for (var article_check of category.querySelectorAll('li')) {
                if (article_check.hidden === true) {
                    //lmao its working
                } else {
                    document.getElementById('H4' + category.getAttribute('id')).hidden = false;
                    break;
                }
                document.getElementById('H4' + category.getAttribute('id')).hidden = true;
            }
        }
    }

    //search
    input.onkeydown = function () {
        let inputValue = input.value;
        for (var category of categories) {
            for (var article of category.querySelectorAll('li')) {
                let authors = article.getElementsByClassName('autorzy').item(0).innerHTML;
                let text = article.getElementsByTagName('a').item(0).innerHTML;

                if (text.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 || authors.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
                    article.hidden = false;

                } else {
                    article.hidden = true;
                }
            }
        }

        check_category();

    };

    //show abstract
    for (let i = 0; i < articles.length; i++) {
        let button = document.createElement('button');
        button.textContent = 'Show Abstract';
        button.style.backgroundColor = 'lightGrey';
        button.style.borderRadius = '14px';
        button.style.padding = '5px';
        articles[i].append(button);

        let div = document.createElement('div');
        let a = articles[i].querySelector('a');
        div.innerText = a.title;
        div.style.display = 'none';
        div.style.border = '1px solid black';
        div.style.padding = '20px';
        div.style.margin = '10px';
        articles[i].append(div);

        button.onclick = function () {
            if (button.textContent === 'Show Abstract') {
                div.style.display = 'block';
                button.textContent = 'Hide Abstract';
            } else {
                div.style.display = 'none';
                button.textContent = 'Show Abstract';
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', setup);