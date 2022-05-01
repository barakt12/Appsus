const { Link, NavLink, withRouter } = ReactRouterDOM

export function Menu({ onToggleMenu }) {
  return (
    <div className='openMenu'>
      <NavLink
        to='/'
        exact
        className='menu-home'
        onClick={() => onToggleMenu()}
      >
        <img className='home-img' src='./assets/img/homemenu.png' />
        <span>Home</span>
      </NavLink>
      <NavLink to='/about' onClick={() => onToggleMenu()}>
        <img src='./assets/img/about.png' className='about-img' />
        <span>About</span>
      </NavLink>
      <NavLink to='/keep' className='menu-keep' onClick={() => onToggleMenu()}>
        <img src='./assets/img/keep.svg' className='keep-img' />
        <span>Keep</span>
      </NavLink>
      <NavLink to='/mail/inbox' onClick={() => onToggleMenu()}>
        <img src='./assets/img/gmail.svg' className='gmail-img' />
        <span>Mail</span>
      </NavLink>
    </div>
  )
}
