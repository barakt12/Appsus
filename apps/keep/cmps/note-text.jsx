import { noteService } from '../services/note.service.js'
import { PreviewToolbar } from './preview-toolbar.jsx'

export class NoteText extends React.Component {
  state = {
    noteTitle: '',
    noteText: '',
  }

  componentDidMount() {
    const { note } = this.props
    this.setState({
      noteTitle: note.info.title,
      noteText: note.info.txt,
    })
  }

  handleTextChange = ({ target }) => {
    const { value } = target
    this.setState({ noteText: value })
  }

  handleTitleChange = ({ target }) => {
    const { value } = target
    this.setState({ noteTitle: value })
  }

  onSaveChange = () => {
    const { note } = this.props
    const { noteText } = this.state
    const { noteTitle } = this.state
    noteService.updateNoteText(note, noteText, noteTitle)
  }

  onResize = ({ target }) => {
    target.style.height = 'inherit'
    target.style.height = `${target.scrollHeight}px`
  }

  render() {
    const { noteText, noteTitle } = this.state
    return (
      <div className='note-text-container'>
        {noteTitle && (
          <textarea
            rows={1}
            spellCheck='false'
            onChange={this.handleTitleChange}
            onBlur={this.onSaveChange}
            value={noteTitle}
            className='note-title'
          >
            {noteTitle}
          </textarea>
        )}
        <textarea
          className='note-text'
          onInput={this.onResize}
          spellCheck='false'
          onBlur={this.onSaveChange}
          value={noteText}
          onChange={this.handleTextChange}
        ></textarea>
        <button
          className={`fa-solid fa-thumbtack pin-btn ${
            this.props.isPinned ? 'pinned' : ''
          }`}
          onClick={(ev) => this.props.onPin(ev, this.props.note.id)}
        ></button>
        <PreviewToolbar
          noteId={this.props.note.id}
          onChangeNoteColor={this.props.onChangeNoteColor}
          onDeleteNote={this.props.onDeleteNote}
          onDuplicateNote={this.props.onDuplicateNote}
        />
      </div>
    )
  }
}
