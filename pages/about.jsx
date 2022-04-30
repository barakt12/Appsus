import { AppHeader } from '../cmps/app-header.jsx'
export class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppHeader pageName={'about'} fileEnding={'png'} />
        <section className='about layout'>
          <h1>About Us</h1>
        </section>
      </React.Fragment>
    )
  }
}
