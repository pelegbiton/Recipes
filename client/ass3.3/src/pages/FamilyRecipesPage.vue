<template>
  <div class="container">
    <br><br>
    <h1 class="title">Family Recipe Page</h1>
    <RecipeFamilyList
      title="Family Recipes"
      :class="{
        center: true
      }"
      disabled
    ></RecipeFamilyList>
  </div>
</template>

<script>
import RecipeFamilyList from "../components/RecipeFamilyList";

export default {
  components: {
    RecipeFamilyList
  }
};

</script>
<style lang="scss" scoped>
div{
    color: white;
}
</style>