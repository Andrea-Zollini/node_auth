<script setup>
import { RouterView } from "vue-router";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
</script>

<template>
  <RouterView />
</template>
