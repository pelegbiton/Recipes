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
      <b-button id="btn" v-on:click="updateRecipes">Random</b-button>
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
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
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          "https://ass3-pelegshachar.herokuapp.com/Recipe/get3RandomRecipe"
        );
        const recipes = response.data;
        this.recipes = [];
        for(let i=0; i<recipes.length; i++)
        {
         const response2 = await this.axios.get(
          `https://ass3-pelegshachar.herokuapp.com/Recipe/getRecipeOpeningDetails/${recipes[i].id}`,
          //{
         //   params: { ids: recipes[i].id }
         // }
        );
        this.recipes.push(response2.data[0])
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
#btn {
  background: #222;
  height: 30px;
  min-width: 10px;
  border: none;
  border-radius: 10px;
  color: #eee;
  font-size: 20px;
  font-family: 'Cookie', cursive;
  position: relative;
  transition: 1s;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-top: 5px;
}
</style>