<template>
 <div class="container">
   <br>
    <h1 class="title">Search</h1>
    <b-form @submit.prevent="onSearch" class="form" >
      
    <p id="p"> <strong> query:</strong>
    <b-form-input   style="width: 500px;" v-model="query" id="query" placeholder="enter here the query" ></b-form-input>
    </p>
      <br>
         <b-row>
          <b-col><label id="intolranceId">intolrance</label></b-col>
         <b-col>  <label id="dietId">diet</label></b-col>
          <b-col> <label id="cusineId">cusine</label></b-col>
          <b-col> <label id="num">number</label></b-col>
        </b-row>

      

        <b-row id="default" >
          <b-col>
            <multiselect class="multiselect" v-model="selectIntolrance" :options="this.intolrance" :multiple="true" :close-on-select="false" placeholder="Intolerances" :preselect-first="true"></multiselect>

          </b-col>
      <b-col>
        <multiselect class="multiselect" v-model="selectDiet" :options="this.diet" :multiple="true" :close-on-select="false" placeholder="Diets" :preselect-first="true"></multiselect>
      </b-col>

      <b-col>
            <multiselect class="multiselect" v-model="selectCusine" :options="this.cusine" :multiple="true" :close-on-select="false" placeholder="Cuisines" :preselect-first="true"></multiselect>
      </b-col>
          <b-col>
            <div >
              <select  style="width: 200px; height: 40px;" id="numberChoose" v-model="num">
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
            </div>
          </b-col>
        </b-row>

      <br>
<p id="btn">
      <b-button id="searchbtn" type="submit" v-on:click="pushed=true" >Search</b-button>

      <b-button v-if="recipes.length!=0 || lastSearch" id="sortTime" v-on:click="sortTime" >Sort by time</b-button>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <b-button v-if="recipes.length!=0 || lastSearch" id="sortLikes"  v-on:click="sortLikes">Sort by likes</b-button>
</p>
    </b-form>
<br>
     <p v-if="!pushed && lastSearch">
      <b-row id="rows2" align-h="around">
      <b-row v-for="(r,index) in lastSearch" :key="index">
       <b-col v-for="x in r" :key="x.id" >
        <Preview class="favoritePreview" :recipe="x" />
      </b-col>
      </b-row>
    </b-row>
    </p>
    <p v-else-if="!pushed">
    </p>
    <p id="noMatch" v-else-if="recipes.length==0 && stillrunning==false">
      <strong> No Matched Results</strong>
    </p>
    <div id="else" v-else>
      <b-row id="rows" align-h="around">
      <b-row v-for="(r,index) in recipes" :key="index">
       <b-col v-for="x in r" :key="x.id" >
        <Preview class="favoritePreview" :recipe="x" />
      </b-col>
      </b-row>
    </b-row>
    </div>
  </div>
</template>

