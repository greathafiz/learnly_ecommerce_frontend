<template>
  <div>
    <NavBar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>
