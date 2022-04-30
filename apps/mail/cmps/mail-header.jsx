
import { MailsFilter } from '../cmps/mails-filter.jsx'
import { Menu } from './menu.jsx'

export class MailHeader extends React.Component {
    state = {
        isOpen: false,
    }

    onToggleMenu = () => {
        const { isOpen } = this.state
        this.setState({ isOpen: !isOpen })
    }

    render() {
        const { app } = this.props
        const { isOpen } = this.state
        return <section className="mail-header">
            <div className="logo-container">
                <img className="mail-logo" src="assets/img/gmail.svg"></img>
                <span>Gmail</span>
            </div>
            {app && <MailsFilter onSetFilter={this.props.onSetFilter} />}
            <a className='menu' onClick={this.onToggleMenu}>
                <img src='./assets/img/menu.svg' />
            </a>
            <nav className=''>
                {isOpen && <Menu onToggleMenu={this.onToggleMenu} />}
            </nav>
        </section>
    }
}