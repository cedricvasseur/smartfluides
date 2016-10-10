/************************************************************************/
/*  nls.js                                                              */
/*  VASSEUR cedric @2016                                                */
/*  NLS Route File                                                      */
/************************************************************************/

var express = require('express'),
	L10n    = require('l10n'),
	path    = require('path');

var config  = require('../../config/config.js');

var router  = express.Router();
var portail = __dirname.split(path.sep).pop();

//
// Gestion des langues.
// On récupère la langue passé en paramètre, on vérifie qu'elle est disponible
// Si oui, on redirige vers la page d'acceuil en positionnant la langue dans le cookie
// Sinon, on positionne l'anglais par défaut.
// 

router.get('/:id', function(req, res, next) {
  var locale = new L10n();
  var current_locale = 'en_GB';

  if(res.getCatalog().hasOwnProperty(req.params.id) != -1 ){
    current_locale = req.params.id;
  }

  var direction = locale.info(current_locale.toLowerCase()).direction;

  res.cookie(config.i18n.cookie, current_locale); 
  res.cookie(config.l10n.cookie, direction); 

  res.redirect(req.cookies['routes'+portail]);
});

module.exports = router;