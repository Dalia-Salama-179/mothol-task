import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Login from "../pages/Login";
import users from "../pages/users";

Vue.use(Router);

const authGuard = (to, from, next) => {
    store.dispatch('setUser')
        .then(user => {
            if (user) {
                next()
            } else {
                next('/login')
            }
        })
}

const guestGuard = (to, from, next) => {
    store.dispatch('setUser')
        .then(user => {
            if (!user) {
                next()
            } else {
                next('/')
            }
        })
};
export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/login',
            component: Login,
            beforeEnter: guestGuard
        },{
            path: '/users',
            component: users,
            beforeEnter: authGuard
        },
    ]
})