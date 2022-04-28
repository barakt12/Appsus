export class NoteColor extends React.Component {
  state = {
    isActive: false,
  }

  togglePalette = (ev) => {
    ev.stopPropagation()
    const { isActive } = this.state
    this.setState({ isActive: !isActive })
  }

  render() {
    const colors = [
      '#FFFFFF',
      '#F28B82',
      '#FBBC04',
      '#FFF475',
      '#CCFF90',
      '#A7FFEB',
      '#CBF0F8',
      '#F1E4DE',
      '#D7AEFB',
      '#FDCFE8',
      '#E6C9A8',
      '#E8EAED',
    ]
    const { noteId, onChangeNoteColor } = this.props
    const { isActive } = this.state
    return (
      <React.Fragment>
        <button
          onClick={this.togglePalette}
          className='fa-solid fa-palette'
        ></button>
        {isActive && (
          <div className='color-palette'>
            {colors.map((color, idx) => (
              <span
                className='color-ball'
                key={idx}
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChangeNoteColor(noteId, color)
                }}
              ></span>
            ))}
          </div>
        )}
      </React.Fragment>
    )
  }
}
