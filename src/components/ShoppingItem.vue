<template>
  <li class="row">
    <div class="productName col-lg-6 col-md-12 col-sm-12">
        <p class="title">商品名稱</p>
        <img class="itemPic" :src="`http://a.ecimg.tw/${item.picB}`">
        <p class="describe">
            {{item.Id}} <br>
            {{item.name}}
            </p>
    </div>  
    <div class="itemInfo col-lg-6 col-md-12 col-sm-12">
        <div class="row counts">
            <div class="shoppingBox col-lg-6 col-md-6 col-sm-6">
                <div class="info">
                    <p class="title">單價</p>
                    <p class="detail price">NT$ <span>{{item.price}}</span></p>
                </div>
                <div class="info">
                    <p class="title">數量</p>
                    <div class="counter">
                            <div class="numButton" @click="minus">-</div>
                            <div class="currentCount">{{ amount }}</div>
                            <div class="numButton" @click="add">+</div>
                    </div>
                </div>
            </div>
            <div class="shoppingBox col-lg-6 col-md-6 col-sm-6">
                <div class="info">
                    <p class="title">小計</p>
                    <p class="detail total">NT$ <span>{{item.price * amount}}</span></p>
                </div>
                <div class="info">
                    <p class="title">刪除</p>
                    <p class="detail"><span class="delete" @click="deleteItem"><i class="fas fa-trash-alt fa-2x"></i></span></p>
                </div>
            </div>
        </div>
    </div>
  </li>
</template>
<script>
export default {
  props: ["item", "index"],
  data() {
    return {
      amount: 0
    };
  },
  computed: {},
  methods: {
    removeItem(index) {
      this.$store.commit("removeItem", index);
    },
    modifyNum() {
      this.item.count = this.amount;
      this.$store.commit("replaceItem", {
        item: this.item,
        index: this.index
      });
    },
    add() {
      if (this.amount < 10) {
        this.amount++;
        this.modifyNum();
      }
    },
    minus() {
      if (this.amount > 1) {
        this.amount--;
        this.modifyNum();
      }
    },
    deleteItem() {
      this.$store.commit("removeItem", this.index);
    },
  },
  mounted() {
    this.amount = this.item.count;
  }
};
</script>
<style scoped>
li {
  list-style: none;
  margin-bottom: 10px;
  display: flex;
  border: 1px #eee solid;
}

.productName {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: #686868;
  padding: 0 10px 10px 10px;
}

.describe {
  padding: 0 10px;
  width: calc(100% - 150px);
  text-align: left;
}

.title {
  /* display: block; */
  font-size: 0.8rem;
  color: #686868;
  padding: 5px 0;
  margin-bottom: 10px;
  width: 100%;
  align-self: flex-start;
  border-bottom: 1px #eee solid;
}

.counts {
  margin: 0;
  height: 100%;
}

.shoppingBox {
  min-height: 75px;
  display: flex;
  padding: 0;
}

.info {
  width: 50%;
  /* border: 1px #eee solid; */
  padding: 0 10px;
}

.shoppingCart {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail {
  font-size: 0.8rem;
  color: #686868;
  height: calc(100% - 39px);
  min-height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
}

.total {
  color: #83521e;
}

.price span {
  margin-left: 5px;
}

.counter {
  display: flex;
    height: calc(100% - 39px);
    justify-content: center;
    align-content: center;
    align-items: center;
    padding-bottom: 10px;
}

.numButton {
  padding: 4px 4.5px;
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

.itemPic {
  width: 150px;
  height: 150px;
  object-fit: contain;
  border: 1px #eee solid;
}

.itemInfo {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.delete {
    cursor: pointer;
    color: #ccc;
}

.delete:hover{
    color: #686868
}
</style>

