import Products from '../components/Products.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

export const routes = [
    { path: '/', component: Products},
    { path: '/cart', component: ShoppingCart},
]