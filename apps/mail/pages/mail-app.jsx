import { mailService } from '../mail-service/mail-service.js'
import { MailHeader } from '../cmps/mail-header.jsx'
import { MailsSideBar } from '../cmps/mails-side-bar.jsx'
import { MailsList } from '../cmps/mails-list.jsx'

export class MailApp extends React.Component {
    state = {
        mails: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const { filterBy } = this.state
        mailService.query(filterBy)
            .then(mails => this.setState({ mails }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }

    render() {
        return <section>
            <MailHeader onSetFilter={this.onSetFilter} />
            <main className="main-mail-container">
                <MailsSideBar />
                <MailsList mails={this.state.mails} />
            </main>
        </section>
    }
}