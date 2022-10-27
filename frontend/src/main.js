import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft, faPenToSquare, faPlus, faThumbsDown, faThumbsUp, faTrash, faGlobe, faPen } from '@fortawesome/free-solid-svg-icons'
import PostAuthentification from './components/Authentification.vue'
import PostCreate from './components/AddPost.vue'
import PostEdit from './components/EditPost.vue'
import PostList from './components/PostList.vue'
import UserSignUp from './components/SignUp.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false
 
const routes =
[
  {
    name: 'auth',
    path: '/',
    component: PostAuthentification
  },
  {
    name: 'PostCreate',
    path: '/create',
    component: PostCreate
  },
  {
    name: 'PostEdit',
    path: '/edit/:id',
    component: PostEdit
  },
 
  {
    name: 'PostList',
    path: '/posts',
    component: PostList
  },
  {
    name: 'UserSignUp',
    path: '/signup',
    component: UserSignUp
  },
];
 
const router = new VueRouter({ mode: 'history', routes: routes })

library.add(faPlus, faArrowLeft, faTrash, faPenToSquare, faThumbsUp, faThumbsDown, faGlobe, faPen)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  // init router
  router,
  render: h => h(App),
}).$mount('#app')