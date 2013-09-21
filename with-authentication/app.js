var fs = require('fs')
    mongoose = require('mongoose'),
    passport = require('passport'),
    http = require('http');

mongoose.connect('mongodb://localhost/my-app-db');

var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file) {
    if (file.substring(-3) === '.js') {
        require(models_path + '/' + file);
    }
});

require('./config/passport')(passport);

var app = require('./config/express')(passport);

require('./config/routes')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

exports = module.exports = app;
