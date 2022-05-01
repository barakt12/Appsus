import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { KeepApp } from './apps/keep/pages/keep-app.jsx'
import { MailApp } from './apps/mail/pages/mail-app.jsx'
import { MailDetails } from './apps/mail/pages/mail-details.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
  return (
    <Router>
      <section className='app'>
        <Switch>
          <Route path='/mail/view/:mailId' component={MailDetails} />
          <Route path='/mail/:folder?' component={MailApp} />
          {/* <Route path='/mail' component={MailApp} /> */}
          <Route path='/keep' component={KeepApp} />
          <Route path='/about' component={About} />
          <Route path='/' component={Home} />
        </Switch>
      </section>
    </Router>
  )
}
