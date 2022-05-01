const { NavLink } = ReactRouterDOM


export function MailSideBar({ folder, onSetFolder, onOpenComposeBox, onGetInboxUnreadMails }) {
    const inboxUnreadMails = onGetInboxUnreadMails()

    return <section className="side-bar">
        <div className="fixed-pos-side-bar">
            <div className="compose-container" onClick={() => onOpenComposeBox(true)}>
                <img src="./apps/mail/assets/img/compose-icon.png" className="compose-img" />
                <span>Compose</span>
            </div>
            <div className="folders-container">
                <NavLink to='/mail/inbox' >
                    <div className={'folder inbox-folder'}>
                        <img src="apps/mail/assets/img/grey-inbox-icon.png" className="side-img inbox-img" />
                        <span className="content inbox-content">
                            <span className='content inbox-content'>Inbox</span>
                            <span className='content inbox-content amount'>{inboxUnreadMails}</span>
                        </span>
                    </div>
                </NavLink>
                <NavLink to='/mail/starred'>
                    <div className={'folder'} >
                        <img src="apps/mail/assets/img/grey-starred-icon.png" className="side-img" />
                        <span className="content">Starred</span>
                    </div>
                </NavLink>
                <NavLink to='/mail/sent'>
                    <div className={'folder'}>
                        <img src="apps/mail/assets/img/grey-sent-icon.png" className="side-img" />
                        <span className="content">Sent</span>
                    </div>
                </NavLink>
                <NavLink to='/mail/trash'>
                    <div className={'folder'}>
                        <img src="apps/mail/assets/img/grey-delete-icon.png" className="side-img" />
                        <span className="content">Trash</span>
                    </div>
                </NavLink>
                <NavLink to='/mail/drafts'>
                    <div className={'folder'}>
                        <img src="apps/mail/assets/img/grey-drafts-icon.png" className="side-img" />
                        <span className="content">Drafts</span>
                    </div>
                </NavLink>
            </div>

        </div>
    </section>
}