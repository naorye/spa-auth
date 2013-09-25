var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    path = require('path');

module.exports = function (passport, mongodbURI) {
    var app = express();

    var root = path.normalize(__dirname + '/..');

    app.set('showStackError', true);

    app.set('port', process.env.PORT || 3000);
    app.set('views', root + '/app/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());

    app.use(express.logger('dev'));

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    app.use(express.session({
        secret: 'my-session-store',
        store: new mongoStore({
            url: mongodbURI,
            collection : 'sessions'
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(root + '/public'));

    app.use(app.router);

    if ('development' == app.get('env')) {
        app.use(express.errorHandler());

        app.use(function(req, res, next) {
             console.log(req.url);
             next();
        });
    }

    return app;
};