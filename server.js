var express         = require('express');
var path            = require('path');
var passport        = require('passport');
var bodyParser      = require('body-parser');
var cors            = require('cors');
var config          = require('./libs/config');
var log             = require('./libs/log')(module);
var oauth2          = require('./libs/oauth2');
var SudokuModel    = require('./libs/mongoose').SudokuModel;
var UserModel    = require('./libs/mongoose').UserModel;
var sudoku = require('sudoku-c');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(methodOverride('X-HTTP-Method-Override'));

app.get('/api', passport.authenticate('bearer', { session: false }), function (req, res) {
    res.send('API is running');
});

app.post('/oauth/token', oauth2.token);

app.get('/api/userInfo',
    passport.authenticate('bearer', { session: false }),
        function(req, res) {
            // req.authInfo is set using the `info` argument supplied by
            // `BearerStrategy`.  It is typically used to indicate scope of the token,
            // and used in access control checks.  For illustrative purposes, this
            // example simply returns the scope in the response.
            res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
        }
);

app.get('/ErrorExample', function(req, res, next){
    next(new Error('Random error!'));
});

app.post('/api/register', function(req, res) {
    UserModel.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
            var user = new UserModel({username : req.body.username, password : req.body.password});
            user.save(function(err, user) {
                if (err) {
                    log.error(err);
                    return res.send({ error: error(err)});
                } else {
                    log.info("New user - %s:%s",user.username,user.password);
                    return res.send({ status: 'Registration Successful' });
                }
            });
        } else if (user) {
            log.info("Username already exists - %s:%s",user.username,user.password);
            return res.send({ status: 'Error, username already exists' });
        }
    });

});

app.get('/sudoku/generate', passport.authenticate('bearer', { session: false }), function(req, res) {
    return res.send({ sudoku: sudoku.classic(sudoku.generate(), 54) });
});

app.get('/sudoku/generate-string', passport.authenticate('bearer', { session: false }), function(req, res) {
    return res.send({ sudoku: sudoku.classic(sudoku.generate(), 54).toString() });
});

app.get('/sudoku/generate/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
    var grid = sudoku.classic(sudoku.generate(), parseInt(req.params.id));
    return res.send({ sudoku: grid});
});

app.get('/sudoku/generate-string/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
    var grid = sudoku.classic(sudoku.generate(), parseInt(req.params.id)).toString();
    return res.send({ sudoku: grid});
});

app.post('/sudoku/solve', function(req, res) {
    var grid = req.body.grid.split(",").map(Number);
    var solution =  sudoku.solve(grid);
    return res.send({ sudoku: solution });
});

app.use(express.static(path.join(__dirname, "public")));

require('./libs/auth');

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});