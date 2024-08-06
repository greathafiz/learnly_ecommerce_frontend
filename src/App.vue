<script setup>
import { useToast } from "vue-toastification";
import { onMounted } from "vue";

onMounted(() => {
  const toast = useToast();

  toast("I am a toast");

  toast.success("My toast content", {
    timeout: 2000,
  });
});
</script>

<template>
  <h1 class="text-3xl">Hello World!</h1>
</template>
