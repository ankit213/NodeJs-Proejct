var express = require('express');
var router = express.Router();
var dbService = require('./connection');
var jwt = require('jsonwebtoken');
let global = require("./global.config");

router.use(function (req, res, next) {
 var cookies = parseCookies(req);
 var originalUrl = req.originalUrl;

 if (originalUrl.includes("save")) httpMethod = 'POST';
 else if (originalUrl.includes("edit")) httpMethod = 'PUT';
 else if (originalUrl.includes("delete")) httpMethod = 'DELETE';
 else httpMethod = 'GET';
 var token = cookies.jwtoken;
 if (token) 
 {
    jwt.verify(token,global.secretKey, { algorithm: global.algorithm }, function (err, decoded) {
        if (err) 
        {
            console.log(err.message);
        }
        else
        {
            req.decoded = decoded;
            if(originalUrl == "/account" && httpMethod == 'GET') 
            {
                res.render('app.ejs',{title:"Home Page" , fullname:decoded.FullName});
            }
            else
            {
                //Stored Procedure
                var query = "Select * From [TeleBilling_V01].[dbo].[Mst_Employee] Where UserId='"+decoded.UserId+"' and IsDelete=0";
                //Get Authorization From Database
                dbService.query(query, (err,rows,fields) => {
                        if (err) {
                            console.log(err.name + ':' + err.message);
                        } 
                        else 
                        {
                            if(rows.recordset.length === 0) 
                            {
                                console.log('Unauthorized Access!!');
                                res.clearCookie('jwtoken');
                                return res.redirect('/account');
                            }
                            else
                            {
                                next();
                            }
                        }
                });
            }
        }
           
    });
    
 } 
 else 
 { 
     console.log('Unauthorized Access!!');
     res.render('account/login.ejs' , { title:"Login" , unauthorized:""});
 }
});

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

module.exports = router;
