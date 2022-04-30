import { utilService } from '../../../services/util.service.js'
import { mailService } from '../mail-service/mail-service.js'
import { MailHeader } from '../cmps/mail-header.jsx'
import { MailsSideBar } from '../cmps/mails-side-bar.jsx'
import { ComposeMailBox } from '../cmps/compose-mail-box.jsx'
const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {
    state = {
        mail: null,
        folder: null,
        isComposedBoxOpen: false,
    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getMailById(mailId)
            .then(mail => {
                if (!mail) return this.props.history.push('/mail')
                this.setState({ mail })
                this.setFolder()
            })
    }

    setFolder = () => {
        const folder = this.props.folder
        this.setState({ folder })
    }

    onOpenComposeBox = (isOpenState) => {
        if (isOpenState) this.setState({ isComposedBoxOpen: true })
        else this.setState({ isComposedBoxOpen: false })
    }

    onGetInboxUnreadMails = () => {
        return mailService.getInboxUnreadMails()
    }

    onDeleteMail = () => {
        const { id } = this.state.mail
        mailService.deleteMail(id).then(this.props.history.push('/mail'))
    }

    onSetFolder = (folder) => {
        this.props.onSetFolder(folder)
        this.props.history.push('/mail')
    }

    onGetInboxUnreadMails() {
        return mailService.getInboxUnreadMails()
    }

    render() {
        if (!this.state.mail || !this.state.folder) return <React.Fragment></React.Fragment>
        const { subject, to, from, sentAt, body, } = this.state.mail
        const { folder, isComposedBoxOpen } = this.state
        const date = utilService.formatTime(sentAt)
        return <section >
            <MailHeader onSetFilter={this.onSetFilter} />
            <main className="mail-details-container">
                <MailsSideBar
                    folder={folder}
                    onSetFolder={this.onSetFolder}
                    onOpenComposeBox={this.onOpenComposeBox}
                    onGetInboxUnreadMails={this.onGetInboxUnreadMails}
                />
                <div className="content-container">
                    <div className="mail-details-tools-container">
                        <Link to={'/mail'} className="back-btn-mail-details"><i className="fa-solid fa-arrow-left"></i></Link>
                        <span className="trash-container-mail-details" onClick={this.onDeleteMail}><img src="apps/mail/assets/img/grey-delete-icon.png" /></span>
                    </div>
                    <div className="sub-and-date-container">
                        <div className="subject">{subject}</div>
                        <span className="date">{date}</span>
                    </div>
                    <span className="to">to: <span>{to}</span></span>
                    <span className="from">from: <span>{from}</span></span>
                    <div className="body">{body}</div>
                </div>
            </main>
            {isComposedBoxOpen && <ComposeMailBox onOpenComposeBox={this.onOpenComposeBox} />}
        </section>
    }
}