export class MailsFilter extends React.Component {
<<<<<<< HEAD
    state = {
        filterBy: {
            isRead: '',
            searchInp: '',
            // isStarred: '',
            // folder: '', // inbox/sent/drafts/trash            
        }
    }



    handleChange = ({ target }) => {
        const value = target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, searchInp: value } }),
            () => this.props.onSetFilter(this.state.filterBy))
    }

    render() {
        const { searchInp } = this.state

        return <div className="mail-filter-box-container">
            <form>
                <input type="text" placeholder="Search mail" name="searchInp" value={searchInp} onChange={this.handleChange} />
            </form>
        </div>
    }
}
=======
  state = {
    filterBy: {
      isRead: '',
      searchInp: '',
      // isStarred: '',
      // folder: '', // inbox/sent/drafts/trash
    },
  }

  render() {
    return <div>mail filter</div>
  }
}
>>>>>>> 8b5b207b99dd6ffb1c4af6b9535dc741e848585a
