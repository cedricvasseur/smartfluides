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
        server: "localhost:8091",
        bucket: "smartfluides",
        password: "Administrator",
        connectionTimeout: 20000,
        operationTimeout: 20000,
        cachefile: '',
        ttl: 86400,
        prefix: 'sess'
}

module.exports = config;
