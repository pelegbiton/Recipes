var express= require("express");
var router=express.Router();
const axios=require("axios");
const bcrypt = require("bcrypt");
var sql = require('mssql');
const DB = require("../DButils");
const Utils = require("../Utils");

require("dotenv").config();
//var photoURL;
//const api_domain= "https://api.spoonacular.com/recipes";

//this function return to the the login user all the recipe he added to the site
router.get("/getAllMyRecipe", async (req, res, next) => {
  try { 
    if(req.username == undefined){
      res.status(401).send("user not connected to the system");
    }
const myRecipes = await DB.execQuery(
  `SELECT * FROM myRecipe where username = '${req.username}'`
);

    res.status(200).json(myRecipes);
  } catch (error) {
    next(error);
  }
});

//this function get recipeId and add it to the user list of favorite recipe
router.post("/addFavorite", async (req, res, next) => {
  try {  
    const str= `INSERT INTO favorites  
    VALUES('`+req.username+`','`+req.body.id+`');`;
    await DB.execQuery(str);
    res.status(200).send({ message:"added to Favorite", success: true });
  } catch (error) {
    next(error);
  }
});


//this function get idRecipe and return true if the login user already choose it as its favorite 
//and false if not
router.get("/ifFavorite/:id", async (req, res, next) => {
  try { 
    if(req.username==undefined){
      res.status(401).send("user not connected to the system")
    }
var bool=false;
const favorite = (await DB.execQuery(
  `SELECT * FROM favorites WHERE idRecipe = '${req.params.id}' AND username = '${req.username}'`
))[0];
if(favorite!=undefined)
{
bool=true;
}
    res.status(200).json(bool);
  } catch (error) {
    next(error);
  }
});

//this function get idRecipe and return true if the login user already watch it
//and false if not
router.get("/ifWatched/:id", async (req, res, next) => {
  try { 
    if(req.username==undefined){
      res.status(401).send("user not connected to the system")
    }
var bool=false;
const watched = await DB.execQuery(
  `SELECT * FROM watched WHERE idRecipe = '${req.params.id}' AND username = '${req.username}'`
);
const w = watched[0];
if(w!=undefined)
{
bool=true;
}

    res.status(200).json(bool);
  } catch (error) {
    next(error);
  }
});

//this function return the 3 recipes from the DB.
//those recipes are the recipe we enter from our family.
router.get("/get3FamilyRecipes", async (req, res, next) => {
  try {  
    const recipe = (
      await DB.execQuery(
        `SELECT * FROM familyRecipe  WHERE username = '${req.username}'`      )
    );
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
});

//this function return all the favorite user recipes opening details.
//those function use the cookie of the user and return from the DB the id of the favorite recipe and by the
//get info bulk the image of all the recipe
router.get("/getFavoriteOpeningDetails", async (req, res, next) => {
  try {  
    const recipes = (
      await DB.execQuery(
        `SELECT idRecipe FROM favorites WHERE username = '${req.username}'`
      )
    );
    if(recipes.length==0)
    {
      res.status(200).json();
    }
    var str="";
   if(recipes.length>0)
   {
    str=recipes[0].idRecipe;
    for(i=1; i<recipes.length; i++)
    {
      str+=","+recipes[i].idRecipe;
    }
  }

  let promises=[];

  promises.push(axios.get(`https://api.spoonacular.com/recipes/informationBulk`, {
       params: {
        ids: str,
         apiKey:process.env.spooncular_apiKey
       }
     }))

    let infoResponse=await Promise.all(promises);
  
    const randomArray=extractOpeningDetails(infoResponse);
    res.status(200).json(randomArray);
    
    
  } catch (error) {
    next(error);
  }
});

//this function get list of ids and return all the opening details
//of those ids
router.get("/getRecipeOpeningDetails/:ids", async (req, res, next) => {
  try {  
   
  let promises=[];

  promises.push(axios.get(`https://api.spoonacular.com/recipes/informationBulk`, {
       params: {
        ids: req.params.ids,
         apiKey:process.env.spooncular_apiKey
       }
     }))

    let infoResponse=await Promise.all(promises);
    const randomArray=extractOpeningDetails(infoResponse);
    res.status(200).json(randomArray);
  } catch (error) {
    next(error);
  }
});


//this function return all the details about a specific recipe - opening details +ingridients + instructuin + quantity
//we will call this function in show recipe page 
//this function get in param the id of the recipe
router.get("/getRecipeAllDetails/:RecipeId", async (req, res, next) => {
  try { 
    RecipeId=req.params.RecipeId;

    let promises=[];

  promises.push(axios.get(`https://api.spoonacular.com/recipes/${RecipeId}/information`, {
       params: {
        apiKey:process.env.spooncular_apiKey
       }
     }))
    let infoResponse=await Promise.all(promises);
    const allDetails=Utils.extractAllDetails(infoResponse);
    res.status(200).json(allDetails);
  } catch (error) {
    next(error);
  }
});


//this function return 3 random recipes
//the function return all toghter in json object
router.get("/get3RandomRecipe", async (req, res, next) => {
  try { 
    let promises=[];

    for( i=0; i<3; i++)
    {
     promises.push(axios.get(`https://api.spoonacular.com/recipes/random`, {
       params: {
         apiKey:process.env.spooncular_apiKey
       }
     }))
   }
  
    let infoResponse=await Promise.all(promises);
    const randomArray=extractIdAndURL(infoResponse);
    res.status(200).json(randomArray);
  } catch (error) {
    next(error);
  }
});

//this function return the data we need for the right home page. this function check if
//the user is login or not by cookies. if the user is log in the system it brings the 3 last watched recipes
//the function return all toghter in json object
router.get("/HomePage3LastRecipeWatched", async (req, res, next) => {
  try { 
    if(req.username == undefined){
      res.status(401).send("user not connected to the system");
    }
    else{
      const recipes = (
        await DB.execQuery(
          `SELECT TOP 3 idRecipe FROM watched WHERE username = '${req.username}' ORDER BY lastModify DESC`
        )
      );
      const listOfId=[];
      for(i=0; i< recipes.length;i++){
        listOfId.push(recipes[i].idRecipe);
      }
      let promises=[];

      listOfId.map((id)=>
       promises.push(axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
         params: {
           apiKey:process.env.spooncular_apiKey
         }
       }))
      );
      let infoResponse=await Promise.all(promises);
      const getArray=newextractIdAndURL(infoResponse);

      res.status(200).json(getArray);
    }
  } catch (error) {
    next(error);
  }
});





