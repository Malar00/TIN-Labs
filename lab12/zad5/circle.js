/*jshint globalstrict: true, devel: true, browser:true, esversion: 6*/
'use strict';

function circle() {
    var circle = document.getElementsByClassName('disk').item(0);
    circle.style.verticalAlign = "middle";
    var text = document.createElement('P');
    text.innerText = "Lasto beth lammen";
    text.style.fontWeight = "bold";
    text.style.fontSize = "24px";
    text.style.whiteSpace = 'nowrap'
    text.style.textAlign = "center";
    var id = null;

    function circleExpand() {
        var pos = 0;
        text.remove();
        clearInterval(id);
        id = setInterval(frame, 10);

        function frame() {
            if (pos === 300) {
                clearInterval(id);
                text.style.paddingTop = circle.style.height;
                text.style.paddingTop = text.style.paddingTop.substr(-5, 3) / 2 - 24 + 'px';

                circle.appendChild(text);
            } else {
                pos++;
                circle.style.width = pos + 'px';
                circle.style.height = pos + 'px';
            }
        }
    }


    circle.addEventListener('mousedown', circleExpand);
}

document.addEventListener('DOMContentLoaded', circle);


