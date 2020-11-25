import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        token: null
    },
    mutations: {
        setUser(state, user) {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;
                state.token = user.token
            }
        }
    },
    actions: {
        setUser({state, commit}) {
            let user = localStorage.getItem('user');
            if (!user && state.token == null) {
                return
            }
            user = JSON.parse(user);
            commit('setUser', user);
            return state.user
        }
    }
})