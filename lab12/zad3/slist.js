/*jshint globalstrict: true, devel: true, browser:true, esversion: 6*/
'use strict';


function list() {

    var list = document.getElementById('egzamin');

    for (var student of list.children) {
        student.onmousedown = function (e) {
            if (e.ctrlKey) {
                this.classList.toggle('selected');
            } else {
                clearStudents();
                this.classList.toggle('selected');
            }
        }
    }


    function clearStudents() {
        for (var student of list.children) {
            student.classList.remove('selected');
        }

    }
}

document.addEventListener('DOMContentLoaded', list);


