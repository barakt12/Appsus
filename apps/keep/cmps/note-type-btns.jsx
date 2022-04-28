export function NoteTypeBtns({ onChangeType }) {
  return (
    <div className='type-btns'>
      <button
        className='btn-text fa-solid fa-font'
        value='note-txt'
        onClick={onChangeType}
      ></button>
      <button
        className='btn-img fa-solid fa-image'
        value='note-img'
        onClick={onChangeType}
      ></button>
      <button
        className='btn-todos fa-solid fa-list'
        value='note-todos'
        onClick={onChangeType}
      ></button>
      <button
        className='btn-video fa-brands fa-youtube'
        value='note-video'
        onClick={onChangeType}
      ></button>
    </div>
  )
}
