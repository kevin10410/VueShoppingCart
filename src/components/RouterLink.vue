<template>
    <transition name="fade">
    <div class="links row" v-if="currentType !== 'product'">
        <div class="offset-lg-1 offset-md-1 col-lg-5 col-md-5 col-sm-12 col-12">
            <p>|</p>
        <router-link 
        tag="button" 
        :to="`/page/${this.currentPage}`" 
        class="linkBtn"
        active-class="active"
        >產品列表
        </router-link>
        <p>|</p>
        </div>
        
        <div class="col-lg-5 col-md-5 col-sm-12 col-12">
            <p>|</p>
        <router-link 
        tag="button" 
        :to="'/cart'" 
        class="linkBtn"
        active-class="active"
        >購物車
        <span v-if="shoppingCart.length === 0"><i class="fas fa-shopping-cart"></i> ({{shoppingCart.length}})</span>
        <span v-else><i class="fas fa-cart-arrow-down"></i> ({{shoppingCart.length}})</span>
        </router-link>
        <p>|</p>
        </div>
        
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
  padding: 10px 0 5px 0;
  text-align: center;
  margin: 0;
}

.linkBtn {
  outline: none;
  margin: 0 10px;
  font-size: 1.2rem;
  outline: none;
  border: none;
  background: #ffffff;
  color: #9c9c9c;
  padding: 0 5px;
  width: 210px;
  height: 35px;
}

p {
  display: inline-block;
  color: #9c9c9c;
  font-size: 1.2rem;
}

.linkBtn:hover {
  color: #83521e;
}

.linkBtn.active {
  color: #83521e;
  background: #f1ede5;
  border-radius: 5px;
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
