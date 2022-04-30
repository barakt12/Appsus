import { PreviewToolbar } from './preview-toolbar.jsx'

export function NoteVideo(props) {
  const { videoId } = props.note.info
  const { note, onChangeNoteColor, onDeleteNote, onDuplicateNote } = props
  return (
    <div className='note-video-container'>
      <button
        className={`fa-solid fa-thumbtack pin-btn video ${
          props.isPinned ? 'pinned' : ''
        }`}
        onClick={(ev) => props.onPin(ev, note.id)}
      ></button>
      <iframe
        width='100%'
        height='300px'
        src={`https://www.youtube.com/embed/${videoId}`}
      ></iframe>
      <div className='note-img-description'>
        {note.info.title && <h4>{note.info.title}</h4>}
        <PreviewToolbar
          noteId={note.id}
          onChangeNoteColor={onChangeNoteColor}
          onDeleteNote={onDeleteNote}
          onDuplicateNote={onDuplicateNote}
        />
      </div>
    </div>
  )
}
