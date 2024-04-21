import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CategoryView from '../views/CategoryView.vue';
import FolderView from '../views/FolderView.vue';
import ErrorView from '../views/ErrorViews/ErrorView.vue';
import { getFolderList, isFolder } from '@/components/isFolder';
import { getCategoryList, isCategory } from '@/components/isCategory';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category/:categoryName',
      name: 'category',
      component: CategoryView,
      beforeEnter: (to, from, next) => {
        const categories = getCategoryList();
        if (isCategory(to.params.categoryName as string, categories)) {
          next();
        } else {
          next({ name: 'error' });
        }
      }
    },
    {
      path: '/category/:categoryName/folder/:folderName',
      name: 'folder',
      component: FolderView,
      beforeEnter: (to, from, next) => {
        const categoryNameParam = to.params.categoryName as string;
        const folderNameParam = to.params.folderName as string;
        const categories = getCategoryList();

        try {
          const folders = getFolderList(categoryNameParam);
          if (isCategory(categoryNameParam, categories) && isFolder(folderNameParam, folders)) {
            next();
          } else if (!isFolder(folderNameParam, folders)) {
            next({ name: 'error' });
          } else if (!isCategory(categoryNameParam, categories)) {
            next({ name: 'error' });
          }
        } catch (error) {
          next({ name: 'error' });
        }
      }
    },
    {
      path: '/:catchAll(.*)*',
      name: 'error',
      component: ErrorView
    }
  ]
});

export default router;
