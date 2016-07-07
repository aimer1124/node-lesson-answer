var async = require('async');


var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';
var topicUrls = [];

superagent.get(cnodeUrl)
    .end(function (err, res) {
        if (err) {
            return console.error(err);
        }

        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });
        // 并发连接数的计数器
        var concurrencyCount = 0;
        var fetchUrl = function (url, callback) {
            superagent.get(url)
                .end(function (err,res) {
                    var $ = cheerio.load(res.text);
                    console.log(url + ' Title is :' + $('.topic_full_title').text().trim());
                });
            // delay 的值在 2000 以内，是个随机的整数
            var delay = parseInt((Math.random() * 10000000) % 2000, 10);
            concurrencyCount++;
            console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
            setTimeout(function () {
                concurrencyCount--;
                callback(null, url + ' html content');
            }, delay);
        };

        async.mapLimit(topicUrls, 5, function (url, callback) {
            fetchUrl(url, callback);
        }, function (err) {
            if (err) {
                return console.error(err);
            }
        });
    });

