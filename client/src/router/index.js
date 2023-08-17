import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue';
import Login from '../views/Auth/Login.vue';
import Signup from '../views/Auth/Signup.vue';
import UserVerification from '../views/Auth/VerificationActivation.vue';
import VerificationAlert from '../views/Auth/VerificationAlert.vue'

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
		},
		{
			path: '/user/verify/alert',
			name: 'verificationAlert',
			component: VerificationAlert,
			meta: {
				title: VerificationAlert
			}
		},
		{
			path: '/user/verify/:id/:token',
			name: 'verifyemail',
			component: UserVerification,
			meta: {
				title: 'Email Verification'
			}
		}
	]
})

export default router;