import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Products from '../views/Products.vue';
import AddProduct from '../views/AddProduct.vue';
import EditProduct from '../views/EditProduct.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Products',
    component: Products,
  },
  {
    path: '/add',
    name: 'AddProduct',
    component: AddProduct,
  },
  {
    path: '/edit/:id',
    name: 'EditProduct',
    component: EditProduct,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;