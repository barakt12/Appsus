import { noteService } from '../services/note.service.js'
import { PreviewToolbar } from './preview-toolbar.jsx'

export class NoteText extends React.Component {
  state = {
    noteTitle: '',
    noteText: '',
  }

  componentDidMount() {
    const { note } = this.props
    this.setState({ noteTitle: note.info.title, noteText: note.info.txt })
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

  render() {
    const { noteText, noteTitle } = this.state
    return (
      <div className='note-text-container'>
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
        <textarea
          className='note-text'
          spellCheck='false'
          onBlur={this.onSaveChange}
          value={noteText}
          onChange={this.handleTextChange}
        ></textarea>
        <PreviewToolbar />
      </div>
    )
  }
}
