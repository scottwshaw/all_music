var static = require('node-static'),
    http = require('http'),
    url = require('url');

var file = new(static.Server)();

function rovi(queryTerms) {
    var apikey = "upy8v96gn7t7jgdfxhw9drhs";
    var secret = "CtjP86m6kR";

    var genSig = function genSig() {
        var curdate = new Date();
        var gmtstring = curdate.toGMTString();
        var utc = Date.parse(gmtstring) / 1000;
        return require('MD5')(apikey + secret + utc);
    };

    var reqPath = function reqPath() {
        return "/search/v2.1/music/search?" +
            "apikey=" + apikey + "&" +
            "sig=" + genSig() + "&" +
            "query=" + queryTerms + "&" +
            "entitytype=song&" +
            "facet=genre&" +
            "filter=genreid:MA0000002613&" +
            "filter=releasedate>:20090101&" +
            "filter=releasedate<20100101&" +
            "size=10";
    };
    return {
        makeRequest: function makeRequest(callback) {
            var options = {
                host: 'api.rovicorp.com',
                path: reqPath()
            };
            http.get(options,callback).on('error', function(e) {
                console.log("Got error: " + e.message);
            });
        }
    };
}

http.createServer(function (req, serverres) {
    if(/search/.test(req.url)) {
        var terms = url.parse(req.url,true).query.terms;
        rovi(terms).makeRequest(function(clientres) {
            var body = "";
            clientres.on('data', function(chunk) {
                console.log("Data" + chunk);
                body += chunk;
            });
            clientres.on('end',function() {
                serverres.writeHead(200, clientres.headers);
                serverres.end(body);
            });
        });
    } else {
        file.serve(req, serverres);
    }
}).listen(8080);