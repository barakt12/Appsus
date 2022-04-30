const { Route, Link } = ReactRouterDOM
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
        <div className='call-action-btn'>
          <Link to={`${Math.random() > 0.5 ? '/keep' : '/mail'}`}>
            Get Started
          </Link>
        </div>
      </section>
    </React.Fragment>
  )
}
