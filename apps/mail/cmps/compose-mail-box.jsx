import { utilService } from '../../../services/util.service.js'
import { mailService } from '../../mail/mail-service/mail-service.js'

export class ComposeMailBox extends React.Component {

    state = {
        draft: {
            id: null,
            subject: null,
            body: null,
            sentAt: null,
            to: null,
        }
    }

    intervalId

    componentDidMount() {
        this.setState({ draft: { id: utilService.makeId() } }, () => mailService.addDraftMail(this.state.draft))
        this.intervalId = setInterval(this.onAutoSaveDraft, 5000)
    }

    componentWillUnmount() {
        console.log('CLEAR INTERVAL')
        clearInterval(this.intervalId)
    }

    handleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        this.setState((prevState) => ({ draft: { ...prevState.draft, [field]: value, sentAt: Date.now() } }))
    }

    onAutoSaveDraft = () => {
        mailService.autoSaveDraft(this.state.draft)
    }

    onSendMail = (ev) => {
        ev.preventDefault()
        mailService.sendMail(this.state.draft)
    }

    render() {
        return <div className="compose-box-container">
            <div className="compose-title">
                <span>New Message</span>
                <span className="close-compose-btn" onClick={() => this.props.onOpenComposeBox(false)}>&times;</span>
            </div>
            <form className="compose-form" onSubmit={(ev) => console.log(ev.target[0].value)}>
                <div className="compose-to">
                    <textarea maxLength="55" placeholder="To" name="to" onChange={this.handleChange}></textarea>
                </div>
                <div className="compose-subject">
                    <textarea maxLength="55" placeholder="Subject" name="subject" onChange={this.handleChange}></textarea>
                </div>
                <div className="compose-content">
                    <textarea name="body" onChange={this.handleChange}></textarea>
                </div>
                <div className="compose-tools">
                    <button onClick={(ev) => this.onSendMail(ev)}>Send</button>
                    <img src="apps/mail/assets/img/delete-icon.png" />
                </div>
            </form>

        </div>
    }

}