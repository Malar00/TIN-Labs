/*jshint globalstrict: true, devel: true, browser:true, esversion: 6*/
'use strict';

function slider() {

    var suwak = document.getElementsByClassName('suwak').item(0);
    var slajder = document.getElementsByClassName('slajder').item(0);

    var isPressed = false;


    const sliderDownClickHandler = function () {
        isPressed = true;
        //console.log('click')

    };
    const sliderUpClickHandler = function () {
        isPressed = false;
        //console.log('un-click')
    };

    const sliderMoveHandler = function (e) {
        if (isPressed === true && e.target.className !== 'suwak') {
            suwak.style.left = e.offsetX + 'px';
            //console.log(e.offsetX);
        }
    }

    slajder.addEventListener('mousedown', sliderDownClickHandler);
    slajder.addEventListener('mouseup', sliderUpClickHandler);
    slajder.addEventListener('mousemove', sliderMoveHandler);

}

document.addEventListener('DOMContentLoaded', slider);


