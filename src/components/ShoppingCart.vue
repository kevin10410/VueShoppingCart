<template>
    <div class="shoppingCart">
        <p class="title">選購清單</p>
        <p>總共金額: {{totalPrice}}</p>
        <ul v-if="shoppingCart.length!==0" class="col-lg-9 col-md-9 col-sm-12 col-12">
            <li v-for="(item, index) in shoppingCart" :key="index">
              <img class="itemPic" :src="`http://a.ecimg.tw/${item.picB}`">
              <div class="itemInfo">
                <p>{{index+1}}. {{item.name}} x {{item.count}}</p>
                <p class="price">價格: {{item.price}} x {{item.count}} = {{item.price*item.count}} 元</p>
                <div class="modify">
                  <button class="btn btn-primary" @click="removeItem(index)">移除商品</button>
                  <!-- <button @click="modifyNum({item:item, index:index})">修改商品數量</button> -->
                  <label>選購商品數量:</label>
                  <select class="itemCounts" @input="modifyNum({item:item, index:index})" v-model="item.count">
                  <!-- <option selected disabled :value="0">選擇數量</option> -->
                    <option v-for="num in 9" :value="num" :key="num">{{num}}</option>
                  </select>
                </div>
              </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  methods: {
    removeItem(index) {
      this.$store.commit("removeItem", index);
    },
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
  mounted() {
    console.log(this.$store.state.shoppingCart);
  }
};
</script>
<style scoped>
.title {
  padding: 5px 0;
  font-weight: bold;
  font-size: 1.2rem;
}

ul {
  margin-top: 20px;
  padding: 20px 20px 10px 20px;
  background: cadetblue;
  border-radius: 10px;
}

li {
  list-style: none;
  border-radius: 5px;
  background: antiquewhite;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
}

.shoppingCart {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price {
  padding: 5px 0;
}

.itemPic {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.itemInfo {
  padding: 0 10px;
  width: calc(100% - 150px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modify {
  display: flex;
}

.itemCounts{
  margin-left: 10px;
}

label{
  margin-left: 10px;
  line-height: 38px;
}
</style>


