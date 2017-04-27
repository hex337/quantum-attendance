class MemberSearch extends React.Component {
  render() {
    return (
      <div className="member-search-container">
        <div className="input-group">
          <span className="input-group-addon">
            <label>
              <input id="active-checkbox" type="checkbox" onChange={this.props.onActiveChange} checked={this.props.active} aria-label="Active" />
              <span style={{paddingLeft: 5}}>
                Active
              </span>
            </label>
          </span>
          <input className="form-control" type="text" value={this.props.query} onChange={this.props.onSearchChange} placeholder="Search by Name or Belt" />
        </div>
      </div>
    );
  }
}

MemberSearch.propTypes = {
  query: React.PropTypes.string,
  active: React.PropTypes.bool,
  onActiveChange: React.PropTypes.func.isRequired,
  onSearchChange: React.PropTypes.func.isRequired
}
