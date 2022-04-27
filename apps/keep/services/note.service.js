import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const KEY = 'noteDB'

export const noteService = {
  query,
  getNoteById,
  createNote,
}

function query(filterBy) {
  let notes = _loadFromStorage() || _createNotes()
  return Promise.resolve(notes)
}

function getNoteById(id) {
  let notes = _loadFromStorage()
  const note = notes.find((note) => note.id === id)
  return Promise.resolve(note)
}

function _loadFromStorage() {
  return storageService.loadFromStorage(KEY)
}

function _saveToStorage(notes) {
  storageService.saveToStorage(KEY, notes)
}

function _createNotes() {
  return [
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: false,
      info: {
        txt: 'Fullstack Me Baby!',
      },
    },
  ]
}

function createNote(type, info) {
  let notes = _loadFromStorage()
  const note = {
    id: utilService.makeId(),
    type,
    isPinned,
    info,
    style: {
      backgroundColor: '#fff',
    },
  }
  notes.push(note)
  _saveToStorage(notes)
  return Promise.resolve()
}
