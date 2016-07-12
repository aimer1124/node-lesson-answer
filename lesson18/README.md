# http
- Node.js基础库
- 处理请求并返回结果

# connect
- Node.js的http server扩展中间件

```
var connect = require('connect');
var http = require('http');

var app = connect();

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

// respond to all requests
app.use(function(req, res){
  res.end('Hello from Connect!\n');
});

//create node.js http server and listen on port
http.createServer(app).listen(3000);
```

# Express
- Router:正则匹配路由,将http的方法在route中分解开
- Request:请求处理
- Response:返回处理
- Application:属性、业务、模板的处理
