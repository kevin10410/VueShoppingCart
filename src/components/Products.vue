<template>
    <div class="header">
        <div class="pageSelector">
            <button class="btn btn-default" @click="changePage(selectPage - 1)"><i class="fas fa-caret-left"></i></button>
            <button class="btn btn-default" :class="{selectPage:selectPage==num}" v-if="num > previousPage" v-for="num in showingPage" :key="num" @click="changePage(num)">{{num}}</button>
            <button class="btn btn-default" @click="changePage(selectPage + 1)"><i class="fas fa-caret-right"></i></button>
        </div>
        <div class="productTable">
            <ul class="row productList">  
                <app-single-product  
                v-for="(item) in productList" 
                :key="item.Id" :item="item"></app-single-product>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import singleProduct from "./singleProduct";
export default {
  data() {
    return {};
  },
  computed: {
    productList() {
      return this.$store.state.allProduct;
    },
    selectPage() {
      return this.$store.state.currentPage;
    },
    previousPage() {
      return this.$store.state.previousPage;
    },
    showingPage() {
      return this.$store.state.showingPage;
    }
  },
  components: {
    appSingleProduct: singleProduct
  },
  methods: {
    changePage(page) {
      if (page > 0 && page < 100) {
        this.getProductInfo(page);
      }
      console.log(this.previousPage);
      console.log(this.showingPage);
      console.log(this.selectPage);
    },
    getProductInfo(page) {
      this.$store.commit("loadingSwitch");
      let url = `https://cors-anywhere.herokuapp.com/http://ecshweb.pchome.com.tw/search/v3.3/all/results?q=Apple&page=${page}&sort=rnk/dc`;
      axios
        .get(url)
        .then(res => {
          this.$store.state.allProduct = res.data.prods;
          console.log(this.$store.state.allProduct);
          setTimeout(() => {
            if (page > this.showingPage) {
              this.$store.commit("nextTenPage");
            } else if (page <= this.previousPage) {
              this.$store.commit("prevTenPage");
            } else {
            }
            this.$store.commit("loadingSwitch");
            this.$store.commit("selectPage", page);
          }, 500);
        })
        .catch(err => {
          console.log(err);
          this.$store.commit("loadingSwitch");
        });
    }
  },
  mounted() {
    this.getProductInfo(this.selectPage);
  }
};
</script>

<style scoped>
.pageSelector {
  text-align: center;
}

.pageSelector .btn {
  width: 45px;
  margin: 0 5px;
  border: 1px solid black;
}

.pageSelector .btn:hover {
  background: aqua;
}

.pageSelector .btn.selectPage {
  background: aqua;
}

.productTable {
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.productList {
  width: 80%;
}
</style>
