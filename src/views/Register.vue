<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Register</h1>
    <form @submit.prevent="register" class="space-y-4">
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        required
        class="p-2 border border-gray-300 rounded w-full"
      />
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
        Register
      </button>
    </form>
    <div v-if="errorMessage" class="mt-4 text-red-500">
      {{ errorMessage }}
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
const username = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");

const register = async () => {
  try {
    await store.dispatch("register", {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    router.push({ name: "Login" });
  } catch (error) {
    if (error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error(error.response.data);
    }
    console.error(error.response.data);
    console.error("An error was encountered while registering:", error);
  }
};
</script>
