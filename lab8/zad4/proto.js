const e = ['é', 'è', 'ê'];
const o = ['ó', 'ò', 'ô'];

String.prototype.erLik = function (text) {
    let i;
    let engText = "";
    let length = text.length;
    const origText = this.valueOf();
    for (i = 0; i < length; i++) {
        if (e.indexOf(origText[i]) !== -1) {
            engText = engText.concat('e');
        } else if (o.indexOf(origText[i]) !== -1) {
            engText = engText.concat('o');
        } else if (origText[i] === 'å') {
            engText = engText.concat('aa');
            length--;
        } else if (origText[i] === 'æ') {
            engText = engText.concat('ae');
            length--;
        } else if (origText[i] === 'ø') {
            engText = engText.concat('oe');
            length--;
        } else {
            engText = engText.concat(origText[i]);
        }
    }
    return text === engText || text === origText;

}

var test = String("bokmål");
console.log(test.erLik("bokmaal"));
console.log(test.erLik("bokmal"));

var test2 = String('bokmél');
console.log(test2.erLik('bokmel'));
console.log(test2.erLik('bokmél'));
console.log(test2.erLik('bokmal'));


