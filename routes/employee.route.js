const express= require("express");
const router = express.Router();
const sqlConnection = require("../connection");
const verifyToken = require('../verifytoken');


router.get("/",verifyToken,(req,res)=>{
    sqlConnection.query("SELECT * from Mst_Employee",(error,rows,fields) => {
            if(!error) 
            {
                res.render('employee/employee.ejs',{title : "Employee List", records:rows.recordset, fullname: req.decoded.FullName});
            }
            else
            {
                console.log("error");
            }
    });
});



module.exports = router;