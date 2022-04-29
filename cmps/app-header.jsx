const { Link, NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {
  state = {
    isOpen: false,
  }

  onToggleMenu = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  render() {
    const { isOpen } = this.state

    return (
      <header className='app-header flex space-between'>
        <Link to={'/'}>
          <h3>Appsus</h3>
        </Link>

        <a className='menu' onClick={this.onToggleMenu}>
          <img src='./assets/img/menu.svg' />
        </a>
        <nav className=''>
          {isOpen && (
            <div className='openMenu'>
              <NavLink
                to='/'
                exact
                className='menu-home'
                onClick={this.onToggleMenu}
              >
                <img className='home-img' src='./assets/img/home.png' />
                <span>Home</span>
              </NavLink>
              <NavLink to='/about' onClick={this.onToggleMenu}>
                <img src='./assets/img/about.png' className='about-img' />
                <span>About</span>
              </NavLink>
              <NavLink
                to='/keep'
                className='menu-keep'
                onClick={this.onToggleMenu}
              >
                <img src='./assets/img/keep.svg' className='keep-img' />
                <span>Keep</span>
              </NavLink>
              <NavLink to='/mail' onClick={this.onToggleMenu}>
                <img src='./assets/img/gmail.svg' className='gmail-img' />
                <span>Mail</span>
              </NavLink>
              <NavLink
                to='/book'
                className='menu-book'
                onClick={this.onToggleMenu}
              >
                <img src='./assets/img/book.png' />
                <span>Book</span>
              </NavLink>
            </div>
          )}
        </nav>
      </header>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
