const express= require("express");
const accountRouter = express.Router();
const passport =  require("../passport");
const verifyToken = require('../verifytoken');

accountRouter.get("/", verifyToken, (req,res) => {
    res.render('account/login.ejs' , { title:"Login" , unauthorized:""});
});

/* Post users Login. */
accountRouter.post('/', function (req, res, next) {
    passport.authenticate('local', function (data, err) {
        if (err) 
        {
           console.log(err.name + ':' + err.message);
           res.end();
        } 
        else 
        {
            if (data.user != null) {
                res.cookie('jwtoken', data.token);
                let userDetail = {
                    UserId : data.user.UserId,
                    RoleId:data.user.RoleId,
                    FullName:data.user.FullName,
                }
                res.redirect('/');
            }
            else 
            { 
                console.log('Incorrect login details!!');
                res.render('account/login.ejs' , { title:"Login" , unauthorized:"Incorrect login details!!" });
            }
        }
    })(req, res, next);
});
module.exports = accountRouter;