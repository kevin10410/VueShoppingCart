<template>
    <div v-if="currentProduct.Id !== undefined">
        <div class="detail row justify-content-center">
            <div class="detailInfo col-lg-10 col-md-10 col-sm-10 col-10">
                <div class="links">
                  <button class="return" @click="listPage"><i class="fas fa-caret-left"></i> 返回列表</button>
                  <button class="return" @click="cartPage">前往結帳 <i class="fas fa-caret-right"></i></button>
                </div>
                <div class="row">
                    <div class="picBox col-lg-3 col-md-4 col-sm-12 col-12">
                        <img class="pic" :src="`http://a.ecimg.tw/${currentProduct.picB}`">
                </div>
                <div class="infoBox col-lg-9 col-md-8 col-sm-12 col-12">
                    <div class="info">
                        <p class="name">{{currentProduct.name}}</p>
                        <p class="Id">產品型號: {{currentProduct.Id}}</p>
                        <p class="describe" v-html="describe"></p>
                    </div>
                    <div class="cart">
                        <p class="price">
                            <span>NT$</span>{{currentProduct.price}}
                        </p>
                        <div class="counter">
                            <label>數量</label>
                            <div class="numButton" @click="minus">-</div>
                            <div class="currentCount">{{ count }}</div>
                            <div class="numButton" @click="add">+</div>
                        </div>
                    </div>
                    <div class="shoppingCart">
                      <button class="buy" @click="addToShoppingCart(currentProduct)">加入購物車 <div class="cartIcon"><i class="fas fa-cart-arrow-down"></i></div></button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      count: 1
    };
  },
  methods: {
    listPage() {
      this.$router.push(`/page/${this.currentPage}`);
    },
    cartPage() {
      let vm = this;
      setTimeout(() => {
        vm.$store.commit("goPage");
      }, 500);
      this.$router.push(`/cart`);
    },
    add() {
      if (this.count < 10) {
        this.count++;
      }
    },
    minus() {
      if (this.count > 1) {
        this.count--;
      }
    },
    addToShoppingCart(currentProduct) {
      let index = this.$store.state.shoppingCart
        .map(item => {
          return item.Id;
        })
        .indexOf(currentProduct.Id);
      if (index !== -1) {
        // let check = this.$store.state.shoppingCart.some(item => {
        //   return item.id === this.item.Id;
        // });
        // if (check) {

        //   console.log(index);
        this.$store.commit("replaceItem", { item: this.toBuy, index: index });
        window.alert("已修改商品數量!");
      } else {
        this.$store.commit("addItem", this.toBuy);
        window.alert("加入購物車成功!");
      }
    }
  },
  computed: {
    currentPage() {
      console.log(this.$store.state.currentPage);
      return this.$store.state.currentPage;
    },
    currentProduct() {
      return this.$store.state.currentProduct;
    },
    toBuy() {
      let buying = this.currentProduct;
      buying.count = this.count;
      return buying;
    },
    describe() {
      return this.$store.state.currentProduct.describe; //.replace(/↵/, "<br/>");
    }
  },
  mounted() {
    if(this.currentProduct.Id === undefined) {
      this.$router.push(`/page/1`);
    } else {
      window.scrollTo(0, 0);
    }
    // console.log(document.body.scrollTop);
    // document.body.scrollTop = 0;
  }
};
</script>
<style scoped>
.detail {
  padding: 10px 0;
  margin: 0;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.return {
  font-size: 1.2rem;
  outline: none;
  border: none;
  background: #ffffff;
  color: #9c9c9c;
  cursor: pointer;
  margin: 5px 0;
}

.return:hover {
  color: #83521e;
}

.pic {
  border: 1px solid #eee;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.infoBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
}

p {
  color: #666;
}

.name {
  border-top: 1px solid #eee;
  padding-top: 10px;
  font-weight: bolder;
}

.Id {
  font-size: 0.9rem;
  color: #9c9c9c;
}

.price {
  font-size: 2rem;
  line-height: 1;
  color: #ea0000;
  font-weight: bolder;
}

.price span {
  font-size: 1.2rem;
  vertical-align: top;
  margin-right: 5px;
}

.cart {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}

.counter {
  display: flex;
  align-content: center;
  align-items: center;
  margin-left: 20px;
}

.counter label {
  margin-right: 10px;
  color: #666;
}

.numButton {
  width: 25px;
  padding: 4px 6.5px;
  border: 1px solid #ccc;
  background: #eee;
  color: #666;
  cursor: pointer;
}

.numButton:hover {
  background: #fff;
}

.currentCount {
  padding: 4px 0;
  width: 40px;
  text-align: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.shoppingCart {
  margin-top: 10px;
  text-align: end;
}

.shoppingCart button {
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 5px 50px;
  background: #5d3b25;
  color: #fff;
}

.buy {
  cursor: pointer;
}

.cartIcon {
  display: inline-block;
  color: #5d3b25;
  transform: translateX(50px);
  transition: color 0.25s linear, transform 0.25s linear;
}

.shoppingCart button:hover .cartIcon {
  color: #fff;
  transform: translateX(0px);
  transition: color 0.15s linear, transform 0.15s linear;
}

.describe {
  white-space: pre-wrap;
  font-size: 0.8rem;
  color: #a6917f;
}
</style>


