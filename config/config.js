/************************************************************************/
/*  config.js                                                           */
/*  VASSEUR cedric @2016                                                */
/*  Config Object File                                                  */
/************************************************************************/

var  path = require('path');

var config = {}

config.server = {
	port: '8080'
}

config.session = {
	secretkey:'Etd3(&z?lZ23S',
    cookie:{ maxAge: 24*60*60*1000 , httpOnly: true}
}

config.routes ={
	cookie:'routes'
}

config.i18n = {
    directory: path.join(__dirname, '../locales'), 
    defaultLocale: 'en_GB',
    cookie: "i18n"
}

config.l10n = {
	cookie: "l10n"
}

config.couchbase = {
        server: "127.0.0.1:8091",
        bucket: "smartfluides",
        connectionTimeout: 2000,
        operationTimeout: 2000,
        cachefile: '',
        ttl: 86400,
        prefix: 'sess'
}

config.facebook = {
        client_id: "CLIENT_ID",
        client_secret: "CLIENT_SECRET",
        callback_url: "http://localhost:8080/auth/facebook/callback"
    }

module.exports = config;
