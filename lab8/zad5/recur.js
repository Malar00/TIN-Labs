function cached(cache, fun) {
    function recur(arg) {
        let cacheValue = cache[arg];
        if (cacheValue !== undefined) return cacheValue;
        let result = fun(recur, arg);
        cache[arg] = result;
        return result;
    }

    return recur;
}

var fibonacci = cached([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2);
});
var factorial = cached([1], function (recur, n) {
    return recur(n - 1) * n;
});

console.log(fibonacci(5));
console.log(factorial(5));