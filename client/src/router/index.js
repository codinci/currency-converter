import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue';
import Login from '../views/Auth/Login.vue';
import Signup from '../views/Auth/Signup.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				title: 'Home',
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				title: 'Login',
			}
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup,
			meta: {
				title: 'SignUp',
			}
		},
		{
			path: '/profile',
			name: 'profile',
			component: Profile,
			meta: {
				title: 'Profile',
			}
		}
	]
})

export default router;