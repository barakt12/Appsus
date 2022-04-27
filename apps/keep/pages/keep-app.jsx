import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'

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
    return (
      <section className='keep-app'>
        <div className='note-add'>
          <NoteAdd />
          <NoteList />
        </div>
      </section>
    )
  }
}
