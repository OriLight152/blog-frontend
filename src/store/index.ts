import { defineStore } from "pinia";

export const useStore = defineStore('main', {
  state: () => ({
    login: false,
    networkLoading: false,
    devMode: false,
    uid: 0,
    token: '',
    currentPage: ''
  }),
})