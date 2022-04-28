import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'
import { Screen } from '../../../cmps/screen.jsx'

export class KeepApp extends React.Component {
  state = {
    filterBy: null,
    notes: [],
  }

  componentDidMount() {
    this.loadNotes()
  }

  loadNotes = () => {
    noteService.query().then((notes) => {
      this.setState({ notes })
    })
  }

  render() {
    const { notes } = this.state
    return (
      <section className='keep-app'>
        <NoteAdd loadNotes={this.loadNotes} />
        <NoteList notes={notes} />
        <Screen />
      </section>
    )
  }
}
