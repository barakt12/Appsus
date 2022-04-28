import { eventBusService } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

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
  }

  onExpandInput = (ev) => {
    // ev.stopPropagation()
    this.setState({ isActive: true }, () => {
      eventBusService.emit('toggleScreen', true)
    })
  }

  onChangeType = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    const value = ev.target.value
    this.setState((prevState) => ({ ...prevState, noteType: value }))
  }

  render() {
    const { txt, title, url } = this.state.noteInfo
    const { isActive } = this.state
    return (
      <div className='note-add'>
        <form
          onSubmit={this.onAddNote}
          // onBlur={() => {
          //   this.setState({ isActive: false })
          // }}
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

          <input
            name='txt'
            autoComplete='off'
            onFocus={this.onExpandInput}
            type='text'
            placeholder='Take a note...'
            value={txt}
            onChange={this.handleChange}
          />
        </form>
        {/* <div className='type-btns'>
          <button
            className='btn-text fa-solid fa-font'
            value='note-txt'
            onClick={this.onChangeType}
          ></button>
          <button
            className='btn-img fa-solid fa-image'
            value='note-img'
            onClick={this.onChangeType}
          ></button>
          <button
            className='btn-todos fa-solid fa-list'
            value='note-todos'
            onClick={this.onChangeType}
          ></button>
          <button
            className='btn-video fa-brands fa-youtube'
            value='note-video'
            onClick={this.onChangeType}
          ></button>
        </div> */}
      </div>
    )
  }
}
