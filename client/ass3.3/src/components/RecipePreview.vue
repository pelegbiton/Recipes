<template>
<div id="allTheCard">
  <b-row>

<div class="card" style="width: 560px; height: 200px; ">
            <div class="row no-gutters">
                <div class="col-sm-5" height="200px" width="250px">
              <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }" class="recipe-preview">
                  <img :src="recipe.image" class="recipe-image" height="200px" width="250px" />
                </router-link>
             </div>
                <div class="col-sm-7">
                    <div class="card-body">
                      <h5 class="card-title"> <strong>{{ recipe.title }}</strong></h5>
          <p class="card-text">
          <img v-if="fav" src="../assets/favorite.png" width="25" height="25" />
          <img v-else src="../assets/blackStar.png" width="25" height="25" @click="AddFavorite()"  />
          <img v-if="recipe.vegetarian" src="../assets/veg1.png" width="55px" height="55px" >                
          <img v-if="recipe.vegan" src="../assets/vegan.png" width="55px" height="55px" >
          <img v-if="recipe.glutenFree" src="../assets/glutenFree.png" width="55px" height="55px" >
          <img v-if="wat" src="../assets/watch.png" width="45px" height="45px" >
          <br>
          {{ recipe.readyInMinutes }} minutes
          <img src="../assets/clock.png" width="25px" height="20px" >
          {{ recipe.aggregateLikes }}        
          <img src="../assets/likes.png" width="25px" height="20px" >
          </p>   
         </div>
        </div>
     </div>
</div>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
 hasImage : false,
      fav : false,
      wat : false
    };
  },
  async created() {
    this.updateFav();
    this.updateWat();
    this.hasImage = (this.recipe.image!=undefined);
  },
  methods: {
    async AddFavorite()
    {
       try {
        const response = await this.axios.post(
          "https://ass3-pelegshachar.herokuapp.com/recipe/addFavorite",
          {
            id: this.recipe.id
          }
        );
        this.fav=true;
      } catch (err) {
        console.log(err);
        this.form.submitError = err.response.data.message;
        if(error.response.status===401)
        {
          this.$root.store.logout();
          this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
        }
        else
        {
        this.$router.replace("/notFound");       
       }
      }
    },
    async updateFav() {
      const isFav = await this.axios.get(
                `https://ass3-pelegshachar.herokuapp.com/recipe/ifFavorite/${this.recipe.id}`,
               // {
               //   params: {
              //      id: this.recipe.id,
             //     }
             //   },
                { withCredentials: true }
            );
            this.fav = isFav.data;
    },
    async updateWat() {
      const isWat = await this.axios.get(
                `https://ass3-pelegshachar.herokuapp.com/recipe/ifWatched/${this.recipe.id}`,
             //   {
                 // params: {
               //     id: this.recipe.id,
              //    }
            //    },
                { withCredentials: true }
            );
            this.wat = isWat.data;
    }
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
#allTheCard{
  position: relative;
   padding: 10px 0px;
}
.card{
color:black;
   background-color:rgba(243, 233, 233, 0.7);
    font-size: 18px;
}
</style>