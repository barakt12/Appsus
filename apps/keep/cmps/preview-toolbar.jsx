import { NoteColor } from './note-color.jsx'
export function PreviewToolbar(props) {
  const { noteId, onChangeNoteColor, onDeleteNote, onDuplicateNote } = props
  return (
    <div className='preview-toolbar'>
      <NoteColor noteId={noteId} onChangeNoteColor={onChangeNoteColor} />
      <button
        onClick={() => onDeleteNote(noteId)}
        className='fa-regular fa-trash-can'
      ></button>
      <button
        onClick={() => onDuplicateNote(noteId)}
        className='fa-regular fa-clone'
      ></button>
      <button className='fa-solid fa-envelope-open-text'></button>
    </div>
  )
}
