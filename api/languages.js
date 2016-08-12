/************************************************************************/
/*  language.js                                                         */
/*  VASSEUR cedric @2016                                                */
/*  APIs for languages                                           	    */
/*  require i18n.js        		                                        */
/*  Authenticated : False                                               */
/************************************************************************/

var express          = require('express'),
	router 	         = express.Router(),
 	i18n             = require("i18n"),
 	config           = require('../config/config');

i18n.configure(config.i18n);
router.use(i18n.init);

// Get all languages
router.get('/', function(req, res, next) {
   	var languages = [];
    for (var i in i18n.getCatalog()) {
		var lang = { code: i, name: res.__(i),icon:'flag-icon-'+i.substring(3,6).toLowerCase()};
		if(i != res.getLocale()){
			languages.push(lang);	
		}	
	}	

	var byName = languages.slice(0);
	byName.sort(function(a,b) {
	    var x = a.name.toLowerCase();
	    var y = b.name.toLowerCase();
	    return x < y ? -1 : x > y ? 1 : 0;
	});
			
    res.send(byName);
});	

module.exports = router;