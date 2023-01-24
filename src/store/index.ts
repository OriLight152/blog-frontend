import { defineStore } from "pinia";

export const useStore = defineStore('main', {
  state: () => ({
    login: false,
    uid: 0,
    token: '',
    isAdmin: false,
    currentPage: '',
    likeCache: {
      POST: [] as string[],
      COMMENT: [] as string[]
    },
    pageLoading: false,
    showSettingPanel: false,
    setting: {
      stickyTextarea: false
    }
  }),
})