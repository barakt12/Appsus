import { PreviewToolbar } from './preview-toolbar.jsx'

export function NoteVideo(props) {
  const { videoId } = props.note.info
  const { note, onChangeNoteColor } = props
  return (
    <div className='note-video-container'>
      <iframe
        width='100%'
        height='300px'
        src={`https://www.youtube.com/embed/${videoId}`}
      ></iframe>
      <div className='note-img-description'>
        {props.note.info.title && <h4>{props.note.info.title}</h4>}
        <PreviewToolbar
          noteId={note.id}
          onChangeNoteColor={onChangeNoteColor}
        />
      </div>
    </div>
  )
}
