# var
- 如果没有使用`var`，那么变量就被声明为**全局变量**
- js 中，函数中声明的变量在**整个函数**中都有定义
```
function foo() {
  for (var i = 0; i < 10; i++) {
    var value = "hello world";
  }
  console.log(i); //输出10
  console.log(value);//输出hello world
}
foo();
```
# 闭包
- 闭包就是函数的局部变量集合，只是这些局部变量在函数返回后会继续存在。
- 闭包就是函数的“堆栈”在函数返回后并不释放，我们也可以理解为这些函数堆栈并不在栈上分配而是在堆上分配
- 当在一个函数内定义另外一个函数就会产生闭包
- 闭包的一个坑

```
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 5);
}
```
 输出5个**5**,改造代码输出0-4
```
for (var i = 0; i < 5; i++) {
  (function (idx) {
    setTimeout(function () {
      console.log(idx);
    }, 5);
  })(i);
}
```

# this

**总是指向调用该函数的对象**

- 有对象就指向调用对象

```
var myObject = {value: 100};
myObject.getValue = function () {
  console.log(this.value);  // 输出 100

  // 输出 { value: 100, getValue: [Function] }，
  // 其实就是 myObject 对象本身
  console.log(this);

  return this.value;
};

console.log(myObject.getValue()); // => 100
```

执行结果

```
100
{ value: 100, getValue: [Function] }
100

```

- 没调用对象就指向全局对象

```
var myObject = {value: 100};
myObject.getValue = function () {
  var foo = function () {
    console.log(this.value) // => undefined
    console.log(this);// 输出全局对象 global
  };

  foo();

  return this.value;
};

console.log(myObject.getValue()); // => 100
```

执行结果

```
undefined
{ DTRACE_NET_SERVER_CONNECTION: [Function],
  DTRACE_NET_STREAM_END: [Function],
.......
  setInterval: [Function],
  setTimeout: [Function],
  console: [Getter] }
100
```

- 用new构造就指向新对象

```
var SomeClass = function(){
  this.value = 100;
}

var myCreate = new SomeClass();

console.log(myCreate.value); // 输出100
```

通过使用`new`来调用

- 通过 apply 或 call 或 bind 来改变 this 的所指

```
var myObject = {value: 100};

var foo = function(){
  console.log(this);
};

foo(); // 全局变量 global
foo.apply(myObject); // { value: 100 }
foo.call(myObject); // { value: 100 }

var newFoo = foo.bind(myObject);
newFoo(); // { value: 100 }
```

# TIPS
- 在 Node 中，全局变量会被定义在 global 对象下；在浏览器中，全局变量会被定义在 window 对象下。

# 参考
- [理解Javascript的闭包](http://coolshell.cn/articles/6731.html)