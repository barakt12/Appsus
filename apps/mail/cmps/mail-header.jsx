
import { MailsFilter } from '../cmps/mails-filter.jsx'

export function MailHeader({ onSetFilter }) {
    return <section className="mail-header">
        <div className="mail-logo">GMAIL</div>
        <MailsFilter onSetFilter={onSetFilter} />
        <div className="mail-header-btns">ICONS</div>
    </section>
}