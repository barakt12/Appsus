import { NoteText } from './note-text.jsx'
import { NoteImg } from './note-img.jsx'
import { NoteTodos } from './note-todos.jsx'
import { NoteVideo } from './note-video.jsx'
import { noteService } from '../services/note.service.js'

export class NotePreview extends React.Component {
  state = {
    isPinned: false,
    note: null,
    noteType: null,
  }

  componentDidMount() {
    const { note } = this.props
    this.setState({ note, noteType: note.type, isPinned: note.isPinned })
  }

  onChangeNoteColor = (noteId, color) => {
    noteService.changeNoteColor(noteId, color).then(() => {
      this.setState((prevState) => ({
        note: { ...prevState.note, style: { backgroundColor: color } },
      }))
    })
  }
  onPin = (ev, noteId) => {
    ev.stopPropagation()
    ev.preventDefault()
    const { onPinNote } = this.props
    onPinNote(ev, noteId)
    this.setState((prevState) => ({
      ...prevState,
      isPinned: !this.state.isPinned,
    }))
  }

  render() {
    const { note, noteType } = this.state
    if (!note || !noteType) return ''

    const DynamicCmp = (props) => {
      if (!note) return ''
      switch (noteType) {
        case 'note-txt':
          return <NoteText {...props} />
        case 'note-img':
          return <NoteImg {...props} />
        case 'note-todos':
          return <NoteTodos {...props} />
        case 'note-video':
          return <NoteVideo {...props} />
      }
    }

    const inlineStyle =
      note.style.backgroundColor !== '#fff' &&
      noteType !== 'note-img' &&
      note.style.backgroundColor !== '#FFFFFF'
        ? { backgroundColor: note.style.backgroundColor }
        : {
            backgroundColor: note.style.backgroundColor,
            border: '1px solid transparent',
            borderColor: '#e0e0e0',
          }

    return (
      <div className='note-preview-shadow-protection'>
        <div className='note-preview' style={inlineStyle}>
          <DynamicCmp
            note={note}
            onChangeNoteColor={this.onChangeNoteColor}
            onDeleteNote={this.props.onDeleteNote}
            onDuplicateNote={this.props.onDuplicateNote}
            onPin={this.onPin}
            isPinned={this.state.isPinned}
          />
        </div>
      </div>
    )
  }
}
