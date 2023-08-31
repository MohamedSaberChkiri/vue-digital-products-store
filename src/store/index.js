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
  actions :{
    initializeStore({ commit }) {
      const authToken = localStorage.getItem('authToken'); // Read the token from localStorage
      if (authToken) {
        commit('setAuthToken', authToken); // Initialize the store with the token
      }
    },
  },
  
});

export default store;
