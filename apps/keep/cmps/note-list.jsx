import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes }) {
  return (
    <div className='note-list'>
      {notes.map((note) => (
        <NotePreview note={note} key={note.id} />
      ))}
    </div>
  )
}
