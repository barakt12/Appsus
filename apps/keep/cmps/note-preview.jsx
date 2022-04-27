import { NoteText } from './note-text.jsx'
import { NoteImg } from './note-img.jsx'
import { NoteTodos } from './note-todos.jsx'
import { NoteVideo } from './note-video.jsx'

export class NotePreview extends React.Component {
  state = {
    note: null,
    noteType: null,
  }

  componentDidMount() {
    const { note } = this.props
    this.setState({ note, noteType: note.type })
  }

  render() {
    const { note, noteType } = this.state
    if (!note || !noteType) return ''

    const DynamicCmp = (props) => {
      if (!note) return ''
      switch (noteType) {
        case 'note-txt':
          return <NoteText {...props} />
        case 'note-img':
          return <NoteImg {...props} />
        case 'note-todos':
          return <NoteTodos {...props} />
        case 'note-video':
          return <NoteVideo {...props} />
      }
    }
    console.log(note.style.backgroundColor)
    return (
      <React.Fragment>
        {noteType !== 'note-img' && (
          <div
            className='note-preview'
            style={{
              backgroundColor: note.style.backgroundColor,
            }}
          >
            <DynamicCmp note={note} />
          </div>
        )}
        {noteType === 'note-img' && (
          <div className='note-preview'>
            <DynamicCmp note={note} />
          </div>
        )}
      </React.Fragment>
    )
  }
}
