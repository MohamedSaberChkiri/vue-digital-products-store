import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      authToken: null,
    };
  },
  mutations: {
    setAuthToken(state, token) {
      state.authToken = token;
    },
  },
  getters: {
    authToken: (state) => state.authToken,
    isAuthenticated: (state) => !!state.authToken, // New getter for authentication check
  },
});

export default store;
