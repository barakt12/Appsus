export class MailsSideBar extends React.Component {
    state = {
        activeFolder: 'inbox' // inbox/starred/sent/drafts
    }

    //TODO - FILTER
    onSetFolder = (value) => {
        if (this.state.activeFolder === value) return
        this.setState({ activeFolder: value })
    }


    render() {
        const { activeFolder } = this.state
        const inboxActiveClass = activeFolder === 'inbox' ? 'active' : ''
        const starredActiveClass = activeFolder === 'starred' ? 'active' : ''
        const sentActiveClass = activeFolder === 'sent' ? 'active' : ''
        const draftsActiveClass = activeFolder === 'drafts' ? 'active' : ''

        return <section className="side-bar">
            <div className="compose-container">
                <span>+</span>
                <span>Compose</span>
            </div>
            <div className="folders-container">
                <div className={`folder inbox-folder ${inboxActiveClass}`} onClick={() => this.onSetFolder('inbox')}>
                    <img src="apps/mail/assets/img/inbox-icon.png" className="side-img" />
                    <span className="content inbox-content">
                        <span className={`content inbox-content ${inboxActiveClass}`}>Inbox</span>
                        <span className={`content inbox-content amount ${inboxActiveClass}`}>555</span>
                    </span>
                </div>
                <div className={`folder ${starredActiveClass}`} onClick={() => this.onSetFolder('starred')}>
                    <img src="apps/mail/assets/img/starred-icon.png" className="side-img" />
                    <span className="content">Starred</span>
                </div>
                <div className={`folder ${sentActiveClass}`} onClick={() => this.onSetFolder('sent')}>
                    <img src="apps/mail/assets/img/sent-icon.png" className="side-img" />
                    <span className="content">Sent</span>
                </div>
                <div className={`folder ${draftsActiveClass}`} onClick={() => this.onSetFolder('drafts')}>
                    <img src="apps/mail/assets/img/drafts-icon.png" className="side-img" />
                    <span className="content">Drafts</span>
                </div>
            </div>
        </section>
    }
}