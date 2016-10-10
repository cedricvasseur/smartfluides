/************************************************************************/
/*  app.js                                                              */
/*  VASSEUR cedric @2016                                                */
/*  Main Node Application file                                          */
/************************************************************************/

var express         = require('express'),
    session         = require('express-session'),
    path            = require('path'),
    favicon         = require('serve-favicon'),
    helmet          = require('helmet'),
    logger          = require('morgan'),    
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    i18n            = require("i18n"),
    L10n            = require('l10n'),
    fs              = require('fs');

//Loading Configuration file
var config  = require('./config/config');

//Loading Authentification Strategies
var authstrategies = require("./auth/strategies");

//Storage Session Couchbase
var debug = require('debug')('Couchbase Session Store')
var CouchbaseStore = require('connect-couchbase')(session);
var couchbaseStore = new CouchbaseStore({
    bucket:config.couchbase.bucket,
    password:config.couchbase.password,
    host:config.couchbase.server,
    connectionTimeout: config.couchbase.connectionTimeout,
    operationTimeout: config.couchbase.operationTimeout,
    cachefile:config.couchbase.cachefile,
    ttl: config.couchbase.ttl,
    prefix: config.couchbase.prefix
});

couchbaseStore.on('connect', function() {
    debug("Couchbase Session store is ready for use");
});
 
couchbaseStore.on('disconnect', function() {
    debug("An error occurred connecting to Couchbase Session Storage");
});


// Internationalisation Configuration

i18n.configure(config.i18n);
var locale = new L10n();

var app = module.exports = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(cookieParser(config.session.secretkey));
app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({store: couchbaseStore, secret: config.session.secretkey,resave: true, saveUninitialized: true,cookie: config.session.cookie}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Statics Routes.
app.use('/bootstrap',                 express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery',                    express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/flag-icon-css',             express.static(__dirname + '/node_modules/flag-icon-css/'));
app.use('/angular',                   express.static(__dirname + '/node_modules/angular/'));
app.use('/angular-utils-pagination',  express.static(__dirname + '/node_modules/angular-utils-pagination/'));
app.use('/angular-sanitize',          express.static(__dirname + '/node_modules/angular-sanitize/'));
app.use('/highcharts',                express.static(__dirname + '/node_modules/highcharts/'));


// Main Route
app.get('/', function(req, res, next) {
  var direction = locale.info(res.getLocale().toLowerCase()).direction;
  res.cookie('l10n', direction);
  if(req.isAuthenticated()){
    res.redirect('/gestionnaire/home'); 
  } else {
    res.redirect('/gestionnaire/index');  
  }
});
var languages = module.exports = i18n.getCatalog();

//Loading APIs.
console.log("Loading APIs...");
var apis = {};
var apis_path = __dirname + '/api';
//
fs.readdirSync(apis_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        apis['/api/'+file.split('.')[0]] = require(apis_path + '/' + file);
    }
});

for(var i in apis)
{
  app.use(i,apis[i]);
 console.log("loading Api ", i);  
}
console.log(".......................[ok]");

//Loading Routes.
console.log("Loading Routes...");
var routes = {};
var routes_path = __dirname + '/routes';

fs.readdirSync(routes_path).forEach(function (fileName) {
    stats = fs.lstatSync(routes_path + '/' + fileName);
    if (stats.isDirectory()) {
      app.get('/'+fileName, function(req, res, next) {
        if(req.isAuthenticated()){
          res.redirect('/'+fileName+'/home'); 
        } else {
          res.redirect('/'+fileName+'/index');  
        }
      });
      fs.readdirSync(routes_path + '/' + fileName).forEach(function (file) {
        if (file.indexOf('.js') != -1) {
          routes['/' + fileName +'/'+file.split('.')[0]] = require(routes_path + '/' + fileName + '/' + file);
        }
      });     
    }
});

for(var i in routes)
{
  app.use(i,routes[i]);
  console.log("loading Route ", i);  
}
console.log(".......................[ok]");


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
    i18n:res,
    message: err.message,
    error: err
  });
});

// Utilisation de passenger pour le lancement en load-balancing
var server = app.listen();

module.exports = app;