<script>
import Preview from "../components/Preview.vue";
import intolerances from "../assets/intolerances";
import diet from "../assets/diet";
import cusines from "../assets/cuisines";
import multiselect from 'vue-multiselect'
export default {
  components: {
    Preview,
    multiselect
  },
   data() {
    return {
      query:"",
      recipes: [],
      pushed: false,
      num:  "5", //[{ value: null, text: "", disabled: true }],
      intolrance:[], // [{ value: null, text: "", disabled: true }],
      diet:[], // [{ value: null, text: "", disabled: true }],
      cusine:[], // [{ value: null, text: "", disabled: true }],
      selectIntolrance:[], // [{ value: null, text: "", disabled: true }],
      selectDiet:[], // [{ value: null, text: "", disabled: true }],
      selectCusine:[], // [{ value: null, text: "", disabled: true }],
      lastSearch:"",
      stillrunning: true,
      sort:"",
    };
  },
  mounted() {
    
    this.lastSearch = JSON.parse(sessionStorage.getItem(this.$root.store.username)); 
    this.intolrance.push(...intolerances);
    this.diet.push(...diet);
    this.cusine.push(...cusines);
  },
   methods: {
    async onSearch() {
     try {       

       let intolranceStr=" ";
       let dietStr=" ";
       let cusineStr=" ";
       for(let i=0; i<this.selectIntolrance.length-1; i++)
       {
         intolranceStr+=this.selectIntolrance[i]+" , ";
       }
       if(this.selectIntolrance.length!=0)
       intolranceStr+=this.selectIntolrance[this.selectIntolrance.length-1];

       for(let i=0; i<this.selectDiet.length-1; i++)
       {
         dietStr+=this.selectDiet[i]+" , ";
       }
       if(this.selectDiet.length!=0)
       dietStr+=this.selectDiet[this.selectDiet.length-1];


      for(let i=0; i<this.selectCusine.length-1; i++)
       {
         cusineStr+=this.selectCusine[i]+" , ";
       }
     if(this.selectCusine.length!=0)
      cusineStr+=this.selectCusine[this.selectCusine.length-1];
        this.stillrunning=true;
        const response = await this.axios.get(
          `https://ass3-pelegshachar.herokuapp.com/search/${this.query}`
          ,{
            params: {
                number: this.num,
                intolerances: intolranceStr,
                diet: dietStr,
                cuisine: cusineStr,
            }
          },
           { withCredentials: true }
        );
       
        let recipe = response.data.results;

        for(let i=0; i<recipe.length; i++)
        {
         const response2 = await this.axios.get(
          `https://ass3-pelegshachar.herokuapp.com/recipe/getRecipeAllDetails/${recipe[i].id}`
          ,//{
           // params: {
            //    RecipeId: recipe[i].id,
            //}
       //   },
           { withCredentials: true }
        );
        recipe[i]=response2.data[0];

        const response3 = await this.axios.get(
          `https://ass3-pelegshachar.herokuapp.com/recipe/getRecipeOpeningDetails/${recipe[i].id}`
          ,//{
           // params: {
          //      ids: recipe[i].id,
        //    }
        //  },
           { withCredentials: true }
        );
       recipe[i].vegetarian=response3.data[0].vegetarian;
      recipe[i].vegan=response3.data[0].vegan;
       recipe[i].glutenFree=response3.data[0].glutenFree;
        }
        this.recipes = [];
        const recipeInFunc = recipe;
        this.recipeForTemp=[];

        for(let i=0; i<recipeInFunc.length/5; i++)
        {
           for(let j=0; j<5; j++)
            {
              if(recipeInFunc.length>i*5+j)
              {
              this.recipeForTemp.push(recipeInFunc[i*5+j]);
              }
            }
        this.recipes.push(this.recipeForTemp);
        this.recipeForTemp=[];
        }
      sessionStorage.setItem(this.$root.store.username, JSON.stringify(this.recipes));
        this.stillrunning=false;
      } catch (error) {
        console.log(error);
      }
    },
   async sortLikes() {
     let recipeArr;
     if( this.recipes.length!=0)//sort the recipes
     {
       recipeArr=this.recipes;
     }
     else //sort the last view
     {
        recipeArr=this.lastSearch;
     }

      let recipeOneArray=[];
      let counter=0;

      for(let i=0; i<recipeArr.length; i++)
      {
        for(let j=0; j<recipeArr[i].length; j++)
        {
          recipeOneArray[counter]=recipeArr[i][j];
          counter++;
        }
      }

      recipeOneArray.sort(function(b,a){
          return parseFloat(a.aggregateLikes) - parseFloat(b.aggregateLikes); } );

        recipeArr = [];
        let recipeInFunc = recipeOneArray;
        this.recipeForTemp=[];

        for(let i=0; i<recipeInFunc.length/5; i++)
        {
           for(let j=0; j<5; j++)
            {
              if(recipeInFunc.length>i*5+j)
              {
              this.recipeForTemp.push(recipeInFunc[i*5+j]);
              }
            }
        recipeArr.push(this.recipeForTemp);
        this.recipeForTemp=[];
        }

    if( this.recipes.length!=0)//sort the recipes
     {
       this.recipes=recipeArr;
     }
     else //sort the last view
     {
        this.lastSearch=recipeArr;
     }

   },
   async sortTime() {
       let recipeArr;
     if( this.recipes.length!=0)//sort the recipes
     {
       recipeArr=this.recipes;
     }
     else //sort the last view
     {
        recipeArr=this.lastSearch;
     }

      let recipeOneArray=[];
      let counter=0;

      for(let i=0; i<recipeArr.length; i++)
      {
        for(let j=0; j<recipeArr[i].length; j++)
        {
          recipeOneArray[counter]=recipeArr[i][j];
          counter++;
        }
      }

      recipeOneArray.sort(function(a, b){
          return parseFloat(a.readyInMinutes) - parseFloat(b.readyInMinutes); } );

        recipeArr = [];
        let recipeInFunc = recipeOneArray;
        this.recipeForTemp=[];

        for(let i=0; i<recipeInFunc.length/5; i++)
        {
           for(let j=0; j<5; j++)
            {
              if(recipeInFunc.length>i*5+j)
              {
              this.recipeForTemp.push(recipeInFunc[i*5+j]);
              }
            }
        recipeArr.push(this.recipeForTemp);
        this.recipeForTemp=[];
        }

    if( this.recipes.length!=0)//sort the recipes
     {
       this.recipes=recipeArr;
     }
     else //sort the last view
     {
        this.lastSearch=recipeArr;
     }
  },
    
   }
};

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped >
#p{
    text-align:left;
}
#else{
   position: relative;
   margin: 10px 10px;
}
#btn{
}
.Preview{
 color: black;
}
.container {
 max-width: 1300px;
 color: white;
}
.form{
  text-align:center;
}

#noMatch{
    text-align:center;
    font-size: 30px;
}
#searchbtn {
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