import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const KEY = 'noteDB'

export const noteService = {
  query,
  getNoteById,
  updateNoteText,
  addNote,
  changeNoteColor,
  deleteNote,
  duplicateNote,
  toggleTodoCheck,
  togglePin,
}

function query(filterBy) {
  let notes = _loadFromStorage() || _createNotes()
  notes = _sortByPinned(notes)
  notes = notes.map((note) => {
    if (note.type !== 'note-todos') return note
    else {
      const sortedTodos = _sortByChecked(note.info.todos)
      note.info.todos = sortedTodos
      return note
    }
  })
  if (filterBy) {
    filterBy = filterBy.toLowerCase()
    const filteredNotes = notes.filter((note) => {
      if (note.type === 'note-todos')
        return (
          note.info.title.toLowerCase().includes(filterBy) ||
          _filterTodos(note.info.todos, filterBy)
        )
      else {
        return note.info.title
          ? note.info.title.toLowerCase().includes(filterBy)
          : '' || note.info.txt
          ? note.info.txt.toLowerCase().includes(filterBy)
          : ''
      }
    })
    return Promise.resolve(filteredNotes)
  }
  return Promise.resolve(notes)
}

function _filterTodos(todos, filterBy) {
  return todos.some((todo) => todo.txt.toLowerCase().includes(filterBy))
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
      id: 'kXNoEB',
      type: 'note-txt',
      isPinned: false,
      info: {
        title: 'Next Friday',
        txt: '12:00-13:00 - Lunch\n13:00-14:30 - Driving to tavor Mountain\n14:30-15:30 - Jogging\n15:30-18:00 - Shower & Snacks\n18:00-19:00 - Driving to the Kinneret\n19:00-21:30 - Dinner and TV',
        url: '',
        todos: [],
      },
      style: {
        backgroundColor: '#E6C9A8',
      },
    },
    {
      id: 'pFBwMV',
      type: 'note-img',
      isPinned: false,
      info: {
        title: 'Trip to England',
        txt: '',
        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/1200px-Flag_of_England.svg.png',
        todos: [],
      },
      style: {
        backgroundColor: '#FDCFE8',
      },
    },
    {
      id: 'u1rwav',
      type: 'note-todos',
      isPinned: false,
      info: {
        title: 'Groceries',
        txt: '',
        url: '',
        todos: [
          {
            txt: 'Water',
            isChecked: false,
          },
          {
            txt: 'Bamba',
            isChecked: true,
          },
          {
            txt: 'Milk 3%',
            isChecked: true,
          },
          {
            txt: 'Bread',
            isChecked: false,
          },
          {
            txt: 'Rice',
            isChecked: true,
          },
          {
            txt: 'Toiler Paper',
            isChecked: false,
          },
          {
            txt: 'Pasta',
            isChecked: false,
          },
          {
            txt: 'Tomatoes',
            isChecked: true,
          },
          {
            txt: 'Jalapeno',
            isChecked: false,
          },
        ],
      },
      style: {
        backgroundColor: '#F28B82',
      },
    },

    {
      id: 'qE1Rby',
      type: 'note-todos',
      isPinned: false,
      info: {
        title: 'Beach Time',
        txt: '',
        url: '',
        todos: [
          {
            txt: 'Sunscreen',
            isChecked: true,
          },
          {
            txt: 'Ice',
            isChecked: false,
          },
          {
            txt: 'Surfboard',
            isChecked: false,
          },
          {
            txt: 'Watermelon',
            isChecked: false,
          },
        ],
      },
      style: {
        backgroundColor: '#CBF0F8',
      },
    },
    {
      id: 'svPO8T',
      type: 'note-todos',
      isPinned: true,
      info: {
        title: 'Todo list for tomorrow',
        txt: '',
        url: '',
        todos: [
          {
            txt: 'Go Fishing',
            isChecked: true,
          },
          {
            txt: 'Eat Fish',
            isChecked: true,
          },
          {
            txt: 'Eat more',
            isChecked: false,
          },
        ],
      },
      style: {
        backgroundColor: '#FFF475',
      },
    },
    {
      id: 'TUfens',
      type: 'note-txt',
      isPinned: false,
      info: {
        txt: 'Fullstack Me Baby!',
        url: '',
        todos: [],
        title: 'Hello',
      },
      style: {
        backgroundColor: '#F1E4DE',
        color: '000',
      },
    },
    {
      id: 'WzQ9KF',
      type: 'note-img',
      isPinned: false,
      info: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
        title: 'Bobi and Me',
      },
      style: {
        backgroundColor: '#FFF475',
      },
    },
    {
      id: '9dKEIj',
      type: 'note-todos',
      isPinned: false,
      info: {
        title: 'List 1',
        todos: [
          {
            txt: 'Something1',
            isChecked: false,
          },
          {
            txt: 'Something2',
            isChecked: true,
          },
        ],
      },
      style: {
        backgroundColor: '#A7FFEB',
      },
    },
    {
      id: 'JIUJb7',
      type: 'note-video',
      isPinned: false,
      info: {
        videoId: 'AEpZbvtiQFs',
      },
      style: {
        backgroundColor: '#FDCFE8',
      },
    },
  ]
  _saveToStorage(notes)
  console.log(notes)
  return notes
}

