var express= require("express");
var router=express.Router();
const axios=require("axios");
const bcrypt = require("bcrypt");
var sql = require('mssql');
require("dotenv").config();



//this function get query - in the query is the name of the recipe
//get cusine, diet and intolrance details
//get number that represent how many recipe to return
//this function will use the api spoonacular and return the recipes from the search results
router.get("/:query", async (req, res, next) => {
    axios
      .get(`https://api.spoonacular.com/recipes/search`, {
        params: {
         query:req.params.query,
         number:req.query.number,
         intolerances:req.query.intolerances,
         diet:req.query.diet,
         cuisine:req.query.cuisine,
         instructionsRequired: true,
         apiKey:process.env.spooncular_apiKey,
        }
      })
      .then((result) => {
        res.status(200).send(result.data);
      }) ;
  });
  
  module.exports =router;