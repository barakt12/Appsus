import { utilService } from '../../../services/util.service.js'
const { Link } = ReactRouterDOM

export function MailPreview({ props, mail }) {
  const { activeMail, onToggleMarkMail, onDeleteMail, onToggleReadMail, onSetActiveMail } = props
  const { to, subject, sentAt, body, isMarked, isRead, id } = mail
  const date = formattedDate(sentAt)
  const star = isMarked ? '★' : '☆'
  const starClass = isMarked ? 'marked' : ''
  const readingClassName = isRead ? 'read' : 'unread'
  const isActiveMailClassName = activeMail === id ? 'active' : ''

  function formattedDate(timeStamp) {
    const date = new Date(timeStamp)
    const day = date.getDate()
    const month = utilService.getMonthName(date)
    return `${month} ${day}`
  }

  return (<article className={`preview-container ${isActiveMailClassName}`} onClick={() => onSetActiveMail(id)}>
    <div className={`star ${starClass}`} onClick={(ev) => onToggleMarkMail(ev, id)}>{star}</div>
    <span className={`mailAddress ${readingClassName}`}>{to}</span>
    <div className="content">
      <span className={`subject ${readingClassName} ${isActiveMailClassName}`}>{`${subject}`}</span>
      <span className={`body ${isActiveMailClassName}`}>{body}</span>
    </div>
    <span className={`mail-date ${readingClassName}`}>{date}</span>
    <div className="trash-container" onClick={(ev) => onDeleteMail(ev, id)}><img src="apps/mail/assets/img/grey-delete-icon.png" /></div>
    <div className="reading-container" onClick={(ev) => onToggleReadMail(ev, id)}><img src={`apps/mail/assets/img/grey-${readingClassName}-mail-icon.png`} /></div>
    <Link className="full-screen-container" to={`/mail/${id}`} ><img src="apps/mail/assets/img/full-screen-icon.png" /></Link>
  </article>
  )
}
