/* jshint browser: true, devel: true, unused: true, globalstrict: true, esversion: 6*/
'use strict';

let loadEverything = function () {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './css/style.css');
    link.setAttribute('type', "text/css");
    document.head.appendChild(link);

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();

    loadCalendar(year, month, day);
    loadRooms(year, month, day);
    loadMonthArrows(year, month, day);
    setDate(year, month, day);
}

function release(room, year, mon, day, element) {
    let calendarElem = document.getElementById('calendar');
    fetch(`?data=free&room=${room}&month=${mon}&year=${year}&day=${day}`)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Błąd: " + response.status);
            }
        })
        .then(
            text => {
                if (text == 'OK') {
                    element.innerHTML = 'Zarezerwuj';
                    element.parentElement.className = 'free';
                    element.onclick = function () {
                        book(room, year, mon, day, element)
                    };
                } else {
                    element.innerHTML = 'Zarezerwuj';
                    element.parentElement.className = 'free';
                    throw new Error("Nie udało się zwolnić pokoju: " + text);
                }
            }
        )
        .catch(error => alert(error));
}


function book(room, year, month, day, element) {
    let calendarElem = document.getElementById('calendar');
    fetch(`?data=book&room=${room}&month=${month}&year=${year}&day=${day}`)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Błąd: " + response.status);
            }
        })
        .then(
            text => {
                if (text == 'OK') {
                    element.innerHTML = 'Zwolnij';
                    element.parentElement.className = 'booked';
                    element.onclick = function () {
                        release(room, year, month, day, element)
                    };
                } else {
                    element.innerHTML = 'Zwolnij';
                    element.parentElement.className = 'booked';
                    throw new Error("Nie udało się zarezerwować pokoju: " + text);
                }
            }
        )
        .catch(error => alert(error));
}

function loadMonthArrows(year, month, day) {
    var calendar = document.getElementById('calendar');
    var leftArrow = document.createElement("BUTTON");
    leftArrow.textContent = "previous";
    leftArrow.onclick = function () {
        if (month < 1) {
            month = 11;
            setDate(year, month, day)
            monthCounter.textContent = 12;

        } else {
            setDate(year, --month, day);
            monthCounter.textContent = month + 1;
        }

    }

    var monthCounter = document.createElement("P");
    monthCounter.textContent = month + 1;
    monthCounter.style.marginLeft = "195px";

    var rightArrow = document.createElement("BUTTON");
    rightArrow.textContent = "next";
    rightArrow.style.marginLeft = "195px";
    rightArrow.onclick = function () {
        if (month >= 11) {
            month = 0;
            setDate(year, month, day)
            monthCounter.textContent = 1;

        } else {
            setDate(year, ++month, day);
            monthCounter.textContent = month + 1;
        }

    }
    calendar.before(leftArrow);
    calendar.before(rightArrow);
    calendar.before(monthCounter);

}

function loadCalendar(year, month, day) {
    let calendarElem = document.getElementById('calendar');
    fetch(`?data=calendar&month=${month}&year=${year}&day=${day}`)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Błąd: " + response.status);
            }
        })
        .then(
            text => {
                calendarElem.innerHTML = text
            }
        )
        .catch(error => alert(error));
}

function loadRooms(year, month, day) {
    let roomsElem = document.getElementById('rooms');
    fetch(`?data=rooms&month=${month}&year=${year}&day=${day}`)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Błąd: " + response.status);
            }
        })
        .then(
            text => {
                roomsElem.innerHTML = text
            }
        )
        .catch(error => alert(error));
}

function setDate(year, month, day) {
    let date = new Date(year, month, day);
    let tim = document.getElementById('dat');
    tim.innerHTML = date.toLocaleDateString();
    tim.datetime = date.toISOString();
    loadCalendar(year, month, day);
    loadRooms(year, month, day);
}
