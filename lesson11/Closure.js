// i被外层引用,所以输出5个5
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 5);
}

// 将i赋值给局部变量idx
for (var i = 0; i < 5; i++) {
    (function (idx) {
        setTimeout(function () {
            console.log(idx);
        }, 5);
    })(i);
}
