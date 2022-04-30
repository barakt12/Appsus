import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'
import { Screen } from '../../../cmps/screen.jsx'
import { AppHeader } from '../../../cmps/app-header.jsx'
import { eventBusService } from '../../../services/event-bus.service.js'

export class KeepApp extends React.Component {
  state = {
    filterBy: '',
    notes: [],
    selectedNote: null,
  }

  componentDidMount() {
    let searchQuery = new URLSearchParams(this.props.location.search).get(
      'search'
    )
    if (!searchQuery) this.loadNotes()
    this.setState(
      (prevState) => ({ ...prevState, filterBy: searchQuery }),
      this.loadNotes
    )
  }

  componentDidUpdate(prevProps, prevState) {
    let searchQuery = new URLSearchParams(this.props.location.search).get(
      'search'
    )
    let prevSearch = new URLSearchParams(prevProps.location.search).get(
      'search'
    )
    if (prevSearch !== searchQuery) {
      this.setState(
        (prevState) => ({ ...prevState, filterBy: searchQuery }),
        this.loadNotes
      )
    }
  }

  onSelectNote = (noteId) => {
    eventBusService.emit('screen', true)
    this.setState((prevState) => ({ ...prevState, selectedNote: noteId }))
  }

  onPinNote = (ev, noteId) => {
    ev.preventDefault()
    noteService
      .togglePin(noteId)
      .then((notes) => this.setState((prevState) => ({ ...prevState, notes })))
  }

  onDeleteNote = (noteId) => {
    noteService
      .deleteNote(noteId)
      .then((notes) => this.setState((prevState) => ({ ...prevState, notes })))
  }

  onDuplicateNote = (noteId) => {
    noteService
      .duplicateNote(noteId)
      .then((notes) => this.setState((prevState) => ({ ...prevState, notes })))
  }

  loadNotes = () => {
    const { filterBy } = this.state
    noteService.query(filterBy).then((notes) => {
      this.setState((prevState) => ({ ...prevState, notes }))
    })
  }

  render() {
    const { notes, selectedNote } = this.state
    return (
      <React.Fragment>
        <AppHeader pageName='keep' fileEnding='svg' />
        <section className='keep-app'>
          <NoteAdd loadNotes={this.loadNotes} />
          <NoteList
            notes={notes}
            onDeleteNote={this.onDeleteNote}
            onDuplicateNote={this.onDuplicateNote}
            onPinNote={this.onPinNote}
          />
          <Screen />
        </section>
      </React.Fragment>
    )
  }
}
