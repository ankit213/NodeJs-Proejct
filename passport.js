var passport = require('passport');
var strategy = require('passport-local');
var dbService = require('./connection');
let jwt = require('jsonwebtoken');
let global = require("./global.config");
 
passport.use(new strategy({ session: false }, function (username, password, callback) {
 //Stored Procedure
 var query = "Select * From [TeleBilling_V01].[dbo].[Mst_Employee] Where EmpPFNumber='"+username+"' and Password='"+password+"' and IsDelete=0";
        dbService.query(query, (err,rows,fields) => {
            if (err) 
            {
                callback(null, err);
            } else 
            {
                var result = rows.recordset
                if (result.length > 0) {
                        let token = jwt.sign(result[0], global.secretKey, {
                        algorithm: global.algorithm,
                        /* expiresIn: '1m' */
                    });
                    callback({ user: result[0], token: token });
                }
                else 
                {
                    callback({ user: null, token: null });
                }
            }
    });
}));
 
module.exports = passport;