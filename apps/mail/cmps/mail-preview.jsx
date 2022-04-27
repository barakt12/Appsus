export function MailPreview({ mail, onToggleMarkMail, onDeleteMail, onToggleReadMail }) {
    const { to, subject, sentAt, body, isMarked, isRead, id } = mail
    const star = isMarked ? '★' : '☆'
    const starClass = isMarked ? 'marked' : ''
    const readingClassName = isRead ? 'unread' : 'read'

    return <article className="preview-container">
        <span className={`star ${starClass}`} onClick={() => onToggleMarkMail(id)}>{star}</span>
        {/* TODO - MAIL_FROM */}
        <span className={`mailAddress ${readingClassName}`}>{to}</span>
        <div className="content">
            <span className={`subject ${readingClassName}`}>{subject}</span>
            <span className="body">{body}</span>
        </div>
        {/* TODO - FORMAT_DATE */}
        <span>{sentAt}</span>
        <div onClick={() => onDeleteMail(id)}><img src="./apps/mail/assets/img/delete-icon.png" /></div>
        <div onClick={() => onToggleReadMail(id)}><img src={`./apps/mail/assets/img/${readingClassName}-mail-icon.png`} /></div>
    </article>
}
