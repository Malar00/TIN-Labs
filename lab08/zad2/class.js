var obj = {
    className: 'first bordered'
}

function switchClassName(obj, name) {
    var classNames = obj.className.split(' ');

    if (classNames.includes(name)) {
        obj.className = classNames.filter(n => n !== name).join(' ');
    } else {
        obj.className = classNames.join(' ').concat(' ', name);
    }

    return obj
}

switchClassName(obj, 'visible');
console.log(obj.className);
switchClassName(obj, 'bordered');
console.log(obj.className);