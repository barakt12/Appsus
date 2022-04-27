import { MailPreview } from '../cmps/mail-preview.jsx'

export function MailsList({ mails, onToggleMarkMail, onDeleteMail, onToggleReadMail }) {
    console.log(mails)
    return <section className="mail-list-container">
        {mails && mails.map(mail => <MailPreview key={mail.id} mail={mail} onToggleMarkMail={onToggleMarkMail} onDeleteMail={onDeleteMail} onToggleReadMail={onToggleReadMail} />)}
    </section>
}