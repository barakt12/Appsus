import { AppHeader } from '../cmps/app-header.jsx'

export function Home() {
  return (
    <React.Fragment>
      <AppHeader pageName='Appsus' fileEnding='png' />
      <img src='./assets/img/bg.jpg' className='bg-img' />
      <section className='home layout'>
        <h1 className='welcome'>Welcome to Appsus</h1>
        <h1>
          Simple Elegant Beautiful<span>.</span>
        </h1>
      </section>
    </React.Fragment>
  )
}
