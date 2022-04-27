import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { BookApp } from './apps/book/pages/book-app.jsx'
import { KeepApp } from './apps/keep/pages/keep-app.jsx'
import { MailApp } from './apps/mail/pages/mail-app.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
  return (
    <Router>
      <AppHeader />
      <section className='app'>
        <Switch>
          <Route path='/mail' component={MailApp} />
          <Route path='/keep' component={KeepApp} />
          {/* <Route path='/book' component={BookApp} /> */}
          <Route path='/about' component={About} />
          <Route path='/' component={Home} />
        </Switch>
      </section>
      <AppFooter />
    </Router>
  )
}
