<template>
    <div>
        <navbar></navbar>
        <alertmessage></alertmessage>
        <div class="container-fluid">
            <div class="row">
                <sidebar></sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
           
          <router-view></router-view>
        </main>
        </div>
     </div>
     </div>
</template>

<script>
import navbar from './navbar';
import sidebar from './sidebar';
import alertmessage from './pages/alertmessage';
export default {
  
 components: { 
     navbar,
     sidebar,
     alertmessage
 },

}
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

