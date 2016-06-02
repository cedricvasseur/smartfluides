var express = require('express');
var config  = require('../config/config.js');
var router  = express.Router();

//
// Gestion des langues.
// On récupère la langue passé en paramètre, on vérifie qu'elle est disponible
// Si oui, on redirige vers la page d'acceuil en positionnant la langue dans le cookie
// Sinon, on positionne l'anglais par défaut.
// 

router.get('/:id', function(req, res, next) {
  var locale = 'en_GB';
  if(res.getCatalog().hasOwnProperty(req.params.id) != -1 ){
    locale = req.params.id;
  }
  res.cookie(config.i18n.cookie, locale); 
  res.redirect('/');
});

module.exports = router;
