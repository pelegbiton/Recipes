<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-col>
      <b-row v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
           <br>     
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipeLastViewList",
  components: {
    RecipePreview
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
    this.updateRecipesLastViewed();
  },
  methods: {
    async updateRecipesLastViewed() {
      try {
        const response = await this.axios.get(
          "https://ass3-pelegshachar.herokuapp.com/recipe/HomePage3LastRecipeWatched"
          ,
           { withCredentials: true }
        );
        const recipes = response.data;
        this.recipes = [];
    for(let i=0; i<recipes.length; i++)
        {
         const response2 = await this.axios.get(
          `https://ass3-pelegshachar.herokuapp.com/Recipe/getRecipeOpeningDetails/${recipes[i].id}`,
        //  {
         //   params: { ids: recipes[i].id }
        //  }
        );
        this.recipes.push(response2.data[0])

        }
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