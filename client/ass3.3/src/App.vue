<template>
  <div id="app" v-bind:style="{ backgroundImage: 'url(' + image + ')' }">
  <b-navbar  type="dark" variant="dark" id="nav" toggleable="lg"  >
    <b-navbar-brand @click="regularPhoto"> <router-link :to="{ name: 'main' }"><em>Main Page</em></router-link></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-brand @click="regularPhoto" > <router-link  :to="{ name: 'search' }" ><em>Search</em> </router-link> </b-navbar-brand>
        <b-navbar-brand @click="photoForAbout" > <router-link :to="{ name: 'about' }"  ><em>About</em> </router-link> </b-navbar-brand>
      


<b-navbar-nav class="ml-auto">

  <b-nav-form @click="regularPhoto">
    <span v-if="!$root.store.username">
        <em>Hello Guest:&nbsp;</em>
        <router-link :to="{ name: 'register' }" ><em>Register</em></router-link> 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <router-link :to="{ name: 'login' }" ><em>Login</em></router-link>
    </span>
  </b-nav-form>

  
    <span v-if="$root.store.username">
      <b-navbar-brand >
      <b-nav-item-dropdown right id="temp2" >
          <template v-slot:button-content id="temp3">
            <em>Personal</em>
          </template>
          
          <b-dropdown-item @click="regularPhoto" router-link :to="{ name: 'favorites' }"><em>Favorite</em></b-dropdown-item>
          <b-dropdown-item @click="regularPhoto" id="temp1"  router-link :to="{ name: 'family' }"><em>Family</em> </b-dropdown-item>
          <b-dropdown-item @click="regularPhoto" router-link :to="{ name: 'my' }"><em>My Recipes </em></b-dropdown-item>
      </b-nav-item-dropdown>
      </b-navbar-brand>
      <b-navbar-brand>
        <em>{{ $root.store.username }}: </em><button @click="Logout"><em>Logout</em></button>
       </b-navbar-brand>
    </span>
  </b-navbar-nav>
  </b-collapse>
</b-navbar>
<br>
<br>
  <router-view />
</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      image: require("@/assets/new4.jpg"),
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      sessionStorage.clear();
      if(this.$router.history.current.path!="/"){
        this.$router.push("/");
        }
    },
    photoForAbout(){
      this.image=require("@/assets/new10.jpg");
    },
     regularPhoto(){
      this.image=require("@/assets/new4.jpg");
    },
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";


.dropdown .dropdown-menu .dropdown-item:active, .dropdown .dropdown-menu .dropdown-item{
  background-color: rgba(56, 55, 55, 0.384) !important;
  color: black;
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size:2300px 1100px;
  position: relative;
  padding: 10px;
  margin: auto;
  background-position: center;
  background-attachment: fixed;
}

#nav{
   z-index:999;
    border-radius: 12px;
   position: fixed;
    width: 100%;
    color: #fcfcfc;
}

#nav a {
  font-weight: bold;
  color: #fcfcfc;
}
</style>
