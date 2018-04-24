<template>
      <li class="col-lg-3 col-md-6 col-sm-12 col-12 product" :class="{selected:selected}">
        <div class="productInfo">
            <p class="productName">{{item.name}}</p>
            <img class="productPic" :src="`http://a.ecimg.tw/${item.picB}`">
            <p class="price">價格: {{item.originPrice}} 元</p>
        </div>
        <div class="buy">
            <select v-model="count">
                <!-- <option selected disabled :value="0">選擇數量</option> -->
                <option v-for="(num, index) in 10" :value="index" :key="index">{{index}}</option>
            </select>
            <button v-if="!selected" @click="addToCar">加入購物車</button>
            <button v-else @click="modifyNum">修改商品數量</button>
        </div>
    </li>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      count: 0,

    };
  },
  computed: {
    selected() {
      return this.$store.state.shoppingCart.some(item => {
        return item.Id === this.item.Id;
      });
    },
    toBuy() {
        let buying = this.item;
        buying.count = this.count;
        return buying
    }
  },
  methods: {
    addToCar() {
      if (this.count !== 0) {
        // console.log(this.count);
        // console.log(this.item);
        console.log(this.toBuy)
        this.$store.commit("addItem", this.toBuy);
      }
    },
    modifyNum() {
        let index = this.$store.state.shoppingCart
            .map(item => {
              return item.Id;
            })
            .indexOf(this.item.Id);
        if (this.count !==0) {
        // let check = this.$store.state.shoppingCart.some(item => {
        //   return item.id === this.item.Id;
        // });
        // if (check) {
          
          //   console.log(index);
            this.$store.commit("replaceItem", { item: this.toBuy, index: index });
        } else {
            this.$store.commit('removeItem', index);
        }
    }
  },
  mounted() {
    if (this.selected) {
      let index = this.$store.state.shoppingCart
        .map(item => {
            console.log()
          return item.Id;
        })
        .indexOf(this.item.Id);
      this.count = this.$store.state.shoppingCart[index].count;
    }
  }
};
</script>
<style scoped>
.product {
  border: 1px solid black;
  padding: 10px;
  list-style: none;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff7dd;
  border-radius: 10px;
}
.product.selected {
  background: #ffc3c3;
}

.productInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.productName {
  font-size: 0.8rem;
  height: 55px;
  text-align: center;
}

.productPic {
  width: 150px;
  height: 150px;
}

.price {
  padding: 5px 0;
}

.buy {
  padding: 10px 0;
}
</style>

