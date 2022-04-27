export function MailPreview({ mail, onToggleMarkMail }) {
    const { to, subject, sentAt, body, isMarked, isRead, id } = mail
    const star = isMarked ? '★' : '☆'
    const starClass = isMarked ? 'marked' : ''
    const readImgSrc = isRead ? 'unread' : 'read'

    return <article className="preview-container">
        <span className={`star ${starClass}`} onClick={() => onToggleMarkMail(id)}>{star}</span>
        {/* TODO - MAIL_FROM */}
        <span>{to}</span>
        <div className="content">
            <span className="subject">{subject}</span>
            <span className="body">{body}</span>
        </div>
        {/* TODO - FORMAT_DATE */}
        <span>{sentAt}</span>
        <div><img src="./apps/mail/assets/img/delete-icon.png" /></div>
        <div><img src={`./apps/mail/assets/img/${readImgSrc}-mail-icon.png`} /></div>
    </article>
}
