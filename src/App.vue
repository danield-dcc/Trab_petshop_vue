<template>
  <div id="app">
    
    <menu-principal :user="user"/>
    <router-view/>
  </div>
</template>

<script>
import MenuPrincipal from './components/MenuPrincipal'

export default {
  name: 'App',
  components: {
    MenuPrincipal
  },
  data(){
    return{
      user: null
    }
  },
  methods:{
    mudaUser(nome){
      this.user = nome
    }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

</style>
