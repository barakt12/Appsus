export function MailPreview({ mail }) {
    console.log(mail)

    const { to, subject, sentAt, body } = mail
    return <article className="preview-container">
        {/* FULL_STAR-9733 */}
        <span className="star">&#9734;</span>
        {/* TODO - MAIL_FROM */}
        <span>{to}</span>
        <span className="subject">{subject}</span>
        <span className="body">{body}</span>
        {/* TODO - FORMATED_DATE */}
        <span>{sentAt}</span>
    </article>
}