import { eventBusService } from '../services/event-bus.service.js'
export class Screen extends React.Component {
  state = {
    isActive: false,
  }

  componentDidMount() {
    eventBusService.on('screen', (isActive) => {
      this.setState({ isActive: isActive })
    })
  }

  closeScreen = () => {
    this.setState({ isActive: false })
  }

  componentWillUnmount() {
    // this.removeEvent()
  }

  render() {
    const { isActive } = this.state
    return (
      <section
        className={`screen ${isActive ? 'active' : ''}`}
        onClick={this.closeScreen}
      ></section>
    )
  }
}
