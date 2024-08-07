<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6"
  >
    <h1 class="text-4xl font-bold text-gray-800 mb-6">
      Welcome to The Ecom App
    </h1>
    <div class="flex flex-col gap-4">
      <router-link to="/products">
        <button
          class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          View Products
        </button>
      </router-link>
      <router-link to="/login">
        <button
          class="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </router-link>
    </div>
  </div>
</template>
