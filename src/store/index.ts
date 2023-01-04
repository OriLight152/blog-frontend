import { defineStore } from "pinia";

export const useStore = defineStore('main', {
  state: () => ({
    login: false,
    uid: 0,
    token: '',
    currentPage: '',
    likeCache: {
      POST: [] as string[],
      COMMENT: [] as string[]
    }
  }),
})