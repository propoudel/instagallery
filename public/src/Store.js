import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const Store = new Vuex.Store({
    plugins: [createPersistedState()],

    state: {
        tokens: {
            access_token: null,
            expires_in: null,
            refresh_token: null,
            token_type: null,
        },
        currentUser: {
            name: null,
            email: null,
        },
    },

    actions: {
        login(context, user) {

            return new Promise((resolve, reject) => {

                let data = {
                    client_id: 7,
                    client_secret: 'oQmIaz7EqzywrR8TWWPQMWufIJoiEEm6j3SQxPs5',
                    grant_type: 'password',
                    username: user.email,
                    password: user.password,
                };

                axios.post(API.login, data)
                    .then(response => {
                        let responseData = response.data
                        let now = Date.now()

                        responseData.expires_in = responseData.expires_in + now

                        context.commit('updateTokens', responseData)

                        resolve(response)
                    })
                    .catch(response => {
                        reject(response)
                    })
            })
        }
    },

    mutations: {
        updateTokens(state, tokens) {
            console.log('tokens',tokens)
            state.tokens = tokens
        },
    }

})

export default Store
