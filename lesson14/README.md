# 推荐书: [JavaScript 语言精粹](https://book.douban.com/subject/3590768/)
# 继承
-  `util`库

```
var util = require("util");
var events = require("events");

function MyStream() {
    events.EventEmitter.call(this);
}

util.inherits(MyStream, events.EventEmitter);

MyStream.prototype.write = function(data) {
    this.emit("data", data);
}

var stream = new MyStream();

console.log(stream instanceof events.EventEmitter); // true
console.log(MyStream.super_ === events.EventEmitter); // true

stream.on("data", function(data) {
    console.log('Received data: "' + data + '"');
})
stream.write("It works!"); // Received data: "It works!"
```

- js 是面向对象的，但是是“基于原型的面向对象”，没有类。没有多重继承，没有接口。没有结构体，没有枚举类型。

# 数据类型
- Number，String，Array，Object 和 Function 

# 类型转移
- .toxxx 方法，比如 .toString，.toJSON，toNumber

# 比较对象
- 使用`===`比较对象
