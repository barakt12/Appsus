import { noteService } from '../services/note.service.js'
import { PreviewToolbar } from './preview-toolbar.jsx'

export class NoteTodos extends React.Component {
  state = {
    todos: [],
  }

  componentDidMount() {
    const { todos } = this.props.note.info
    this.setState({ todos })
  }

  handleChange = ({ target }, todo) => {
    const { value } = target.value
    const { todos } = this.state
    const idx = todos.indexOf(todo)
    todos[idx].txt = value
    this.setState({ todos })
  }

  onToggleCheck = (todoIdx, noteId) => {
    noteService
      .toggleTodoCheck(todoIdx, noteId)
      .then((todos) => this.setState({ todos }))
  }

  render() {
    const { todos } = this.state
    const { note } = this.props
    return (
      <div className='todos-container'>
        {note.info.title && (
          <div className='todos-title'>{note.info.title}</div>
        )}
        <ul>
          <button
            className={`fa-solid fa-thumbtack pin-btn ${
              this.props.isPinned ? 'pinned' : ''
            }`}
            onClick={(ev) => this.props.onPin(ev, this.props.note.id)}
          ></button>
          {todos.map((todo, idx) => (
            <li key={idx}>
              <button
                className={`fa-regular fa-square${
                  todo.isChecked ? '-check' : ''
                } checkbox`}
                onClick={() => this.onToggleCheck(idx, note.id)}
              ></button>
              <p className={todo.isChecked ? 'todo-checked' : ''}>{todo.txt}</p>
            </li>
          ))}
        </ul>
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
