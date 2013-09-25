module.exports = function (app, passport) {
    app.get('/api/secured/*',
        function (req, res, next) {
            // Need to filter anonymous users somehow 
            next();
        },
        function (req, res) {
            res.json({ message: 'This message is only for authenticated users' });
        });


    app.get('/api/*', function (req, res) {
        res.json({ message: 'This message is known by all' });
    });


    app.get('/*', function (req, res) {
        res.render('index');
    });
};