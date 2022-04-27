export function MailsSideBar() {
    return <section className="side-bar">
        <div className="compose-container">
            <span>+</span>
            <span>Compose</span>
        </div>
        <div className="folders-container">
            <span>Inbox</span>
            <span>Starred</span>
            <span>Sent</span>
            <span>Drafts</span>
        </div>
    </section>
}