<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const user = ref({});

const fetchUserInfo = async () => {
  try {
    const response = await axios.get("/profile", {
      withCredentials: true,
    });
    user.value = response.data.info.user || { name: "Guest" };
    console.log(response.data);
  } catch (error) {
    user.name = "Guest";
    console.error("Failed to fetch user info:", error);
  }
};

const exportData = async () => {
  try {
    const response = await axios.get("/export", {
      withCredentials: true,
    });
    console.log(response);
  } catch (error) {
    console.error("Failed to export data:", error);
  }
};

onMounted(fetchUserInfo);
</script>

<template>
  <main class="p-6">
    <h1 class="mb-4 text-3xl font-bold">Data</h1>
    <ul class="space-y-3 unstyled">
      <li>{{ user.name }}</li>
      <li>{{ user.last_name }}</li>
      <li>{{ user.email }}</li>
      <li>{{ user.selected_course }}</li>
      <li>{{ user.phone_number }}</li>
    </ul>
    <form @submit.prevent="exportData">
      <button
        class="px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        type="submit"
      >
        Export
      </button>
    </form>
  </main>
</template>
