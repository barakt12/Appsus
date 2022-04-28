import { PreviewToolbar } from './preview-toolbar.jsx'

export class NoteTodos extends React.Component {
  state = {
    todos: [],
  }

  componentDidMount() {
    const { note } = this.props
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

  render() {
    const { todos } = this.state
    const { note } = this.props
    return (
      <div className='todos-container'>
        <div className='todos-title'>{note.info.title}</div>
        <ul>
          {todos.map((todo, idx) => (
            <li key={idx}>
              <button className='fa-solid fa-circle-check'></button>
              <p>{todo.txt}</p>
            </li>
          ))}
        </ul>
        <PreviewToolbar
          noteId={this.props.note.id}
          onChangeNoteColor={this.props.onChangeNoteColor}
        />
      </div>
    )
  }
}
