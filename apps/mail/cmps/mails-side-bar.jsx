export function MailsSideBar({ folder, onSetFolder, onOpenComposeBox, onGetInboxUnreadMails }) {
    const inboxActiveClass = folder === 'inbox' ? 'active' : ''
    const starredActiveClass = folder === 'starred' ? 'active' : ''
    const sentActiveClass = folder === 'sent' ? 'active' : ''
    const trashActiveClass = folder === 'trash' ? 'active' : ''
    const draftsActiveClass = folder === 'drafts' ? 'active' : ''
    const inboxUnreadMails = onGetInboxUnreadMails()

    return <section className="side-bar">
        <div className="fixed-pos-side-bar">
            <div className="compose-container" onClick={() => onOpenComposeBox(true)}>
                <img src="./apps/mail/assets/img/compose-icon.png" className="compose-img" />
                <span>Compose</span>
            </div>
            <div className="folders-container">
                <div className={`folder inbox-folder ${inboxActiveClass}`} onClick={() => onSetFolder('inbox')}>
                    <img src="apps/mail/assets/img/grey-inbox-icon.png" className="side-img inbox-img" />
                    <span className="content inbox-content">
                        <span className='content inbox-content'>Inbox</span>
                        <span className='content inbox-content amount'>{inboxUnreadMails}</span>
                    </span>
                </div>
                <div className={`folder ${starredActiveClass}`} onClick={() => onSetFolder('starred')}>
                    <img src="apps/mail/assets/img/grey-starred-icon.png" className="side-img" />
                    <span className="content">Starred</span>
                </div>
                <div className={`folder ${sentActiveClass}`} onClick={() => onSetFolder('sent')}>
                    <img src="apps/mail/assets/img/grey-sent-icon.png" className="side-img" />
                    <span className="content">Sent</span>
                </div>
                <div className={`folder ${trashActiveClass}`} onClick={() => onSetFolder('trash')}>
                    <img src="apps/mail/assets/img/grey-delete-icon.png" className="side-img" />
                    <span className="content">Trash</span>
                </div>
                <div className={`folder ${draftsActiveClass}`} onClick={() => onSetFolder('drafts')}>
                    <img src="apps/mail/assets/img/grey-drafts-icon.png" className="side-img" />
                    <span className="content">Drafts</span>
                </div>
            </div>

        </div>
    </section>
}