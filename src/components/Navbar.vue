<template>
  <nav class="bg-blue-800 p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex space-x-6">
        <router-link
          to="/"
          class="text-white font-semibold hover:text-gray-200 transition duration-300"
          >Home</router-link
        >
        <router-link
          to="/products"
          class="text-white font-semibold hover:text-gray-200 transition duration-300"
          >Products</router-link
        >
      </div>
      <div>
        <button
          v-if="isAuthenticated"
          @click="logOut"
          class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Log Out
        </button>
        <button
          v-else
          @click="logIn"
          class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Log In
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const logIn = () => {
  router.push({ name: "Login" });
};

const logOut = () => {
  store.dispatch("logout");
};
</script>
