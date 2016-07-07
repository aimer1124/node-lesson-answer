var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
    .end(function (err, res) {
        if (err) {
            return console.error(err);
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        });

        var ep = new eventproxy();

        ep.after('topic_html','user_html', topicUrls.length, function (topics,users) {
            topics = topics.map(function (topicPair) {
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                var userHtml = cheerio.load(users[1]);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim(),
                    author1: $('.user_info .dark').eq(0).text().trim(),
                    score1: userHtml('.big').eq(1).text()
                });
            });

            console.log('final:');
            console.log(topics);
        });

        var userUrls = [];

        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl)
                .end(function (err, res) {
                    console.log('fetch ' + topicUrl + ' successful');
                    var $ = cheerio.load(res.text);
                    var href = url.resolve(cnodeUrl,$('.user_info .dark').eq(0).attr('href'));
                    userUrls.push(href);
                    ep.emit('topic_html', [topicUrl, res.text]);
                });
        });

        userUrls.forEach((function (userUrl) {
            superagent.get(userUrl)
                .end(function (err, res) {
                    console.log('fetch user:' + userUrl + 'successful');
                    var $ = cheerio.load(res.text);
                    ep.emit('user_html',[userUrl,res.text]);
                });
        }));
    });
