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

    onToggleMarkMail = (mailId) => {
        const { filterBy } = this.state
        mailService.toggleMarkMail(mailId).then()
            .then(() => mailService.query(filterBy)
                .then(mails => this.setState({ mails })))
    }

    onToggleReadMail = (mailId) => {
        const { filterBy } = this.state
        mailService.toggleReadMail(mailId).then()
            .then(() => mailService.query(filterBy)
                .then(mails => this.setState({ mails })))
    }

    onDeleteMail = (mailId) => {
        const { filterBy } = this.state
        mailService.deleteMail(mailId).then()
            .then(() => mailService.query(filterBy)
                .then(mails => this.setState({ mails })))
    }

    render() {
        return <section>
            <MailHeader onSetFilter={this.onSetFilter} />
            <main className="main-mail-container">
                <MailsSideBar />
                <MailsList mails={this.state.mails} onToggleMarkMail={this.onToggleMarkMail} onDeleteMail={this.onDeleteMail} onToggleReadMail={this.onToggleReadMail} />
            </main>
        </section>
    }
}