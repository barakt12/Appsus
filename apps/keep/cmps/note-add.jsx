import { eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { NoteTypeBtns } from './note-type-btns.jsx'
import { CreateTodo } from './create-todo.jsx'

export class NoteAdd extends React.Component {
  state = {
    isActive: false,
    noteType: 'note-txt',
    noteInfo: {
      title: '',
      txt: '',
      url: '',
      todos: [],
    },
  }

  inputRef = React.createRef()

  handleChange = ({ target }) => {
    const value = target.value
    const field = target.name
    this.setState((prevState) => ({
      ...prevState,
      noteInfo: { ...prevState.noteInfo, [field]: value },
    }))
  }

  onAddNote = (ev) => {
    ev.preventDefault()
    const note = this.state
    if (
      !note.noteInfo.title.length &&
      !note.noteInfo.todos.length &&
      !note.noteInfo.txt.length &&
      !note.noteInfo.url.length
    )
      return
    noteService
      .addNote(note)
      .then(
        this.setState({
          isActive: false,
          noteType: 'note-txt',
          noteInfo: {
            title: '',
            txt: '',
            url: '',
            todos: [],
          },
        })
      )
      .then(this.props.loadNotes())
      .then(this.onExpandInput(false))
  }

  onExpandInput = (ev, isOpen) => {
    if (ev.relatedTarget) return

    this.setState({ isActive: isOpen }, () => {
      eventBusService.emit('toggleScreen', isOpen)
    })
  }

  onChangeType = (ev) => {
    ev.preventDefault()
    this.onExpandInput(ev, true)
    const value = ev.target.value

    this.setState((prevState) => ({ ...prevState, noteType: value }))
    // this.inputRef.current.focus()
  }

  render() {
    const { txt, title, url } = this.state.noteInfo
    const { isActive, noteType } = this.state
    return (
      <div className='note-add'>
        <form
          onSubmit={this.onAddNote}
          onBlur={(ev) => {
            this.onExpandInput(ev, false)
          }}
        >
          <input
            className={`note-add-title ${isActive ? '' : 'hide'}`}
            type='text'
            name='title'
            autoComplete='off'
            placeholder='Title'
            value={title}
            onChange={this.handleChange}
          />

          {noteType === 'note-txt' && (
            <input
              name='txt'
              autoComplete='off'
              type='text'
              placeholder='Take a note...'
              value={txt}
              onFocus={(ev) => this.onExpandInput(ev, true)}
              onChange={this.handleChange}
              ref={this.inputRef}
            />
          )}
          {noteType === 'note-img' && (
            <input
              name='url'
              autoComplete='off'
              type='text'
              placeholder='Enter Image URL'
              value={url}
              onFocus={(ev) => this.onExpandInput(ev, true)}
              onChange={this.handleChange}
              ref={this.inputRef}
            />
          )}
          {noteType === 'note-todos' && (
            <CreateTodo handleChange={this.handleChange} />
          )}
          {noteType === 'note-video' && (
            <input
              name='txt'
              autoComplete='off'
              type='text'
              placeholder='Enter Video URL'
              value={url}
              onFocus={(ev) => this.onExpandInput(ev, true)}
              onChange={this.handleChange}
              ref={this.inputRef}
            />
          )}
          {isActive && (
            <div className='form-actions'>
              <button className='note-create-btn'>Create</button>
            </div>
          )}
        </form>
        <NoteTypeBtns onChangeType={this.onChangeType} />
      </div>
    )
  }
}
