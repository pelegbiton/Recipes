const express= require("express");
const app= express();
const session= require("client-sessions");
const DB = require("./DButils");
const cors=require("cors");
const port=process.env.PORT || 3000 ;
const corsConfig = {
  origin: true,
  credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(express.json());//need for parse req.body!!!

app.use(
    session({
      cookieName: "session", // the cookie key name
      secret: "abc", // the encryption key
      duration: 2000 * 60 * 1000, // expired after 20 sec
      activeDuration: 0 // if expiresIn < activeDuration,
      //the session will be extended by activeDuration milliseconds
    })
  );

  const user= require("./routes/user");
  const recipe= require("./routes/recipe");
  const search= require("./routes/search");

  //#region cookie middleware
  app.use(function (req, res, next) {
    if (req.session && req.session.username) {
        DB.execQuery("SELECT username FROM users")
        .then((users) => {
          if (users.find((x) => x.username === req.session.username)) {
            req.username = req.session.username;
          }
          next();
        })
        .catch((error) => next());
    } else {
      next();
    }
  });

app.use("/user", user);
app.use("/recipe", recipe);
app.use("/search", search);


app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send({ message: err.message, success: false });
  });


app.listen(port, () => { 
    console.log('connect to port '+ port);
});


