var  path = require('path');

var config = {};

config.server = {port: '8080'};

config.session = {secretkey:'Etd3(&z?lZ23S'};

config.i18n = 
{
    directory: path.join(__dirname, '../locales'), 
    defaultLocale: 'en_GB',
    cookie: "i18n"
}

config.couchbase = {
        server: "127.0.0.1:8091",
        bucket: "smartfluides"
}

module.exports = config;
