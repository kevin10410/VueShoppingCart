import Products from '../components/Products.vue';
import Detail from '../components/Detail.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

export const routes = [
    { path: '/', redirect: '/VueShoppingCart/page/1'},
    { path: '/VueShoppingCart/page/:id', component: Products},
    { path: '/VueShoppingCart/products/:id', component: Detail},
    { path: '/VueShoppingCart/cart', component: ShoppingCart},
]