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
                return res.json({ error: 'Login required.' });
            }
            next();
        },
        function (req, res) {
            res.json({ message: 'This message should be responsed only to authenticated users' });
        });

    app.get('/api/*', function (req, res) {
        res.json({ message: 'This message should be responsed to all users' });
    });
    
    app.get('/*', function (req, res) {
        res.render('index', { user: req.user ? req.user : null });
    });
};