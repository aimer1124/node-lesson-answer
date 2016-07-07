var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function (req, res) {
    var q = req.query.q;

    /** The usage of hash function:
     * hash
     *
     * @param {String} method hash method, e.g.: 'md5', 'sha1'
     * @param {String|Buffer} s
     * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
     * @return {String} md5 hash string
     * @public
     */

    var sha1Value = utility.hash('sha1',q,'hex');
    res.send(sha1Value);
});

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});