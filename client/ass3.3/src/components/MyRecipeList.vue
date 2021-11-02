<template>
  <b-container>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    
      <b-row >
        <b-col v-for="r in recipes" :key="r.id">
        <MyRecipe class="MyRecipe" :recipe="r" /> 
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import MyRecipe from "./MyRecipe.vue";
export default {
  name: "MyRecipeList",
  components: {
    MyRecipe
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateMyRecipeList();
  },
  methods: {
    async updateMyRecipeList() {
      try {
        const response = await this.axios.get(
          "https://ass3-pelegshachar.herokuapp.com/recipe/getAllMyRecipe"
          ,
           { withCredentials: true }
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        /*
        for(let i=0;i<this.recipes.length;i++){
            const isFav = await this.axios.get(
                "https://ass3-pelegshachar.herokuapp.com/recipe/ifFavorite",
                { withCredentials: true }
            );
            recipes[i].fav = isFav.data;
            const isWat = await this.axios.get(
                "https://ass3-pelegshachar.herokuapp.com/recipe/ifWatched",
                { withCredentials: true }
            );
            recipes[i].watched = isWat.data;
        }*/
      } catch (error) {
        console.log(error);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>