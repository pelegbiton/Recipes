<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row id="rows" >
      <b-row v-for="(r,index) in recipes" :key="index">
       <b-col v-for="x in r" :key="x.id" >
        <Preview class="favoritePreview" :recipe="x" />
      </b-col>
      </b-row>
    </b-row>
  </b-container>
</template>

<script>
import Preview from './Preview.vue';
export default {
  name: "RecipeFavoritesList",
  components: {
    Preview,
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: [],
      recipeForTemp: []
    };
  },
  mounted() {
    this.updateRecipeFavoritesList();
    this.recipes=[];
    this.recipeForTemp=[];
  },
  methods: {
    async updateRecipeFavoritesList() {
      try {
        const response = await this.axios.get(
          "https://ass3-pelegshachar.herokuapp.com/recipe/getFavoriteOpeningDetails"
          ,
           { withCredentials: true }
        );
        const recipeInFunc = response.data;

        this.recipes = [];
        this.recipeForTemp=[];
        for(let i=0; i<recipeInFunc.length/4; i++)
        {
           for(let j=0; j<4; j++)
            {
              if(recipeInFunc.length>i*4+j)
              {
              this.recipeForTemp.push(recipeInFunc[i*4+j]);
              }
            }
        this.recipes.push(this.recipeForTemp);
        this.recipeForTemp=[];
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

<style lang="scss" scoped>
.container {
  min-height: 400px;
}


</style>