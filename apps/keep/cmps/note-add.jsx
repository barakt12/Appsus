import { utilService } from '../../../services/util.service.js'

export class NoteAdd extends React.Component {
  state = {
    inputText: '',
    noteInfo: {
      txt: '',
    },
  }

  handleChange = ({ target }) => {
    const value = target.value
    this.setState({ inputText: value })
  }

  onAddNote = (ev) => {
    ev.preventDefault()
  }

  render() {
    const { inputText } = this.state
    return (
      <div className='note-add'>
        <form onSubmit={this.onAddNote}>
          <label>
            <input
              type='text'
              placeholder='What are you thinking?'
              value={inputText}
              onChange={this.handleChange}
            />
          </label>
        </form>
      </div>
    )
  }
}
