export function ComposeMailBox({ onOpenComposeBox }) {

    return <div className="compose-box-container">
        <div className="compose-title">
            <span>New Message</span>
            <span className="close-compose-btn" onClick={() => onOpenComposeBox(false)}>&times;</span>
        </div>
        <div className="compose-to">
            <textarea maxlength="55" placeholder="To"></textarea>
        </div>
        <div className="compose-subject">
            <textarea maxlength="55" placeholder="Subject"></textarea>
        </div>
        <div className="compose-content">
            <textarea></textarea>
        </div>
        <div className="compose-tools">
            <button>Send</button>
            <img src="apps/mail/assets/img/delete-icon.png" />
        </div>

    </div>
}