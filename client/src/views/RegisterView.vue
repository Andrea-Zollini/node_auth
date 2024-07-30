<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const options = ["Vue.js", "React", "MongoDB", "Node.js"];

const router = useRouter();

const form = reactive({
  name: "",
  last_name: "",
  phone_number: "",
  email: "",
  password: "",
  selected_course: "",
});

const message = ref("");

const submit = async () => {
  try {
    const response = await axios.post("/register", {
      name: form.name,
      last_name: form.last_name,
      phone_number: form.phone_number,
      email: form.email,
      password: form.password,
      selected_course: form.selected_course,
    });
    router.push({ name: "home" });
    if (response.status === 200) {
      message.value = "Registrazione effettuata con successo!";
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      message.value = error.response.data.errors.map((e) => e.msg).join(", ");
    } else {
      message.value = "Errore sconosciuto";
    }
  }
};
</script>

<template>
  <div
    class="flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900"
      >
        Effettua la registrazione
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
        <form class="space-y-6" @submit.prevent="submit">
          <!-- Corso -->
          <div>
            <label
              for="selected_course"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Corso</label
            >
            <select
              id="selected_course"
              name="selected_course"
              v-model="form.selected_course"
              class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="" :selected="form.selected_course == ''" disabled>
                -- Scegli un Corso --
              </option>
              <option v-for="option in options" :value="option">
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Nome -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Nome
            </label>
            <div class="mt-2">
              <input
                id="name"
                v-model="form.name"
                name="name"
                type="text"
                autocomplete="name"
                required=""
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <!-- Cognome -->
          <div>
            <label
              for="last_name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Cognome
            </label>
            <div class="mt-2">
              <input
                v-model="form.last_name"
                id="last_name"
                name="last_name"
                type="text"
                autocomplete="last_name"
                required=""
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <!-- Numero di telefono -->
          <div>
            <label
              for="phone_number"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Numero di telefono
            </label>
            <div class="mt-2">
              <input
                v-model="form.phone_number"
                id="phone_number"
                name="phone_number"
                type="text"
                autocomplete="phone_number"
                required=""
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email
            </label>
            <div class="mt-2">
              <input
                v-model="form.email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                v-model="form.password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Registrati
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
