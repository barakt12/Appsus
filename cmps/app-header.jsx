const { Link, NavLink, withRouter } = ReactRouterDOM
import { Menu } from './menu.jsx'

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
    const { pageName } = this.props
    return (
      <header className='app-header flex '>
        {/* <Link to={'/'}> */}
        <img src={`./assets/img/${pageName}.svg`} className='keep-header' />
        <h3>{`Appsus ${
          pageName !== 'keep' && pageName !== 'book'
            ? ''
            : pageName[0].toUpperCase() + pageName.slice(1)
        }`}</h3>
        {/* </Link> */}

        <a className='menu' onClick={this.onToggleMenu}>
          <img src='./assets/img/menu.svg' />
        </a>
        <nav className=''>
          {isOpen && <Menu onToggleMenu={this.onToggleMenu} />}
        </nav>
      </header>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
