module.exports = function (app, passport) {
    app.get('/api/secured/*',
        function (req, res, next) {
            // Need to filter anonymous users somehow 
            next();
        },
        function (req, res) {
            res.json({ message: 'This message should be responsed only to authenticated users' });
        });


    app.get('/api/*', function (req, res) {
        res.json({ message: 'This message should be responsed to all users' });
    });


    app.get('/*', function (req, res) {
        res.render('index');
    });
};