import { PreviewToolbar } from './preview-toolbar.jsx'

export function NoteVideo({ note }) {
  const { videoId } = note.info
  return (
    <div className='note-video-container'>
      <iframe
        width='100%'
        height='300px'
        src={`https://www.youtube.com/embed/${videoId}`}
      ></iframe>
      <div className='note-img-description'>
        {note.info.title && <h4>{note.info.title}</h4>}
        <PreviewToolbar />
      </div>
    </div>
  )
}
