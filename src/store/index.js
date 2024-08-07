import { createStore } from "vuex";
import api from "@/api";

export default createStore({
  state: {
    products: [],
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addProduct(state, product) {
      state.products = [...state.products, product];
    },
    updateProduct(state, updatedProduct) {
      state.products = state.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
    },
    deleteProduct(state, productId) {
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    clearUserData(state) {
      state.user = null;
      state.token = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await api.get("/products");
      commit("setProducts", response.data.products);
    },
    async addProduct({ commit }, product) {
      const response = await api.post("/products", product);
      const newProduct = response.data;
      commit("addProduct", newProduct);
      return newProduct;
    },
    async updateProduct({ commit }, product) {
      const response = await api.patch(`/products/${product.id}`, product);
      const updatedProduct = response.data;
      commit("updateProduct", updatedProduct);
      return updatedProduct;
    },
    async deleteProduct({ commit }, productId) {
      await api.delete(`/products/${productId}`);
      commit("deleteProduct", productId);
    },
    async login({ commit }, credentials) {
      const response = await api.post("/auth/login", credentials);
      const { user, token } = response.data;
      commit("setUser", user);
      commit("setToken", token);
    },
    async register({ commit }, credentials) {
      const response = await api.post("/auth/register", credentials);
      commit("setUser", response.data.user);
    },
    logout({ commit }) {
      commit("clearUserData");
    },
    initializeAuth({ commit, state }) {
      const token = state.token;
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    getUser(state) {
      return state.user;
    },
  },
});
