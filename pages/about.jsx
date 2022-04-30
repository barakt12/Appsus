const { Route, NavLink, Switch } = ReactRouterDOM
import { AppHeader } from '../cmps/app-header.jsx'
export class About extends React.Component {


  render() {
    return (
      <React.Fragment>
        <AppHeader pageName={'about'} />
        <section className='about layout'>
          <div className="vicky developer-container">
            <img src="assets/img/vicky.jpg" />
            <div className="about-us-container">
              <span className="dev-name">Vicky Polatov</span>
              <span>32 Years Old</span>
              <span>Jerusalem</span>
              <span>Fullstack Developer with a great deal of passion</span>
              <span>Looking forward to my next challenge.</span>
            </div>
          </div>
          <div className="barak developer-container">
            <img src="assets/img/barak.jpg" />
            <div className="about-us-container">
              <span className="dev-name">Barak Treves</span>
              <span>22 Years Old</span>
              <span>Ra'anana</span>
              <span>Fullstack Developer with a great deal of passion</span>
              <span>Looking forward to my next challenge.</span>
            </div>
          </div>

        </section>
      </React.Fragment>
    )
  }
}

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

{/* <nav>
          <NavLink to='/about/team'>Team</NavLink>
          <NavLink to='/about/vision'>Vision</NavLink>
        </nav> */}

{/* <section>
            <Switch>
              <Route path='/about/team' component={Team} />
              <Route path='/about/vision' component={Vision} />
            </Switch>
          </section> */}
