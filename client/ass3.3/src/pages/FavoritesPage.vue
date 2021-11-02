<template>
  <div class="container">
    <br>
    <br>
    <h1 class="title"><em> Recipes Page</em></h1>
    <div >
    <RecipeFavoritesList id="allCards" v-if="$root.store.username"
      title="My Favorites Recipes"
      :class="{
       FavoriteRecipes: true,
        center: true
      }"
      disabled
    ></RecipeFavoritesList>
    </div>
  </div>
</template>

<script>
import RecipeFavoritesList from "../components/RecipeFavoritesList";
export default {
  components: {
    RecipeFavoritesList
  }
};
</script>

<style lang="scss" scoped>
div{
    color:white,
}
.FavoriteRecipes {
  margin: 10px 0 10px;
}
#allCards{
   text-align: left;
}
</style>