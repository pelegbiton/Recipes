<template>
  <div class="container">
    <br><br>
    <h1 class="title">My Recipe Page</h1>
    <MyRecipeList
      title="My Recipes"
      :class="{
        center: true
      }"
      disabled
    ></MyRecipeList>
  </div>
</template>

<script>
import MyRecipeList from "../components/MyRecipeList";

export default {
  components: {
    MyRecipeList
  }
};

</script>

<style lang="scss" scoped>
div{
    color: white;
}
</style>