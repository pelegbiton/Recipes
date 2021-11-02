var sql = require('mssql');
require("dotenv").config();
var express= require("express");
var router=express.Router();


//this function get data and extract from it only the details we need to show
function extractAllDetails(allDetails)
{
  const a=allDetails.map((data)=>{
    const{
      id,
      servings,
      instructions,
      extendedIngredients,
      analyzedInstructions,
      aggregateLikes,
      readyInMinutes,
      title,
      image,
    }=data.data;
    return{
      id: id,
      servings: servings,
      instructions: instructions,
      extendedIngredients: extendedIngredients,
      analyzedInstructions: analyzedInstructions,
      aggregateLikes: aggregateLikes,
      readyInMinutes: readyInMinutes,
      title: title,
      image: image,
    };
  });
  return a;
}



exports.extractAllDetails=extractAllDetails;