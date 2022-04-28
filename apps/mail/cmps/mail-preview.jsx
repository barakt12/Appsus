export function MailPreview({ props, mail }) {
  const { activeMail, onToggleMarkMail, onDeleteMail, onToggleReadMail, onSetActiveMail } = props
  const { to, subject, sentAt, body, isMarked, isRead, id } = mail
  const star = isMarked ? '★' : '☆'
  const starClass = isMarked ? 'marked' : ''
  const readingClassName = isRead ? 'read' : 'unread'
  const isActiveMailClassName = activeMail === id ? 'active' : ''

  return (<article className={`preview-container ${isActiveMailClassName}`} onClick={() => onSetActiveMail(id)}>
    <span className={`star ${starClass}`} onClick={(ev) => onToggleMarkMail(ev, id)}>{star}</span>
    <span className={`mailAddress ${readingClassName}`}>{to}</span>
    <div className="content">
      <span className={`subject ${readingClassName} ${isActiveMailClassName}`}>{`${subject}`}</span>
      <span className={`body ${isActiveMailClassName}`}>{body}</span>
    </div>
    {/* TODO - FORMAT_DATE */}
    <span className="mail-date">{sentAt}</span>
    <div className="trash-container" onClick={(ev) => onDeleteMail(ev, id)}><img src="apps/mail/assets/img/delete-icon.png" /></div>
    <div className="reading-container" onClick={(ev) => onToggleReadMail(ev, id)}><img src={`apps/mail/assets/img/${readingClassName}-mail-icon.png`} /></div>
  </article>
  )
}
