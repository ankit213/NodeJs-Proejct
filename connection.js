const mssql = require("mssql");

var sqlConnection = {
    user: 'sa',
    password:'Admin@net',
    server:'192.168.1.4',
    database:'TeleBilling_V01'
}

mssql.connect(sqlConnection, function (err) {
    if(err) 
    {
         console.log(err);
    }
    else
    {
        console.log("Connected!");
    }
});
module.exports = mssql;