# 邪恶金字塔(Pyramid of Doom)

```
var fs = require('fs');
fs.readFile('sample01.txt', 'utf8', function (err, data) {
    fs.readFile('sample02.txt', 'utf8', function (err,data) {
        fs.readFile('sample03.txt', 'utf8', function (err, data) {
            fs.readFile('sample04.txt', 'utf8', function (err, data) {

            });
        });
    });
});

```

# Promise

## 状态
- 三种状态:完成、未完成、失败
- 转换:未完成->完成,未完成->失败
- 状态转换仅能发生一次

# 具体用法未完全理解