<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <h1 class="text-2xl">Welcome to The Ecom App</h1>
    <div class="flex flex-col justify-between items-center mt-4">
      <div class="flex-col flex items-center justify-center">
        <router-link to="/products"
          ><button
            class="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500"
          >
            View Products
          </button></router-link
        >
        <router-link to="/login"
          ><button
            class="bg-blue-400 text-white py-2 px-4 mt-2 rounded hover:bg-blue-500"
          >
            Login
          </button></router-link
        >
      </div>
    </div>
  </div>
</template>
