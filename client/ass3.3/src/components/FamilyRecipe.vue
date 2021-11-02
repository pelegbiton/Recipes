<template>
 <div class="recipe">
   <b-row>
     <b-col>
             <Preview class="Preview" :recipe="recipe" /> 
     </b-col>
     <b-col class="cardcol" style=" width: 1100px;">
       <br>
      <h3> <div :title="recipe.username" class="recipe-username">Username: 
        {{ recipe.username }}
      </div></h3>
      <h3><div :title="recipe.owner" class="recipe-owner">Owner: 
        {{ recipe.owner }}
      </div></h3>
       <h3><div :title="recipe.whenWeMake" class="recipe-whenWeMake">When we make: 
        {{ recipe.whenWeMake }}
      </div></h3>
      <br><br>
      <div :title="recipe.ingredients" class="recipe-ingredients"><h3>Ingredients: </h3>
        <div v-for="pg in parsedIngredients" :key="pg">
        <h5>{{ pg }}</h5>
        </div>
      </div>
     </b-col>
     <b-col class="cardcol">
       <br>
       <div :title="recipe.instruction" class="recipe-instruction"><h3>Instructions: </h3>
       <div v-for="pi in parsedInstruction" :key="pi">
         <h5> {{ pi }}</h5>
       </div>
      </div>
     </b-col>
   </b-row>
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
  computed: {
      parsedInstruction : function(){
        return this.recipe.instruction.split(':')
      },
      parsedIngredients : function(){
        return this.recipe.groceries.split(':')
      } 
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

.recipe {
  background-color:  rgba(243, 233, 233, 0.7);
  color: black;
}
</style>
