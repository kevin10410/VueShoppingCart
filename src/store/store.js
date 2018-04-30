import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        allProduct: [],
        shoppingCart: [],
        currentPage: 1,
        previousPage: 0,
        showingPage: 10,
        loading: false,
        currentType:'page',
        currentProduct:{},
        currentBrand:'Apple',
        logos:{
            Apple:'https://images.apple.com/ac/ac-video-posterframe/1.0/images/ac-video-poster_848x480.jpg',
            Samsung:'https://www.androidcentral.com/sites/androidcentral.com/files/topic_images/2014/Samsung-Logo.jpg',
            Xiaomi:'http://global.mifile.cn/webfile/globalimg/zh/2014/about/about_index_01.jpg',
            Huawei:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpUzpbRwdE1DHcnnll159c7tZmDS968IYmGdCLwJAyMTgkDAXi',
        }
    },
    getters: {
        totalPrice: state => {
            return state.shoppingCart.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue.price * currentValue.count;
            }, 0);
        },
        getCurrentDetail: state => {
            return state.currentProduct;
        },
        getLogo: state => {
            return state.logos[state.currentBrand]
        }
    },
    mutations: {
        addItem: (state, item) => {
            state.shoppingCart.push(item);
        },
        replaceItem: (state, item) => {
            console.log('item', item.item)
            console.log('index', item.index)
            state.shoppingCart.splice(item.index, 1, item.item)
        },
        removeItem: (state, index) => {
            state.shoppingCart.splice(index, 1)
        },
        selectPage: (state, pageNum) => {
            state.currentPage = pageNum;
        },
        loadingSwitch: state => {
            state.loading = !state.loading;
        },
        nextTenPage: state => {
            if (state.showingPage < 100) {
                state.previousPage += 10;
                state.showingPage += 10;
            }
        },
        prevTenPage: state => {
            if (state.showingPage > 10) {
                state.previousPage -= 10;
                state.showingPage -= 10;
            }
        },
        toFirstPage: state => {
            state.currentPage = 1;
            state.previousPage = 0;
            state.showingPage = 10;
        },
        toLastPage: state => {
            state.currentPage = 100;
            state.previousPage = 90;
            state.showingPage = 100;
        },
        goPage: state => {
            state.currentType = 'page';
        },
        goProduct: state => {
            state.currentType = 'product';
        }, 
        selectProduct: (state, item) => {
            console.log('item', item)
            state.currentProduct = item;
            console.log(state.currentProduct);
        },
        selectBrand:(state, brand) => {
            state.currentBrand = brand;
        }
    },
    actions: {
        addItem: ({ commit }, item) => {
            commit('addItem', item)
        },
        replaceItem: ({ commit }, item, index) => {
            commit('replaceItem', item, index)
        },
        removeItem: ({ commit }, index) => {
            commit('removeItem', index)
        },
        selectPage: ({ commit }, pageNum) => {
            commit('selectPage', pageNum)
        },
        loadingSwitch: ({ commit }) => {
            commit('loadingSwitch')
        },
        nextTenPage: ({ commit }) => {
            commit('nextTenPage')
        },
        prevTenPage: ({ commit }) => {
            commit('prevTenPage')
        },
        toFirstPage: ({ commit }) => {
            commit('toFirstPage')
        },
        toLastPage: ({ commit }) => {
            commit('toLastPage')
        },
        goPage: ({ commit }) => {
            commit('goPage')
        },
        goProduct: ({ commit }) => {
            commit('goProduct')
        },
        selectProduct: ({commit}, item) => {
            commit('selectProduct', item)
        },
        selectBrand: ({commit}, brand) => {
            commit('selectBrand', brand)
        }
    }
})