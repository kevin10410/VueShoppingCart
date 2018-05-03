import Products from '../components/Products.vue';
import Detail from '../components/Detail.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

export const routes = [
    { path: '*', redirect: '/page/1'},
    { path: '/page/:id', component: Products},
    { path: '/products/:id', component: Detail},
    { path: '/cart', component: ShoppingCart},
]