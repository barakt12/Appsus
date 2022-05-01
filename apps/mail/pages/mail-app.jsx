import { mailService } from '../mail-service/mail-service.js'
import { MailHeader } from '../cmps/mail-header.jsx'
import { MailSideBar } from '../cmps/mail-side-bar.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'

export class MailApp extends React.Component {
  state = {
    mails: null,
    filterBy: null,
    folder: 'inbox', // inbox/starred/sent/trash/drafts
    activeMail: '',
    isComposedBoxOpen: false,
  }

  componentDidMount() {
    this.loadMails()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.folder !== this.props.match.params.folder) {
      this.loadMails()
    }
  }

  loadMails = () => {
    const { folder } = this.props.match.params
    const { filterBy } = this.state
    mailService
      .query(filterBy)
      .then((mails) => this.getMailsToDisplay(mails, folder))
      .then((mails) => this.setState({ mails, folder }))
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadMails())
  }

  onSetActiveMail = (mailId, isActive) => {
    if (isActive) {
      this.props.history.push(`/mail/view/${mailId}?folder=${this.state.folder}`)
    }
    // ** Toggle active mail -> Update: Not needed anymore, second click opens Mail details. * /
    // const { activeMail } = this.state
    // if (mailId === activeMail) {
    //   this.setState({ activeMail: null }, this.loadMails)
    //   return
    // }
    this.setState({ activeMail: mailId })
    mailService.toggleReadMail(mailId, true).then(this.loadMails)
  }

  getMailsToDisplay = (mails, folder) => {
    if (!folder) folder = 'inbox'
    const loggedInUserMail = mailService.getLoggedInUserMail()
    switch (folder) {
      case 'inbox':
        mails = mails.filter(mail => (mail.to.toLowerCase() === loggedInUserMail && !mail.isTrash));
        break;
      case 'starred':
        mails = mails.filter(mail => (mail.isMarked && !mail.isTrash));
        break;
      case 'sent':
        mails = mails.filter(mail => (mail.to.toLowerCase() !== loggedInUserMail && !mail.isTrash && !mail.isDraft));
        break;
      case 'trash':
        mails = mails.filter(mail => (mail.isTrash));
        break;
      case 'drafts':
        mails = mails.filter(mail => (mail.isDraft && !mail.isTrash));
        break;
    }
    return mails
  }

  onToggleMarkMail = (ev, mailId) => {
    ev.stopPropagation()
    mailService.toggleMarkMail(mailId).then(this.loadMails)
  }

  onToggleReadMail = (ev, mailId) => {
    ev.stopPropagation()
    mailService.toggleReadMail(mailId).then(this.loadMails)
  }

  onDeleteMail = (ev, mailId) => {
    ev.stopPropagation()
    mailService.deleteMail(mailId).then(this.loadMails)
  }

  onOpenComposeBox = (isOpenState) => {
    if (isOpenState) this.setState({ isComposedBoxOpen: true })
    else this.setState({ isComposedBoxOpen: false })
  }

  onGetInboxUnreadMails() {
    return mailService.getInboxUnreadMails()
  }

  render() {
    const { mails, folder, activeMail, isComposedBoxOpen } = this.state
    const app = true
    return (
      <section>
        <MailHeader onSetFilter={this.onSetFilter} app={app} />
        <main className='main-mail-container'>
          <MailSideBar
            onOpenComposeBox={this.onOpenComposeBox}
            onGetInboxUnreadMails={this.onGetInboxUnreadMails}
          />
          <MailList
            mails={mails}
            activeMail={activeMail}
            onToggleMarkMail={this.onToggleMarkMail}
            onDeleteMail={this.onDeleteMail}
            onToggleReadMail={this.onToggleReadMail}
            onSetActiveMail={this.onSetActiveMail}
          />
          {isComposedBoxOpen && <MailCompose onOpenComposeBox={this.onOpenComposeBox} loadMails={this.loadMails} />}
        </main>
      </section>
    )
  }
}
