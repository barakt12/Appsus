import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const KEY = 'noteDB'

export const noteService = {
  query,
  getNoteById,
  createNote,
  updateNoteText,
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
  const notes = [
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: false,
      info: {
        txt: 'Fullstack Me Baby!',
        url: '',
        todos: [],
        title: 'Hello',
      },
      style: {
        backgroundColor: 'aliceblue',
        color: '000',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-img',
      isPinned: false,
      info: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
        title: 'Bobi and Me',
      },
      style: {
        backgroundColor: '#00d',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-todos',
      isPinned: false,
      info: {
        title: 'List 1',
        todos: [{ txt: 'Something1' }, { txt: 'Something2' }],
      },
      style: {
        backgroundColor: 'fff',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-video',
      isPinned: false,
      info: {},
    },
  ]
  _saveToStorage(notes)
  return notes
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

function updateNoteText(updatedNote, inputText, inputTitle) {
  updatedNote.info.txt = inputText
  updatedNote.info.title = inputTitle
  console.log(updatedNote)
  const updatedNotes = updateNote(updatedNote)
  _saveToStorage(updatedNotes)
  return Promise.resolve()
}

function updateNote(updatedNote) {
  const notes = _loadFromStorage()
  return notes.map((note) => {
    if (note.id === updatedNote.id) return updatedNote
    return note
  })
}
