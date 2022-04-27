const { Route, NavLink, Switch } = ReactRouterDOM

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
      <section className='about'>
        {/* <nav>
          <NavLink to='/about/team'>Team</NavLink>
          <NavLink to='/about/vision'>Vision</NavLink>
        </nav> */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          cupiditate sequi blanditiis dicta debitis mollitia nesciunt
          consectetur quo atque aperiam totam eligendi, explicabo, nihil,
          inventore earum obcaecati placeat voluptatum vero.
        </p>
        <section>
          <Switch>
            <Route path='/about/team' component={Team} />
            <Route path='/about/vision' component={Vision} />
          </Switch>
        </section>
      </section>
    )
  }
}

function Team() {
  return (
    <section className='team'>
      <div>Mishu Mashu</div>
      <div>Jorge </div>
    </section>
  )
}

function Vision() {
  return (
    <section className='vision'>
      <div>To take your money</div>
      <div>Sell nice cars</div>
    </section>
  )
}
