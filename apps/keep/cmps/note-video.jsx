export function NoteVideo({ note }) {
  const { videoId } = note.info
  return (
    <iframe
      width='100%'
      height='300px'
      src={`https://www.youtube.com/embed/${videoId}`}
    ></iframe>
  )
}
