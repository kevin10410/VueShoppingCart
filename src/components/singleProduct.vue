<template>
      <li class=" col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 product">
        <div class="box" :class="{selected:selected}">
          <div class="shadow" @click="detailPage(item)"></div>
          <div class="productInfo">
            <img class="productPic" :src="`http://a.ecimg.tw/${item.picB}`">
            <p class="productName">{{item.name}}</p>
            <p class="price">價格: {{item.originPrice}} 元</p>
          </div>
          <!-- <div class="buy">
              <select v-model="count">
                  <option v-for="(num, index) in 10" :value="index" :key="index">{{index}}</option>
              </select>
              <button v-if="!selected" @click="addToCar">加入購物車</button>
              <button v-else @click="modifyNum">修改商品數量</button>
          </div> -->
        </div>
    </li>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      
    };
  },
  computed: {
    selected() {
      return this.$store.state.shoppingCart.some(item => {
        return item.Id === this.item.Id;
      });
    }
  },
  methods: {
    detailPage(item) {
      this.$store.commit("goProduct");
      this.$store.commit("selectProduct", item);
      this.$router.push(`/products/${item.Id}`);
    }
  },
  // mounted() {
  //   if (this.selected) {
  //     let index = this.$store.state.shoppingCart
  //       .map(item => {
  //           console.log()
  //         return item.Id;
  //       })
  //       .indexOf(this.item.Id);
  //     this.count = this.$store.state.shoppingCart[index].count;
  //   }
  // }
};
</script>
<style scoped>
.product {
  padding: 10px;
  list-style: none;
  margin-top: 20px;
}

.box{
  height: calc(100% - 10px);
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ffffff;
  transform: scale(1.0,1.0);
  transition: background-color 0.2s linear, transform 0.2s linear;
  position: relative;
}

.box.selected .shadow {
  background-color: rgba(23, 105, 229, 0.1);
}

.shadow {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
}

.shadow:hover {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s linear, transform 0.2s linear;
}

.productInfo {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.productName {
  font-size: 1rem;
  margin: 10px 0 ;
  text-align: center;
}

.productPic {
  width: 60%;
  height: auto;
  margin: 5px 0;
}

.price {
  padding: 5px 0;
  font-size: 1rem;
}

.buy {
  padding: 10px 0;
}
</style>

