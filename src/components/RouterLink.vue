<template>
    <div class="links">
        <router-link 
        tag="button" 
        :to="'/'" 
        class="btn btn-primary"
        active-class="btn btn-success"
        exact
        >產品列表</router-link>
        <router-link 
        tag="button" 
        :to="'/cart'" 
        class="btn btn-primary"
        active-class="btn btn-success"
        >進入購物車
        <span v-if="shoppingCart.length === 0"><i class="fas fa-shopping-cart"></i></span>
        <span v-else><i class="fas fa-cart-arrow-down"></i> ({{shoppingCart.length}})</span>
        </router-link>
    </div>
</template>
<script>
export default {
  computed:{
      shoppingCart() {
          return this.$store.state.shoppingCart
      }
  }
}
</script>

<style scoped>
    .links{
        padding: 15px 0;
        text-align: center;
    }

    .btn{
        outline: none;
        margin: 0 10px;
    }
</style>
