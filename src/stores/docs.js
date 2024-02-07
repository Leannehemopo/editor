import { defineStore } from 'pinia'
import { find } from 'lodash-es'
import { DateTime } from 'luxon'

export const useDocsStore = defineStore('docs', {
  state: () => ({
    opened: [],
    active: null
  }),
  getters: {
    activeDocument (state) {
      return state.active ? find(state.opened, ['id', state.active]) : {}
    }
  },
  actions: {
    async loadDocument (doc = {}) {
      const docId = crypto.randomUUID()
      this.opened.push({
        id: docId,
        type: doc.type ?? 'xml',
        path: doc.path ?? '',
        fileName: doc.fileName ?? 'untitled-draft.xml',
        data: doc.data ?? '',
        activeData: doc.data ?? '',
        isModified: false,
        lastModifiedAt: DateTime.utc()
      })
      this.active = docId
    },
    async switchToDocument (docId) {
      this.active = docId
    },
    async closeDocument (docId) {
      this.opened = this.opened.filter(d => d.id !== docId)
      if (this.opened.length < 1) {
        this.loadDocument()
      } else if (this.active === docId) {
        this.active = this.opened[0].id
      }
    }
  }
})