import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'
import { Screen } from '../../../cmps/screen.jsx'
import { AppHeader } from '../../../cmps/app-header.jsx'

export class KeepApp extends React.Component {
  state = {
    isPinnedNotes: false,
    filterBy: null,
    notes: [],
  }

  componentDidMount() {
    this.loadNotes()
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
    noteService.query().then((notes) => {
      this.setState({ notes }, () => {})
    })
  }

  render() {
    const { notes } = this.state
    return (
      <React.Fragment>
        <AppHeader pageName='keep' />
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
