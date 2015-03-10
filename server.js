var express         = require('express');
var http            = require('http');
var path            = require('path');
var passport        = require('passport');
var bodyParser      = require('body-parser');
var cors            = require('cors');
var config          = require('./libs/config');
var log             = require('./libs/log')(module);
var oauth2          = require('./libs/oauth2');
var SudokuModel     = require('./libs/mongoose').SudokuModel;
var UserModel       = require('./libs/mongoose').UserModel;
var sudoku          = require('./libs/sudoku.js');
var player          = require('./libs/player.js');
var app             = express();
var server          = http.createServer(app);
var socket          = require('socket.io');
var io              = socket.listen(server);

var clients = {};

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

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
        if (user) {
            log.info("Username already exists - %s:%s",user.username,user.password);
            return res.send({ error: 'Username already exists' });
        } else {
            var newuser = new UserModel({username : req.body.username, password : req.body.password});
            newuser.save(function(err, newuser) {
                if (err) {
                    log.error(err);
                    return res.send({ error: error(err)});
                } else {
                    console.log('hello');
                    log.info("New user - %s:%s",newuser.username,newuser.password);
                    return res.send({ status: 'Registration Successful' });
                }
            });
        }
    });

});

app.get('/sudoku/generate', function(req, res) {
    return res.send({ sudoku: sudoku.generate("medium") });
});

app.get('/sudoku/generate-string', function(req, res) {
    return res.send({ sudoku: sudoku.generate("medium").toString() });
});

app.get('/sudoku/generate/:id', function(req, res) {
    if (req.params.id == 'easy' || req.params.id == 'medium' || req.params.id == 'hard') return res.send({ sudoku: sudoku.generate(req.params.id)});
    return res.send({ error: 'Last argument has to be "easy", "medium" or "hard"' });
});

app.get('/sudoku/generate-string/:id', function(req, res) {
    if (req.params.id == 'easy' || req.params.id == 'medium' || req.params.id == 'hard') return res.send({ sudoku: sudoku.generate(req.params.id).toString()});
    return res.send({ error: 'Last argument has to be "easy", "medium" or "hard"' });
});

app.post('/sudoku/solve', function(req, res) {
    var grid = req.body.grid.split(",").map(Number);
    return res.send({ sudoku: sudoku.solve(grid) });
});

app.post('/sudoku/solve-string', function(req, res) {
    var grid = req.body.grid.split(",").map(Number);
    return res.send({ sudoku: sudoku.solve(grid).toString() });
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

// Socket.io

io.on('connection', function (socket) {
  socket.on('connect', connect);
  socket.on('move', connect);
  socket.on('progress', progress);
  socket.on('disconnect', disconnect);
});

var connect = function (data) {
    console.log(data);
    console.log("New player has connected: " + data.name);
}

var move = function (data) {
    console.log(data);
}

var progress = function (data) {
    console.log(data);
}

var disconnect = function (data) {
    console.log(data);
}

