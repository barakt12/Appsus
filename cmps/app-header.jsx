const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader() {
  return (
    <header className='app-header flex space-between'>
      <Link to={'/'}>
        <h3>Appsus</h3>
      </Link>

      <nav className='flex align-center space-between'>
        <NavLink to='/' exact>
          Home
        </NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/book'>Books</NavLink>
        <NavLink to='/mail'>Mail</NavLink>
        <NavLink to='/keep'>Keep</NavLink>
      </nav>
    </header>
  )
}

export const AppHeader = withRouter(_AppHeader)
