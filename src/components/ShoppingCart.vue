<template>
    <div class="shoppingCart">
        <p class="title">選購清單</p>
        <p >總計: <span class="total">NT$ {{totalPrice}}</span></p>
        <div class="row justify-content-center">
          <ul v-if="shoppingCart.length!==0" class="col-lg-10 col-md-10 col-sm-10 col-10">
            <app-shopping-item v-for="(item, index) in shoppingCart" :key="index" :item="item" :index="index"></app-shopping-item>
          </ul>
        </div>
    </div>
</template>
<script>
import ShoppingItem from "./ShoppingItem.vue";
export default {
  methods: {
    modifyNum(obj) {
      this.$store.commit("replaceItem", { item: obj.item, index: obj.index });
    }
  },
  computed: {
    shoppingCart() {
      return this.$store.state.shoppingCart;
      console.log(this.$store.state.shoppingCart);
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  },
  components: {
    appShoppingItem: ShoppingItem
  }
};
</script>
<style scoped>
.row{
  margin: 0;
}

.shoppingCart {
  text-align: center;
}
.title {
  padding: 5px 0;
  font-weight: bold;
  font-size: 1.2rem;
}

.total {
  color: #c14948;
  font-size: 1.2rem;
}

ul {
  margin-top: 20px;
  padding: 0 0 10px 0;
}
</style>


