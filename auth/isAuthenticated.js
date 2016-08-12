/************************************************************************/
/*  isAuthetificated.js                                                 */
/*  VASSEUR cedric @2016                                                */
/*  Define isAuthenticated function used in routes                      */
/************************************************************************/

var isAuthenticated = module.exports = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
    res.redirect('/');
}

module.exports = isAuthenticated;