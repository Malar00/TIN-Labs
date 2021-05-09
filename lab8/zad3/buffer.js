function createBuffer() {
    var buffer = '';
    return function (input) {
        if (input != null) {
            buffer = buffer.concat(input);
        }
        return buffer;
    }
}

var buffer = createBuffer();
buffer('Data');
buffer(' aequatione ');
buffer('quotcunque');
console.log(buffer());