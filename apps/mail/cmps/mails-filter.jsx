export class MailsFilter extends React.Component {
  state = {
    filterBy: {
      isRead: '', // TODO
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
      <div className='mail-filter-box-container'>
        <form>
          <input
            type='text'
            placeholder='Search mail'
            name='searchInp'
            value={searchInp}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}
