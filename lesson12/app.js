var express = require('express'),
    superagent = require('superagent'),
    cheerio = require('cheerio');

var app = express();

app.get('/', function (req, res, next) {
    superagent.get('https://cnodejs.org/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }

            var $ = cheerio.load(sres.text);
            var items = [];

            $('.cell').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.find('.topic_title').attr('title'),
                    href: $element.find('.topic_title').attr('href'),
                    author: $element.find('img').attr('title')
                });
            });

            res.send(items);
        });
});

app.listen(process.env.PORT || 5000);