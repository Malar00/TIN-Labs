/* jshint browser: true, devel: true, unused: true, globalstrict: true, esversion: 6*/
'use strict';

function postBook() {
    if (document.cookie === "login=true") {
        let form = document.querySelector('section form');
        let genre = document.querySelector('h2');
        let inputs = form.querySelectorAll('input');

        let titleInput = inputs[0];
        let authorInput = inputs[1];
        let title = titleInput.value;
        let author = authorInput.value;
        //alert('New title: \t' + title + '\nNew author: \t' + author);

        const request = new Request('genre/' + genre.textContent, {
            method: 'POST',
            body: JSON.stringify({title, author}),
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            })
        });
        let p = document.createElement('p');
        fetch(request)
            .then(response => {
                if (response.ok) {
                    p.textContent = "Pomyślnie dodano nową książkę";
                    document.body.append(p);
                    getShowGenre(genre.textContent).call();
                    setTimeout(function () {
                        p.remove();
                    }, 5000);
                    return response.json();
                } else {
                    throw new Error("Błąd fetch one genre: " + response.status);
                }
            })
        titleInput.value = '';
        authorInput.value = '';
    } else {
        alert("You are not logged in");
    }
    return false;
}

function deleteLoginForm() {
    let form = document.querySelector('header form');
    let header = document.querySelector('header');
    form.remove();

    let logoutButton = document.createElement('input');
    logoutButton.type = 'button';
    logoutButton.value = 'Log Out';

    logoutButton.addEventListener("click", function () {
        let button = document.querySelector('header input');
        button.remove();
        document.cookie = "login=false";
        setupLoginForm();
    });
    header.append(logoutButton);
}

function setupLoginForm() {
    let loginForm = document.createElement('form');
    //login
    let loginSpan = document.createElement('span');
    loginSpan.textContent = 'Login: ';
    let loginP = document.createElement('p');
    let login = document.createElement('input');
    login.type = 'text';
    login.name = 'login';
    //password
    let password = document.createElement('input');
    password.type = 'password';
    password.name = 'password';
    let passwordSpan = document.createElement('span');
    passwordSpan.textContent = 'Password: ';
    let passwordP = document.createElement('p');
    //submit
    let buttonP = document.createElement('p');
    let loginButton = document.createElement('input');
    loginButton.type = 'submit'
    loginButton.value = 'Log In';

    loginP.append(loginSpan);
    loginP.append(login);
    passwordP.append(passwordSpan);
    passwordP.append(password);
    buttonP.append(loginButton);

    loginForm.append(loginP);
    loginForm.append(passwordP);
    loginForm.append(buttonP);

    document.querySelector('header').append(loginForm);

    loginForm.onsubmit = loginFunc();
}

function loginFunc() {
    return function () {
        let form = document.querySelector('header form');
        let inputs = form.querySelectorAll('input');

        let loginInput = inputs[0];
        let passwordInput = inputs[1];
        let login = loginInput.value;
        let password = passwordInput.value;

        if (login === 'admin' && password === 'nimda') {
            deleteLoginForm();
            document.cookie = "login=true";
        } else {
            alert('bad login or password');
        }
    }
}

function setup() {
    let form = document.querySelector('section form');

    if (document.cookie === 'login=true') {
        setupLoginForm();
        deleteLoginForm();
    } else {
        setupLoginForm();
    }

    form.onsubmit = postBook;
    fetch('genres')
        .then(
            response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Błąd fetch genres: " + response.status);
                }
            }
        )
        .then(
            genres => {
                let ul = document.querySelector('nav ul');
                for (let g of genres) {
                    let li = document.createElement('li');
                    li.textContent = g;
                    li.className = 'clickable';
                    li.onclick = getShowGenre(g);
                    ul.append(li);
                }

            }
        )
        .catch(error => alert(error));
}

function goRoot() {
    let h1 = document.querySelector('h1');
    h1.className = '';
    h1.onclick = null;
    let nav = document.querySelector('nav');
    nav.className = '';
    let section = nav.nextElementSibling;
    section.style.display = 'none';
}

function getShowGenre(genre) {
    return function () {
        fetch('genre/' + genre)
            .then(
                response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Błąd fetch one genre: " + response.status);
                    }
                }
            )
            .then(
                books => {
                    let h1 = document.querySelector('h1');
                    h1.className = 'clickable';
                    h1.onclick = goRoot;
                    let nav = document.querySelector('nav');
                    nav.className = 'small';
                    let section = nav.nextElementSibling;
                    section.style.display = 'block';
                    let h2 = section.firstElementChild;
                    h2.textContent = genre;
                    let ul = h2.nextElementSibling;
                    while (ul.lastChild) ul.lastChild.remove();

                    let table = document.createElement('table');
                    table.setAttribute('border', '1px');
                    table.removeAttribute('style');
                    let thead = document.createElement('thead');
                    let author = document.createElement('th');
                    let tytul = document.createElement('th');
                    author.textContent = "autor";
                    tytul.textContent = "tytul";
                    table.prepend(thead);
                    thead.append(tytul);
                    thead.append(author);
                    let tbody = document.createElement('tbody');

                    for (let b of books) {
                        let tr = document.createElement('tr');
                        let td1 = document.createElement('td');
                        let td2 = document.createElement('td');

                        let author = document.createElement('span');
                        author.className = 'author';
                        author.textContent = b[1];
                        let title = document.createElement('span');
                        title.className = 'title';
                        title.textContent = b[0];

                        td1.append(author);
                        td2.append(title);
                        tr.append(td1);
                        tr.append(td2);
                        tbody.append(tr);

                    }
                    table.append(tbody);
                    ul.append(table);
                }
            )
            .catch(error => alert(error));
    };
}


document.addEventListener('DOMContentLoaded', setup);

