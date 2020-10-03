<template>
  <div id="app">
    
  <router-view></router-view>
 
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
   components: {
    HelloWorld
  },
  
  created(){
    const api='https://vue-course-api.hexschool.io/api/brian92292/products';
    this.$http.get(api).then((response) => {
    console.log(response.data)
})
  }
}
</script>

<style lang="scss">
@import "/assets/all";
</style>
