export class NoteImg extends React.Component {
  state = {
    imgReady: false,
  }

  render() {
    const { url } = this.props.note.info
    const { imgReady } = this.state
    return (
      <div className='note-img-container'>
        <img
          className='note-img'
          onLoad={() => this.setState({ imgReady: true })}
          src={url}
          style={imgReady ? { opacity: '100' } : { opacity: '0' }}
        />
      </div>
    )
  }
}
