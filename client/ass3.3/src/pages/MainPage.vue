<template>
  <div class="container">
    <br>
    <br>
    <h1 class="title">Main Page</h1>

    <b-row>
      <b-col>
    <RecipePreviewList id="random" title="Explore these recipes" class="RandomRecipes center" />
      </b-col>

    <b-col>
      
    <RecipeLastViewList id="lastView" v-if="$root.store.username"
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    >
    </RecipeLastViewList>
        <br>
        <br>
        <br>
        <br>

    <LoginPage v-if="!$root.store.username">
</LoginPage>
    </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import RecipeLastViewList from "../components/RecipeLastViewList";
import LoginPage from "./LoginPage";

export default {
  components: {
    RecipePreviewList,
    RecipeLastViewList,
    LoginPage,
  },
  async created() {
  },
  methods: {
  
  }
};

</script>


<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
div{

    color: white;
}
</style>
