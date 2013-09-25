module.exports = function (app, passport) {

    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth/success', failureRedirect: '/auth/failure' }));
    app.get('/auth/success', function(req, res) {
        res.render('after-auth', { state: 'success', user: req.user ? req.user : null });
    });
    app.get('/auth/failure', function(req, res) {
        res.render('after-auth', { state: 'failure', user: null });
    });

    app.delete('/auth', function(req, res) {
        req.logout();
        res.writeHead(200);
        res.end();
    });

    app.get('/api/secured/*',
        function (req, res, next) {
            if (!req.user) {
                return res.json({ error: 'This is a secret message, login to see it.' });
            }
            next();
        },
        function (req, res) {
            res.json({ message: 'This message is only for authenticated users' });
        });

    app.get('/api/*', function (req, res) {
        res.json({ message: 'This message is known by all' });
    });
    
    app.get('/*', function (req, res) {
        res.render('index', { user: req.user ? req.user : null });
    });
};