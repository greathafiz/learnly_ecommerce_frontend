<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
      <h1 class="text-5xl font-bold text-red-600 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Not Found</h2>
      <p class="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <router-link
        to="/"
        class="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Go to Homepage
      </router-link>
    </div>
  </div>
</template>
