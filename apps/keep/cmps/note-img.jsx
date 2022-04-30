import { PreviewToolbar } from './preview-toolbar.jsx'

export class NoteImg extends React.Component {
  state = {
    imgReady: false,
  }

  render() {
    const { url, title } = this.props.note.info
    const { imgReady } = this.state
    return (
      <div className='note-img-container'>
        <button
          className={`fa-solid fa-thumbtack pin-btn image ${
            this.props.isPinned ? 'pinned' : ''
          }`}
          onClick={(ev) => this.props.onPin(ev, this.props.note.id)}
        ></button>
        <img
          className='note-img'
          onLoad={() => this.setState({ imgReady: true })}
          src={url}
          style={imgReady ? { opacity: '1' } : { opacity: '0' }}
        />
        <div className='note-img-description'>
          {title && <h4>{title}</h4>}
          <PreviewToolbar
            noteId={this.props.note.id}
            onChangeNoteColor={this.props.onChangeNoteColor}
            onDeleteNote={this.props.onDeleteNote}
            onDuplicateNote={this.props.onDuplicateNote}
          />
        </div>
      </div>
    )
  }
}
