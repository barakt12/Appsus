const { Route, NavLink, Switch } = ReactRouterDOM
import { AppHeader } from '../cmps/app-header.jsx'
export class About extends React.Component {
  // intervalId

  // componentDidMount() {
  //   console.log('started interval')
  //   this.intervalId = setInterval(() => {
  //     console.log('hi from the Interval')
  //   }, 1000)
  // }

  // componentWillUnmount() {
  //   clearInterval(this.intervalId)
  //   console.log('cleared interval')
  // }

  render() {
    return (
      <React.Fragment>
        <AppHeader pageName={'about'} fileEnding={'png'} />
        <section className='about layout'>
          {/* <nav>
          <NavLink to='/about/team'>Team</NavLink>
          <NavLink to='/about/vision'>Vision</NavLink>
        </nav> */}
          <h1>About Us</h1>
          {/* <section>
            <Switch>
              <Route path='/about/team' component={Team} />
              <Route path='/about/vision' component={Vision} />
            </Switch>
          </section> */}
        </section>
      </React.Fragment>
    )
  }
}

// function Team() {
//   return (
//     <section className='team'>
//       <div>Mishu Mashu</div>
//       <div>Jorge </div>
//     </section>
//   )
// }

// function Vision() {
//   return (
//     <section className='vision'>
//       <div>To take your money</div>
//       <div>Sell nice cars</div>
//     </section>
//   )
// }
