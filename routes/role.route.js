const express= require("express");
const router = express.Router();
const sqlConnection = require("../connection");
const verifyToken = require('../verifytoken');


router.get("/",verifyToken, (req,res)=>{
    sqlConnection.query("SELECT * from Mst_Role Where IsDelete = 0", (error,rows,fields) => {
            if(!error) {
                res.render('role/rolelist.ejs',{title : "Role List", records:rows.recordset, fullname: req.decoded.FullName});
            }
            else
            {
                console.log("error");
            }
    });
});

router.get("/add",verifyToken, (req,res) => {
    res.render('role/roleadd.ejs',{title : "Add Role",fullname: req.decoded.FullName});
});

router.get("/edit/:id",verifyToken, (req,res) => {
    sqlConnection.query("SELECT * from Mst_Role Where RoleId = "+req.params.id+"", (error,rows,fields) => {
        if(!error) {
            res.render('role/roleedit.ejs',{title : "Edit Role", rolename:rows.recordset[0].RoleName , roleId : rows.recordset[0].RoleId , fullname: req.decoded.FullName});
        }
        else
        {
            console.log("error");
        }
    });
});

router.get("/delete/:id",verifyToken, (req,res) => {
    sqlConnection.query("Update [TeleBilling_V01].[dbo].[Mst_Role] set IsDelete = 1 Where RoleId ="+req.params.id+"", (error,rows,fields) => {
        if(!error) {
            res.redirect('/role');
        }
        else
        {
            console.log("error");
        }
    });
});

router.post("/add",verifyToken, (req,res) => {
    sqlConnection.query("INSERT INTO [dbo].[Mst_Role]([RoleName],[IsActive],[IsDelete],[CreatedBy],[CreatedDate],[UpdatedBy],[UpdatedDate],[TransactionId])VALUES('"+req.body.roleObj.name+"',1,0,1,getDate(),null,null,null)",(error,rows,fields) => {
        if(!error) {
            res.redirect('/role');
        }
        else
        {
            console.log(error);
        }
    });
});

router.post("/edit/:id",verifyToken, (req,res) => {
    sqlConnection.query("Update [TeleBilling_V01].[dbo].[Mst_Role] set RoleName = '"+req.body.roleObj.name+"' Where RoleId ="+req.params.id+"",(error,rows,fields) => {
        if(!error) {
            res.redirect('/role');
        }
        else
        {
            console.log(error);
        }
    });
});

module.exports = router;