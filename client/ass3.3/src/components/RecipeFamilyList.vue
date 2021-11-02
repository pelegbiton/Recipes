<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-col>
      <b-row v-for="r in recipes" :key="r.id">
        <FamilyRecipe class="recipePreview" :recipe="r" /> 
        <br>
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import FamilyRecipe from "./FamilyRecipe.vue";
export default {
  name: "RecipeFamilyList",
  components: {
    FamilyRecipe
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
    this.updateRecipeFamilyList();
  },
  methods: {
    async updateRecipeFamilyList() {
      try {
        const response = await this.axios.get(
          "https://ass3-pelegshachar.herokuapp.com/recipe/get3FamilyRecipes"
          ,
           { withCredentials: true }
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
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