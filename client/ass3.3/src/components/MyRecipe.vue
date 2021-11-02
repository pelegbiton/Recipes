<template>
 <div class="recipeClass">
   <Preview class="Preview" :recipe="recipe" /> 
 </div>
</template>

<script>
import Preview from "../components/Preview.vue";
export default {
  components: {
    Preview,
  },
    data() {
    return {
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  mounted(){
  }
};
</script>