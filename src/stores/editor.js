import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    content: '',
    lastChangeTimestamp: null,
    errors: [],
    line: 1,
    col: 1,
    tabSize: 2
  }),
  getters: {
    hasErrors: (state) => state.errors?.length > 0
  },
  actions: {
  }
})