function updateNoteText(updatedNote, inputText, inputTitle) {
  updatedNote.info.txt = inputText
  updatedNote.info.title = inputTitle
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

function addNote(note) {
  const { noteInfo, noteType } = note
  switch (noteType) {
    case 'note-txt':
      if (!noteInfo.txt && !noteInfo.title) return
      break
    case 'note-img':
      if (!noteInfo.url) return
      break
    case 'note-video':
      if (!noteInfo.url) return
      break
    case 'note-todos':
      if (!noteInfo.todos.length) return
      noteInfo.todos = noteInfo.todos
        .filter((todo) => todo.length >= 1)
        .map((todo) => ({ txt: todo }))
      console.log(noteInfo.todos)
      break
  }
  const newNote = {
    id: utilService.makeId(),
    type: noteType,
    isPinned: false,
    info: { ...noteInfo },
    style: {
      backgroundColor: '#fff',
    },
  }
  const notes = _loadFromStorage()
  notes.unshift(newNote)
  _saveToStorage(notes)
  return Promise.resolve(newNote)
}

function changeNoteColor(noteId, color) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => note.id === noteId)
  note.style.backgroundColor = color
  _saveToStorage(notes)
  return Promise.resolve()
}

function deleteNote(noteId) {
  const notes = _loadFromStorage()
  const idx = notes.findIndex((note) => note.id === noteId)
  notes.splice(idx, 1)
  _sortByPinned(notes)
  _saveToStorage(notes)
  return Promise.resolve(notes)
}

function duplicateNote(noteId) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => {
    return noteId === note.id
  })
  const duplicateNote = { ...note }
  duplicateNote.id = utilService.makeId()
  duplicateNote.isPinned = false
  notes.unshift(duplicateNote)
  _sortByPinned(notes)
  _saveToStorage(notes)
  return Promise.resolve(notes)
}

function toggleTodoCheck(idx, noteId) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => noteId === note.id)
  const todos = note.info.todos
  todos[idx].isChecked = !todos[idx].isChecked
  _sortByChecked(todos)
  _saveToStorage(notes)
  return Promise.resolve(todos)
}

function togglePin(noteId) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => noteId === note.id)
  note.isPinned = !note.isPinned
  _sortByPinned(notes)
  _saveToStorage(notes)
  return Promise.resolve(notes)
}
function _sortByPinned(notes) {
  return notes.sort((a, b) => {
    if (a.isPinned && !b.isPinned) {
      return -1
    }
    if (!a.isPinned && b.isPinned) {
      return 1
    }
  })
}

function _sortByChecked(todos) {
  return todos.sort((a, b) => {
    if (!a.isChecked && b.isChecked) {
      return -1
    }
    if (!a.isChecked && b.isChecked) {
      return 1
    }
  })
}
