<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
      <form @submit.prevent="login" class="space-y-6">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="bg-blue-600 text-white py-3 px-4 rounded-lg w-full hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <p class="text-center mt-4 text-gray-600">
          Don't have an account?
          <router-link to="/register" class="text-blue-600 hover:underline">
            Register here
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = useStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
  try {
    await store.dispatch("login", {
      email: email.value,
      password: password.value,
    });

    router.push({ name: "ProductList" });
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error(error.response.data);
    }
    console.error(error.response.data);
  } finally {
    (email.value = ""), (password.value = "");
  }
};
</script>
