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
    setting: {
      stickyTextarea: false
    },
    showNav: true,
    showSettingPanel: false,
    showToolBarBtn: {
      top: false,
      bottom: false
    }
  }),
})