import { utilService } from '../../../services/util.service.js'
import { mailService } from '../mail-service/mail-service.js'
const { Link } = ReactRouterDOM

export function MailPreview({ props, mail }) {
  const { activeMail, onToggleMarkMail, onDeleteMail, onToggleReadMail, onSetActiveMail } = props
  const { from, to, subject, sentAt, body, isMarked, isRead, id, isDraft } = mail
  const date = utilService.formatTime(sentAt)
  const star = isMarked ? '★' : '☆'
  const starClass = isMarked ? 'marked' : ''
  const draftClass = isDraft ? 'draft' : ''
  const readingClassName = isRead ? 'read' : 'unread'
  const isActiveMailClassName = activeMail === id ? 'active' : ''
  const LoggedInUserMail = mailService.getLoggedInUserMail()
  const mailAddress = LoggedInUserMail === to ? from : to

  return (<article className={`preview-container ${readingClassName} ${isActiveMailClassName}`} onClick={() => onSetActiveMail(id, activeMail === id)}>
    <div className={`star ${starClass}`} onClick={(ev) => onToggleMarkMail(ev, id)}>{star}</div>
    <span className={`mailAddress ${readingClassName}`}>{mailAddress}</span>
    <div className="content">
      <span className={`subject ${readingClassName} ${isActiveMailClassName} ${draftClass}`}>{`${subject}`}</span>
      <span className={`body ${isActiveMailClassName}`}>{body}</span>
    </div>
    <span className={`mail-date ${readingClassName}`}>{date}</span>
    <div className="trash-container" onClick={(ev) => onDeleteMail(ev, id)}><img src="apps/mail/assets/img/grey-delete-icon.png" /></div>
    <div className="reading-container" onClick={(ev) => onToggleReadMail(ev, id)}><img src={`apps/mail/assets/img/grey-${readingClassName}-mail-icon.png`} /></div>
    <Link className="full-screen-container" to={`/mail/${id}`} ><img src="apps/mail/assets/img/full-screen-icon.png" /></Link>
  </article>
  )
}
