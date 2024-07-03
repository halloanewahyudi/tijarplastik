import { createPinia } from "pinia";
import { defineStore } from "pinia";
import axios from "axios";

const pinia = createPinia();

const useStore = defineStore("store", {
  state: () => ({
    data: [],
  }),
  actions: {
    async fetchData() {
      const response = await axios.get("https://https://sheetdb.io/api/v1/kkknsizl0rqyp");
      this.data = response.data;
    },
  },
});

export { pinia, useStore };
