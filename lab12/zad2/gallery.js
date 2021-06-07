/*jshint globalstrict: true, devel: true, browser:true, esversion: 6*/
'use strict';


function gallery() {

    var mainImg = document.getElementById('large_img');
    var thumb = document.querySelectorAll("ul li a img");

    for (var thumbPicc of thumb) {
        thumbPicc.parentElement.removeAttribute('href');
    }

    for (var thumbPic of thumb) {
        thumbPic.onclick = function () {
            mainImg.setAttribute('src', this.getAttribute('src'));
            mainImg.setAttribute('title', this.parentElement.getAttribute('title'));
        }
    }


    mainImg.onclick = function () {
        mainImg.setAttribute('src', "./galeria_files/_jostrowska.jpg")
        alert(mainImg.getAttribute('src'));
    }
}

document.addEventListener('DOMContentLoaded', gallery);


