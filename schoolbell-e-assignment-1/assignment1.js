function solve(arr1, arr2) {
    arr1.sort(function (a, b) { return b - a; });
    arr2.sort(function (a, b) { return b - a; });
    var n1 = parseInt(arr1.join(''));
    var n2 = parseInt(arr2.join(''));
    return n1 * n2;
}
var arr = [1, 3, 5, 7, 9];
var mx = 0;
var ans1, ans2;
var _loop_1 = function (i) {
    var arr1 = [arr[i]];
    var arr2 = arr.filter(function (_, index) { return index !== i; });
    var res = solve(arr1, arr2);
    if (res > mx) {
        mx = res;
        ans1 = parseInt(arr1.join(''));
        ans2 = parseInt(arr2.join(''));
    }
};
for (var i = 0; i < arr.length; i++) {
    _loop_1(i);
}
var _loop_2 = function (i) {
    var _loop_3 = function (j) {
        var arr1 = [arr[i], arr[j]];
        var arr2 = arr.filter(function (_, index) { return index !== i && index !== j; });
        var res = solve(arr1, arr2);
        if (res > mx) {
            mx = res;
            ans1 = parseInt(arr1.join(''));
            ans2 = parseInt(arr2.join(''));
        }
    };
    for (var j = i + 1; j < arr.length; j++) {
        _loop_3(j);
    }
};
for (var i = 0; i < arr.length - 1; i++) {
    _loop_2(i);
}
console.log(ans1, ans2);
