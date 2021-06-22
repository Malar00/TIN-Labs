/*jshint node: true, esversion:6 */

// Load the http module to create an http server.
let http = require('http');
let url = require('url');
let fs = require('fs');

let rooms = [101, 102, 103, 104, 105, 201, 202, 203, 204, 205, 301, 302, 303, 304, 305];


// Uwaga: miesiące się numerują od zera!

let reservations;

fs.readFile("lib/reservations.json", 'utf-8',
    function (error, data) {
        if (error) {
            console.log("can't read file");
            process.exit();
        } else {
            reservations = JSON.parse(data);
        }
    }
);


function notFound(response) {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end('<h1>File not found!</h1>');
}

function getReadFile(response, contentType) {
    return function (error, data) {
        if (error) notFound(response);
        else {
            response.writeHead(200, {'Content-Type': contentType});
            response.end(data);
        }
    }
};

function bookRoom(room, year, mon, day) {

    let month = parseInt(mon) + 1;
    let key = year + '-' + month + '-' + day;
    if (reservations[key] && reservations[key][room]) {
        return 'Pokój już jest zajęty';
    } else {
        if (reservations[key]) {
            reservations[key][room] = true;
            console.log('Room ' + room + ' reserved');
        } else {
            reservations[key] = {};
            reservations[key][room] = true;
            console.log('Room ' + room + ' reserved');
        }

        return 'OK';
    }
}

function freeRoom(room, year, mon, day) {
    let month = parseInt(mon) + 1;
    let key = year + '-' + month + '-' + day;
    if (reservations[key] && reservations[key][room]) {
        reservations[key][room] = false;
        console.log('Room ' + room + ' freed');
    } else {
        console.log('Room ' + room + ' ERROR');
    }
    return 'OK';
}


function getRooms(year, mon, day) {
    let month = parseInt(mon) + 1;
    let key = year + '-' + month + '-' + day;
    let table = ['<ul>'];
    for (let i = 0; i < rooms.length; i++) {
        if (reservations[key] && reservations[key][rooms[i]]) {
            //jest zarezerwowany
            table.push('<li class="booked">');
            table.push(rooms[i]);
            table.push(' <span onclick="release(' + rooms[i] + ',' + year + ',' + mon + ',' + day + ',this)">Zwolnij</span></li>');
        } else {
            //jest wolny
            table.push('<li class="free">');
            table.push(rooms[i]);
            table.push(' <span onclick="book(' + rooms[i] + ',' + year + ',' + mon + ',' + day + ',this)">Zarezerwuj</span></li>');
        }
    }
    table.push('</ul>');
    return table.join('\n');
}

function getCalendar(year, mon, day) {

    var check = 0;

    function getDay(date) { // numer dnia tygodnia, od 0(pn) do 6(nd)
        let day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
    }


    let d = new Date(year, mon);

    let table = ['<table><tr><th>pn</th><th>wt</th><th>śr</th><th>czw</th><th>pt</th><th>sb</th><th>nie</th></tr><tr>'];

    // pierwszy wiersz od poniedziałka
    // do pierwszego
    // * * * | 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
        table.push('<td></td>');
    }

    // komórki z datami
    while (d.getMonth() == mon) {
        let dd = d.getDate();

        let month = parseInt(mon) + 1;
        let key = year + '-' + month + '-' + d.getDate();


        //console.log(reservations[key]);

        if (dd == day) {
            table.push('<td class="today"  onclick="setDate(' + year + ',' + mon + ',' + dd + ');loadRooms(' + year + ',' + mon + ',' + dd + ')">' + dd + '</td>');
        } else if (reservations[key]) {
            for (let i = 0; i < rooms.length; i++) {
                if (reservations[key][rooms[i]] === true) {
                    check++;
                }
            }
            //console.log(check)
            //console.log(rooms.length)
            if (check == rooms.length) {
                table.push('<td class="booked-calendar" onclick="setDate(' + year + ',' + mon + ',' + dd + ');loadRooms(' + year + ',' + mon + ',' + dd + ')">' + dd + '</td>');
            } else {
                table.push('<td onclick="setDate(' + year + ',' + mon + ',' + dd + ');loadRooms(' + year + ',' + mon + ',' + dd + ')">' + dd + '</td>');
            }
            check = 0;
            //console.log(reservations[key][rooms[i]]);
        } else {
            table.push('<td onclick="setDate(' + year + ',' + mon + ',' + dd + ');loadRooms(' + year + ',' + mon + ',' + dd + ')">' + dd + '</td>');
        }


        if (getDay(d) % 7 == 6) { // niedziela, koniec wiersza
            table.push('</tr><tr>');
        }

        d.setDate(d.getDate() + 1);
    }

// dodać puste komórki na końcu
    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table.push('<td></td>');
        }
    }

// zamknąć tabelę
    table.push('</tr></table>');

    return table.join('\n');
}


let hotel = function (request, response) {
    // Attach listener on end event.
    // Parse the request for arguments and store them in get variable.
    // This function parses the url from request and returns object representation.
    let get = url.parse(request.url, true).query;
    if (request.url == '/hotel.js') {
        notFound(response);
    } else if (request.url == '/' || request.url == '/hotel.html') {
        fs.readFile('hotel.html', 'utf-8', getReadFile(response, 'text/html'));
    } else if (request.url == '/css/style/css' || request.url == '/css/style.css') {
        fs.readFile('css/style.css', 'utf-8', getReadFile(response, 'text/css'));
    } else if (request.url.substr(-3) == '.js') {
        fs.readFile('.' + request.url, 'utf-8', getReadFile(response, 'application/javascript'));
    } else if (get['data'] == 'calendar') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(getCalendar(get['year'], get['month'], get['day']));
    } else if (get['data'] == 'rooms') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(getRooms(get['year'], get['month'], get['day']));
    } else if (get['data'] == 'book') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(bookRoom(get['room'], get['year'], get['month'], get['day']));
    } else if (get['data'] == 'free') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(freeRoom(get['room'], get['year'], get['month'], get['day']));
    } else {
        notFound(response);
    }
}

// Create the server.
let server = http.createServer(hotel)

// Listen on port 8080, IP defaults to 127.0.0.1
server.listen(8080);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8080/");


process.on('SIGINT', function () {
    console.log('\nSaving Data...');
    fs.writeFileSync("lib/reservations.json", JSON.stringify(reservations), 'utf-8');
    console.log('Data Saved...');

    console.log('\nshutting down');
    process.exit();
});
  
