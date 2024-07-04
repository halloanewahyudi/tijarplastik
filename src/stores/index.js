import { defineStore } from 'pinia'
import axios from 'axios'

export const useSheetDBStore = defineStore('sheetdb', {
  state: () => ({
    data: [],
    categories: [],
    search: '',
    page: 1,
    perPage: 10,
  }),
  getters: {
    filteredData: (state) => {
      return state.data.filter((item) => {
        return item.category.includes(state.search) || item.name.includes(state.search)
      })
    },
    paginatedData: (state) => {
      const start = (state.page - 1) * state.perPage
      const end = start + state.perPage
      return state.filteredData.slice(start, end)
    },
  },
  actions: {
    async fetchData() {
      const response = await axios.get('https://sheetdb.io/api/v1/kkknsizl0rqyp')
      this.data = response.data
    },
    async fetchCategories() {
      const response = await axios.get('https://sheetdb.io/api/v1/kkknsizl0rqyp/categories')
      this.categories = response.data
    },
    setSearch(search) {
      this.search = search
    },
    setPage(page) {
      this.page = page
    },
    setPerPage(perPage) {
      this.perPage = perPage
    },
  },
})

