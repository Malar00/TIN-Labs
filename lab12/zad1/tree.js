/*jshint globalstrict: true, devel: true, browser:true, esversion: 6*/
'use strict';

function tree() {

    var li = document.querySelectorAll("ul.drzewo ul li ul");
//garbage
    for (var i = 0; i < li.length; i++) {
        li[i].parentElement.onclick = function () {
            var child = this.children[0];
            if (child.style.display === 'block') {
                child.style.display = 'none';
            } else {
                child.style.display = 'block';
            }
        }

    }

    /* Array.from(ul).forEach(item => {
         item.addEventListener("click", () => {
             this.style.display = 'block';
         });
     });*/


}

document.addEventListener('DOMContentLoaded', tree);



