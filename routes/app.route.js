const express= require("express");
const router = express.Router();
const verifyToken = require('../verifytoken');

router.get('/',verifyToken, function (req, res, next) {
    res.render('app.ejs',{title:"Home Page" , fullname: req.decoded.FullName});
});


// GET user Logout
router.get('/logout', function (req, res, next) {
    res.clearCookie('jwtoken');
    res.redirect('/account');
});

module.exports = router;