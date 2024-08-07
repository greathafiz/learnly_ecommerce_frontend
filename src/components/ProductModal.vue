<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg relative">
      <button
        @click="close"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">
        {{ product.name }}
      </h2>
      <p class="mb-4 text-gray-600">{{ product.description }}</p>
      <p class="text-lg font-semibold mb-4 text-blue-700">
        N{{ product.price }}
      </p>
      <img
        :src="product.imageURL"
        alt="Product image"
        class="w-full h-64 object-cover rounded-lg mb-4"
      />
      <button
        @click="close"
        class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition duration-300"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  product: Object,
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>
