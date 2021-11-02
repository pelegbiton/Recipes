<template>
   <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <br>
        <br>
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
            <div class="mb-3">
              
          <img v-if="this.fav" src="../assets/favorite.png" width="25" height="25" />
          <img v-else src="../assets/blackStar.png" width="25" height="25" @click="AddFavorite()"  />
          <img v-if="recipe.vegetarian" src="../assets/veg1.png" width="55px" height="55px" >                
          <img v-if="recipe.vegan" src="../assets/vegan.png" width="55px" height="55px" >
          <img v-if="recipe.glutenFree" src="../assets/glutenFree.png" width="55px" height="55px" >
          <img v-if="recipe.watched" src="../assets/watch.png" width="45px" height="45px" >
          <div>serving: {{ recipe.servings }} serving</div>
          {{ recipe.readyInMinutes }} minutes
          <img src="../assets/clock.png" width="25px" height="20px"/>
          {{ recipe.aggregateLikes }}        
          <img src="../assets/likes.png" width="25px" height="20px"/>
            </div>
          <div class="wrapped">
            <h2>Ingredients:</h2>
            <ul>
              <li
               v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <h2>Instructions:</h2>
            <ol>
              <li v-for="s in this.recipe._instructions" :key="s.number">
                {{ s.step }} 
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: [],
      recipe2:[],
      fav:false
    };
  },
     methods: {
    async AddFavorite()
    {
       try {
        const response = await this.axios.post(
          "https://ass3-pelegshachar.herokuapp.com/recipe/addFavorite",
          {
            id: this.$route.params.recipeId
          }
        );
        this.fav=true;
      } catch (err) {
        console.log(err);
        this.form.submitError = err.response.data.message;
      }
    },
  },
  async created() {
    try {
      let response;
      let response2;
      let response3;
      let response4;
      try {

         response = await this.axios.post(
          "https://ass3-pelegshachar.herokuapp.com/Recipe/addWatched",
          {
             RecipeId: this.$route.params.recipeId
          }
        );
        response = await this.axios.get(
          `https://ass3-pelegshachar.herokuapp.com/Recipe/getRecipeAllDetails/${this.$route.params.recipeId}`,
          //{
          //  params: { RecipeId: this.$route.params.recipeId }
         // }
        );

        response2 = await this.axios.get(
          `https://ass3-pelegshachar.herokuapp.com/Recipe/getRecipeOpeningDetails/${this.$route.params.recipeId}`,
        //  {
        //    params: { ids: this.$route.params.recipeId }
        //  }
        );

        response3 = await this.axios.get(
          `https://ass3-pelegshachar.herokuapp.com/Recipe/ifFavorite/${this.$route.params.recipeId}`//,
        //  {
          //  params: { id: this.$route.params.recipeId }
        //  }
        );

        response4 = await this.axios.get(
          `https://ass3-pelegshachar.herokuapp.com/Recipe/ifWatched/${this.$route.params.recipeId}`,
          //{
        //    params: { id: this.$route.params.recipeId }
         // }
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
    let {
        id,
        instructions,
        servings,
        extendedIngredients,
        analyzedInstructions,
        aggregateLikes,
        readyInMinutes,
        image,
        title
      } = response.data[0]

    let _instructions="";
    if(analyzedInstructions!=undefined){
     _instructions = analyzedInstructions
       .map((fstep) => {
         fstep.steps[0].step = fstep.name + fstep.steps[0].step;
         return fstep.steps;
       })
       .reduce((a, b) => [...a, ...b], []);
    }
      let _recipe = {
        id,
        instructions,
       _instructions,
        analyzedInstructions,
        servings,
        extendedIngredients,
       aggregateLikes,
        readyInMinutes,
        image,
        title
      };
      this.recipe = _recipe;
       let {
        glutenFree,
        vegan,
        vegetarian,
      } = response2.data[0]
      this.recipe.glutenFree=response2.data[0].glutenFree;
      this.recipe.vegan=response2.data[0].vegan;
      this.recipe.vegetarian=response2.data[0].vegetarian;
      this.recipe.favorite=response3.data;
      this.recipe.watched=response4.data;
      this.fav=response3.data;
        }  catch (error) {
      console.log(error);
    }
      }
    };
</script>

<style scoped>
.container {
  display: flex;
    background-color: rgba(255, 255, 255, 0.5);
   color:black;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

</style>