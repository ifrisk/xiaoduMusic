import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import("@/views/Home/home.vue");
const Search = () => import("@/views/Search/search.vue");
const Mv = () => import("@/views/Mv/Mv.vue");

const routes = [
	{
		path: '/',
		redirect: '/home'
	},
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
	{
	  path: '/search/:keywords',
	  name: 'search',
	  component: Search
	},
	{
	  path: '/mv/:id',
	  name: 'mv',
	  component: Mv
	}
]

const router = new VueRouter({
  routes
})

export default router
