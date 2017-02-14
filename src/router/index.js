import Vue from 'vue';
import Router from 'vue-router';
import Seller from 'components/seller/seller.vue';
import Goods from 'components/goods/goods.vue';
import Ratings from 'components/ratings/ratings.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/goods'
        },
        {
            path: '/seller',
            name: 'seller',
            component: Seller
        },
        {
            path: '/goods',
            name: 'goods',
            component: Goods
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: Ratings
        }
    ],
    linkActiveClass: 'active'
});
