<template>
    <transition name="fade">
    <div class="links" v-if="currentType !== 'product'">
        <router-link 
        tag="button" 
        :to="`/page/${this.currentPage}`" 
        class="btn btn-primary"
        active-class="btn btn-success"
        >產品列表
        </router-link>
        
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
    </transition>
</template>
<script>
export default {
  computed: {
    shoppingCart() {
      return this.$store.state.shoppingCart;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
    currentType() {
      return this.$store.state.currentType;
    }
  }
};
</script>

<style scoped>
.links {
  padding: 15px 0;
  text-align: center;
}

.btn {
  outline: none;
  margin: 0 10px;
  font-size: 1rem;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  animation: fade-in 0.5s linear normal;
}

.fade-leave {
  /* opacity: 1; */
}

.fade-leave-active {
  animation: fade-out 0.5s linear normal;
  opacity: 0;
}

@keyframes fade-in {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    transform: translateY(0px);
    opacity: 1;
  }
  to {
    transform: translateY(10px);
    opacity: 0;
  }
}
</style>
