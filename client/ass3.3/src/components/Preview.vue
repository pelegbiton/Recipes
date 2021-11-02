<template>
<div id="allTheCard">
<router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview" v-if="recipe.id>0">
  <img v-if="this.hasImage" :src="recipe.image" class="card-img-top" alt="..." style="width: 250px; height: 200px;">
  <img v-else src="../assets/defaultPic.jpeg" class="card-img-top" alt="...">
  </router-link>
  <img v-if="recipe.id<0" :src="recipe.image" class="card-img-top" alt="..." style="width: 250px; height: 200px;">
<div class="card" style="width: 250px; height: 300px;">
  <div class="card-body">
    <h5 class="card-title"> <strong>{{ recipe.title }}</strong></h5>
    <p class="card-text">
        {{ recipe.readyInMinutes }} minutes
          <img src="../assets/clock.png" width="25px" height="20px" >
                <br>
        {{ recipe.aggregateLikes }}        
  <img src="../assets/likes.png" width="25px" height="20px" >
<br>
  <img v-if="recipe.vegetarian" src="../assets/veg1.png" width="55px" height="55px" >
  <img v-if="recipe.vegan" src="../assets/vegan.png" width="55px" height="55px" >
        <img v-if="recipe.glutenFree" src="../assets/glutenFree.png" width="55px" height="55px" >
        <img v-if="this.wat" src="../assets/watch.png" width="45px" height="45px" >
        <img v-if="this.fav" src="../assets/favorite.png" width="45px" height="45px" >
        <img v-else-if="recipe.id>0" src="../assets/blackStar.png" width="45px" height="45px" @click="AddFavorite()"  />
    </p>
  </div>
</div>
</div>
</template>


<script>

export default {
  components: {
  },
  data() {
    return {
      hasImage : false,
      fav : false,
      wat : false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  mounted(){
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
              //    params: {
              //      id: this.recipe.id,
              //    }
               // },
                { withCredentials: true }
            );
            this.fav = isFav.data;
    },
    async updateWat() {
      const isWat = await this.axios.get(
                `https://ass3-pelegshachar.herokuapp.com/recipe/ifWatched/${this.recipe.id}`,
             //   {
              //    params: {
               //     id: this.recipe.id,
                //  }
              //  },
                { withCredentials: true }
            );
            this.wat = isWat.data;
    }
  }
};
</script>

<style lang="scss" scoped>

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