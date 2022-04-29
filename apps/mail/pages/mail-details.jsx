import { utilService } from '../../../services/util.service.js'
import { mailService } from '../mail-service/mail-service.js'
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

    formattedDate = (timeStamp) => {
        const date = new Date(timeStamp)
        const day = date.getDate()
        const month = utilService.getMonthName(date)
        return `${month} ${day}`
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
        const { subject, to, sentAt, body, } = this.state.mail
        const { folder, isComposedBoxOpen } = this.state
        const date = this.formattedDate(sentAt)
        return <section className="mail-details-container">
            <MailsSideBar
                folder={folder}
                onSetFolder={this.onSetFolder}
                onOpenComposeBox={this.onOpenComposeBox}
                onGetInboxUnreadMails={this.onGetInboxUnreadMails}
            />
            <main className="content-container">
                <div className="mail-details-tools-container">
                    <Link to={'/mail'} className="back-btn-mail-details"><i className="fa-solid fa-arrow-left"></i></Link>
                    <span className="trash-container-mail-details" onClick={this.onDeleteMail}><img src="apps/mail/assets/img/delete-icon.png" /></span>
                </div>
                <div className="subject">{subject}</div>
                <div className="to-and-date-container">
                    <span className="to">{to}</span>
                    <span className="date">{date}</span>
                </div>
                <div className="body">{body}</div>
            </main>
            {isComposedBoxOpen && <ComposeMailBox onOpenComposeBox={this.onOpenComposeBox} />}
        </section>
    }
}