var express         = require('express'),
    session         = require('express-session'),
    path            = require('path'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),    
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    i18n            = require("i18n"),
    L10n            = require('L10n'),
    fs              = require('fs');

//Loading Configuration file
var config  = require('./config/config');


// Internationalisation Configuration
i18n.configure(config.i18n);
var locale = new L10n();

var app = module.exports = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: config.session.secretkey,resave: true, saveUninitialized: true,cookie: { maxAge: 60000 , httpOnly: true}}));


// Statics Routes.
app.use('/bootstrap',         express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery',            express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/flag-icon-css',     express.static(__dirname + '/node_modules/flag-icon-css/'));
app.use('/angular',           express.static(__dirname + '/node_modules/angular/'));
app.use('/angular-ui-router', express.static(__dirname + '/node_modules/angular-ui-router/release/'));
app.use('/angular-utils-pagination', express.static(__dirname + '/node_modules/angular-utils-pagination/'));

// Main Route
app.get('/', function(req, res, next) {
  var direction = locale.info(res.getLocale().toLowerCase()).direction;
  res.render('index_'+direction+'.html',{i18n: res});
});
var languages = module.exports = i18n.getCatalog();


//Loading Routes.
console.log("Loading Routes...");
var routes = {};
var routes_path = __dirname + '/routes';
//
fs.readdirSync(routes_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        routes['/'+file.split('.')[0]] = require(routes_path + '/' + file);
    }
});

for(var i in routes)
{
  app.use(i,routes[i]);
// console.log("loading Route ", i);  
}
console.log("Routes loaded..............[ok]");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      i18n:res,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});


var server = app.listen(config.server.port, function() {
    console.log("Listening on port %s...", server.address().port);
});

module.exports = app;