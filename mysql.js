const mysql = require('mysql')

const pool = mysql.createPool({
    "user" : "root",
    "password" : "root",
    "database" : "rest-api",
    "host" : "localhost"
})

exports.pool