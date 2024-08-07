<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Login</h1>
    <form @submit.prevent="login" class="space-y-4">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="p-2 border border-gray-300 rounded w-full"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="p-2 border border-gray-300 rounded w-full"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
      >
        Login
      </button>
    </form>
    <p class="mt-4">
      Don't have an account?
      <router-link to="/register" class="text-blue-500 hover:underline"
        >Register here</router-link
      >
    </p>
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
