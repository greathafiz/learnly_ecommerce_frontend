<template>
  <footer class="bg-blue-800 p-6 mt-10 shadow-lg">
    <div class="container mx-auto text-center">
      <div class="flex justify-center space-x-6 mb-4">
        <router-link
          to="/about"
          class="text-white font-semibold hover:text-gray-200 transition duration-300"
          >About</router-link
        >
        <router-link
          to="/contact"
          class="text-white font-semibold hover:text-gray-200 transition duration-300"
          >Contact</router-link
        >
        <router-link
          to="/privacy-policy"
          class="text-white font-semibold hover:text-gray-200 transition duration-300"
          >Privacy Policy</router-link
        >
      </div>
      <div class="text-gray-400">
        &copy; {{ currentYear }} Abdul-Hafiz. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>
