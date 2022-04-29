import { mailService } from '../mail-service/mail-service.js'
import { MailHeader } from '../cmps/mail-header.jsx'
import { MailsSideBar } from '../cmps/mails-side-bar.jsx'
import { MailsList } from '../cmps/mails-list.jsx'
import { ComposeMailBox } from '../cmps/compose-mail-box.jsx'

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

  loadMails = () => {
    const { filterBy } = this.state
    mailService
      .query(filterBy)
      .then((mails) => this.getMailsToDisplay(mails))
      .then((mails) => this.setState({ mails }))
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadMails())
  }

  onSetFolder = (folder) => {
    this.setState({ folder }, this.loadMails())
  }

  onSetActiveMail = (mailId) => {
    const { activeMail } = this.state
    if (mailId === activeMail) {
      this.setState({ activeMail: null }, this.loadMails)
      return
    }
    this.setState({ activeMail: mailId })
    mailService.toggleReadMail(mailId, true).then(this.loadMails)
  }

  getMailsToDisplay = (mails) => {
    let { folder } = this.state
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

  onOpenComposeBox = (isOpenState) => { //TODO - OTHER NAME?
    if (isOpenState) this.setState({ isComposedBoxOpen: true })
    else this.setState({ isComposedBoxOpen: false })
  }

  onGetInboxUnreadMails() {
    return mailService.getInboxUnreadMails()
  }

  render() {
    const { mails, folder, activeMail, isComposedBoxOpen } = this.state
    return (
      <section>
        <MailHeader onSetFilter={this.onSetFilter} />
        <main className='main-mail-container'>
          <MailsSideBar
            folder={folder}
            onSetFolder={this.onSetFolder}
            onOpenComposeBox={this.onOpenComposeBox}
            onGetInboxUnreadMails={this.onGetInboxUnreadMails}
          />
          <MailsList
            mails={mails}
            activeMail={activeMail}
            onToggleMarkMail={this.onToggleMarkMail}
            onDeleteMail={this.onDeleteMail}
            onToggleReadMail={this.onToggleReadMail}
            onSetActiveMail={this.onSetActiveMail}
          />
          {isComposedBoxOpen && (
            <ComposeMailBox onOpenComposeBox={this.onOpenComposeBox} loadMails={this.loadMails} />
          )}
        </main>
      </section>
    )
  }
}
