var express= require("express");
var router=express.Router();
const axios=require("axios");
const bcrypt = require("bcrypt");
var sql = require('mssql');
const DB = require("../DButils");
require("dotenv").config();
const session= require("client-sessions");


//this function register a new user to the system
router.post("/Register", async (req, res, next) => {
  try {   
      //need to be in the body - encrypt password
    const users = await DB.execQuery("SELECT username FROM users");
    const username=req.body.username;
    const password=req.body.password;
    if (users.find((x) => x.username === username))
      throw { status: 409, message: "Username taken" };
    else
    var salt = this.salt = bcrypt.genSaltSync(10);
    hash_password = bcrypt.hashSync(password, salt);
    await DB.execQuery("INSERT INTO users VALUES('"+username+"','"+hash_password+"','"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.country+"','"+req.body.email+"','"+req.body.photourl+"');");

    res.status(201).send({ message: "user created", success: true });
  } catch (error) {
    next(error);
  }
});

//this function return if the user is in the system and can log in
router.post("/Login", async (req, res, next) => {
  try {
    // check that username exists
    const users = await DB.execQuery("SELECT username FROM users");
    if (!users.find((x) => x.username === req.body.username))
      throw { status: 401, message: "Username or Password incorrect" };

    // check that the password is correct
    const user = (
      await DB.execQuery(
        `SELECT * FROM users WHERE username = '${req.body.username}'`
      )
    )[0];

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie

    req.session.username = user.username;

    // req.session.save();
    // res.cookie(session_options.cookieName, user.user_id, cookies_options);

    // return cookie
    res.status(200).json(user);//end({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.status(200).send({ success: true, message: "logout succeeded" });
});

module.exports =router;
