var sql = require('mssql');
require("dotenv").config();
var express= require("express");
var router=express.Router();


const config = {
  user: process.env.tedious_userName ,
  password: process.env.tedious_password,
  server: process.env.tedious_server,
  database: process.env.tedious_database,
  connectionTimeout: 1500000,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
}

const pool = new sql.ConnectionPool(config);
const poolConnect = pool
.connect()
.then(() => console.log("new connection pool Created"))
.catch((err) => console.log(err));


exports.execQuery = async function (query) {
  console.log("enter to execquery");
  await poolConnect;
  try {
    var result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};
