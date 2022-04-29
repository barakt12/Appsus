export class CreateTodo extends React.Component {
  state = {
    todos: [''],
  }

  clearTodoLine = () => {
    const { todos } = this.state
    return todos.filter((todo) => {
      return todo !== ''
    })
  }

  handleChangeTodo = (ev, idx) => {
    const { handleChange } = this.props
    let { todos } = this.state
    todos[idx] = ev.target.value
    todos = this.clearTodoLine()
    handleChange({ target: { value: todos, name: 'todos' } })
    todos.push('')
    this.setState({ todos })
  }

  render() {
    const { todos } = this.state
    return (
      <React.Fragment>
        {todos.map((todo, idx) => (
          <input
            type='text'
            key={idx}
            placeholder='List item'
            value={todo}
            className='todo-line'
            onChange={(ev) => this.handleChangeTodo(ev, idx)}
          />
        ))}
      </React.Fragment>
    )
  }
}