router.post("/addWatched", async (req, res, next) => {
  try { 
    RecipeId=req.body.RecipeId;
    addToWatchTable(RecipeId , req.username);

    
    res.sendStatus(200)
  } catch (error) {
    next(error);
  }
});

//this function get id of recipe and user name and add to the watched table the details.
async function addToWatchTable(id,username)
{
  bool=await ifExistInWatchedTable(id,username);
  console.log(bool);
  if(bool==true){
    await deleteWatchedTable(id,username);
  }
  var tmp= new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  const str= `INSERT INTO watched  
  VALUES('`+username+`','`+id+`','`+tmp+`');`;
    await DB.execQuery(str);
    console.log(str);
}

//those 2 function update the date in the watch table (by delete)- beacause the user saw the recipe 
//another time
async function deleteWatchedTable(id,username){
  const str= `DELETE FROM watched  
  WHERE username = '${username}' and idRecipe = '${id}';`;
    await DB.execQuery(str);
    console.log(str);

}
async function ifExistInWatchedTable(id,username){
  const recipe = (
    await DB.execQuery(
      `SELECT idRecipe FROM watched WHERE username = '${username}' and idRecipe = '${id}';`
    )
  );
  console.log( `SELECT idRecipe FROM watched WHERE username = '${username}' and idRecipe = '${id}';`);
  console.log(recipe.length);
  if(recipe.length==0){
    return false;
  }
  return true;
}
//this function get data and extract from it only the opening details
function extractOpeningDetails(infoResponse)
{
  return infoResponse[0].data.map((info)=>{
    const{
      id,
      image,
      title,
      readyInMinutes,
      aggregateLikes,
      vegetarian,
      vegan,
      glutenFree,
    }=info;
    return{
      id: id,
      image: image,
      title: title,
      readyInMinutes: readyInMinutes,
      aggregateLikes: aggregateLikes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
    };
  });
  
}
//this function get data and extract from it only the id and the photo
function extractIdAndURL(infoResponse)
{
  return infoResponse.map((inforesponse)=>{
    const{
      id,
      image,
    }=inforesponse.data.recipes[0];
    return{
      id: id,
      image: image,
    };
  });
}
//this function get data and extract from it only the id and the photo
function newextractIdAndURL(infoResponse)
{
  return infoResponse.map((inforesponse)=>{
    const{
      id,
      image,
      title,
    }=inforesponse.data;
    return{
      id: id,
      image: image,
      title: title,
    };
  });
}





module.exports =router;