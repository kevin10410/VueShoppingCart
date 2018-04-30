<template>
    <div class="header row justify-content-center">
        <div class="brandSelector col-lg-10 col-md-10 col-sm-10 col-10">
            <select v-model="brand" @change="changeBrand(brand)">
            <option selected>Apple</option>
            <option>Huawei</option>
            <option>Samsung</option>
            <option>Xiaomi</option>
        </select>
        </div>
        <div class="logo col-lg-10 col-md-10 col-sm-10 col-10" :style="{backgroundImage:`url(${logo})`}">
          <!-- <div class="shadow"></div> -->
        </div>
        <div class="pageSelector col-lg-10 col-md-10 col-sm-10 col-10">
            <button class="btn btn-default change" @click="changePage(selectPage - 1)"><i class="fas fa-caret-left"></i></button>
            <button class="btn btn-default pick" :class="{selectPage:selectPage==num}" v-if="num > previousPage" v-for="num in showingPage" :key="num" @click="changePage(num)">{{num}}</button>
            <button class="btn btn-default change" @click="changePage(selectPage + 1)"><i class="fas fa-caret-right"></i></button>
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
    return {
      brand: "Apple"
    };
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
    },
    currentBrand() {
      return this.$store.state.currentBrand;
    },
    logo() {
      return this.$store.getters.getLogo;
    }
  },
  components: {
    appSingleProduct: singleProduct
  },
  methods: {
    changePage(page) {
      if (0 < page && page <= 100) {
        this.getProductInfo(page);
      }
      console.log(this.previousPage);
      console.log(this.showingPage);
      console.log(this.selectPage);
    },
    changeBrand(brand) {
      this.$store.commit('selectBrand', brand);
      this.getProductInfo(1);
      console.log(brand);
    },
    getProductInfo(page) {
      this.$store.commit("loadingSwitch");
      let url = `https://cors-anywhere.herokuapp.com/http://ecshweb.pchome.com.tw/search/v3.3/all/results?q=${
        this.currentBrand
      }&page=${page}&sort=rnk/dc`;
      axios
        .get(url)
        .then(res => {
          if (res.status === 200) {
            this.$store.state.allProduct = res.data.prods;
            console.log(res);
            if (this.$store.state.currentType === "product") {
              this.$store.commit("goPage");
            }
            setTimeout(() => {
              if (page > this.showingPage) {
                this.$store.commit("nextTenPage");
              } else if (page <= this.previousPage) {
                this.$store.commit("prevTenPage");
              } else {
              }
              this.$store.commit("loadingSwitch");
              this.$store.commit("selectPage", page);
              this.$router.push(`/page/${page}`);
            }, 500);
          }
        })
        .catch(err => {
          console.log(err);
          this.$store.commit("loadingSwitch");
        });
    }
  },
  mounted() {
    this.brand = this.currentBrand;
    this.getProductInfo(this.selectPage);
  }
};
</script>

<style scoped>
.row {
  margin: 0;
}

.logo {
  /* background: brown; */
  height: 150px;
  /* background-image: url("https://images.apple.com/ac/ac-video-posterframe/1.0/images/ac-video-poster_848x480.jpg"); */
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-bottom: 5px;
  position: relative;
}

.shadow {
  width: calc(100% - 30px);
  border-radius: 10px;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
}

.pageSelector {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}

.pageSelector .btn {
  width: 35px;
  font-size: 1.2rem;
  margin: 5px;
  border: 1px solid black;
  outline: none;
  background: #ffffff;
  color: black;
  padding: 0;
  text-align: center;
}

.pageSelector .pick:hover {
  background-color: #f5f5f5;
  transition: background-color 0.2s linear;
}

.pageSelector .btn.selectPage {
  background: #e5e5e5;
}

.change {
  background-color: #f5f5f5;
  transition: background-color 0.2s linear;
}

.change:hover {
  background-color: #e5e5e5;
  transition: background-color 0.2s linear;
}

.productTable {
  display: flex;
  justify-content: center;
  width: 100%;
}

.productList {
  width: 80%;
  padding: 10px 0;
}

.brandSelector select {
  padding: 5px;
  border: none;
  outline: none;
  margin-bottom: 10px;
  width: 100%;
  border: 2px solid #eee;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-align: center;
  -webkit-appearance:none;
}

.brandSelector select option{
  width: 100%;
}
</style>
