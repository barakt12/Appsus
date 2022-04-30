export class MailsFilter extends React.Component {
  state = {
    filterBy: {
      searchInp: '',
    },
  }

  handleChange = ({ target }) => {
    const value = target.value
    this.setState(
      (prevState) => ({
        filterBy: { ...prevState.filterBy, searchInp: value },
      }),
      () => this.props.onSetFilter(this.state.filterBy)
    )
  }

  render() {
    const { searchInp } = this.state

    return (

      <form className='mail-filter-box-container'>
        <img className="search-icon" src="apps/mail/assets/img/search-icon.png"></img>
        <input
          type='text'
          placeholder='Search mail'
          name='searchInp'
          value={searchInp}
          onChange={this.handleChange}
        />
        <img className="search-icon" src="apps/mail/assets/img/search-bar-icon.png"></img>
      </form>

    )
  }
}
