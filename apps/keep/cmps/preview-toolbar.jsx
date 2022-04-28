import { NoteColor } from './note-color.jsx'
export function PreviewToolbar(props) {
  const { noteId, onChangeNoteColor } = props

  return (
    <div className='preview-toolbar'>
      <NoteColor noteId={noteId} onChangeNoteColor={onChangeNoteColor} />
      <button className='fa-regular fa-trash-can'></button>
      <button className='fa-regular fa-clone'></button>
      <button className='fa-solid fa-envelope-open-text'></button>
    </div>
  )
}
