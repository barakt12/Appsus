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
          <img src='../assets/img/menu.svg' />
        </a>
        <nav className=''>
          {isOpen && (
            <div className='openMenu'>
              <NavLink to='/' exact className='fa-solid fa-house'></NavLink>
              <NavLink
                to='/about'
                className='fa-solid fa-circle-info'
              ></NavLink>
              <NavLink to='/book' className='fa-solid fa-book-open'></NavLink>
              <NavLink to='/mail' className='fa-solid fa-envelope'></NavLink>
              <NavLink to='/keep' className='fa-solid fa-sticky-note'></NavLink>
            </div>
          )}
        </nav>
      </header>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
