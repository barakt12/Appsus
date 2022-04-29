import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { BookApp } from './apps/book/pages/book-app.jsx'
import { KeepApp } from './apps/keep/pages/keep-app.jsx'
import { MailApp } from './apps/mail/pages/mail-app.jsx'
import { MailDetails } from './apps/mail/pages/mail-details.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
export class App extends React.Component {
  state = {
    folder: null,
  }

  onSetFolder = (folder) => {
    this.setState({ folder })
  }

  render() {
    const { folder } = this.state
    return (
      <Router>
        <section className='app'>
          <Switch>
            <Route
              path='/mail/:mailId'
              component={(props) => (
                <MailDetails
                  {...props}
                  onSetFolder={this.onSetFolder}
                  folder={folder}
                />
              )}
            />
            <Route
              path='/mail'
              component={(props) => (
                <MailApp
                  {...props}
                  onSetFolder={this.onSetFolder}
                  folder={folder}
                />
              )}
            />
            <Route path='/keep' component={KeepApp} />
            <Route path='/about' component={About} />
            <Route path='/' component={Home} />
          </Switch>
        </section>
        {/* <AppFooter /> */}
      </Router>
    )
  }
}
