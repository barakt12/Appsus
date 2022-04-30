const { Link, NavLink, withRouter } = ReactRouterDOM
import { Menu } from './menu.jsx'

class _AppHeader extends React.Component {
  state = {
    pageName: '',
    isOpen: false,
    searchQuery: '',
  }

  componentDidMount() {
    const { pageName } = this.props
    this.setState({ pageName })
  }

  onToggleMenu = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  handleChange = ({ target }) => {
    const value = target.value
    this.setState((prevState) => ({
      ...prevState,
      searchQuery: value,
    }))
  }

  render() {
    const { isOpen } = this.state
    const { pageName, fileEnding } = this.props
    return (
      <header className='app-header flex '>
        <img
          src={`./assets/img/${
            pageName === 'Appsus' ? 'home' : pageName
          }.${fileEnding}`}
          className='keep-header'
        />
        <h3>{pageName[0].toUpperCase() + pageName.slice(1)}</h3>
        {pageName === 'keep' && (
          <form className='mail-filter-box-container'>
            <Link to={`/keep?search=${this.state.searchQuery}`}>
              <button className='fas fa-search search-btn'></button>
            </Link>
            <input
              type='text'
              placeholder='Search'
              onChange={this.handleChange}
              value={this.state.searchQuery}
            />
          </form>
        )}
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
