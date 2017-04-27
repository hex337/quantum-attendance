class AllMembers extends React.Component {
  constructor(props) {
    super(props);

    this.handleActiveChange = this.handleActiveChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);

    this.state = {
      active: true,
      members: [],
      search: ""
    }
  }

  componentDidMount() {
    $.getJSON('/members.json', (response) => { this.setState({ members: response }) });
  }

  performSearch(queryString, active) {
    $.getJSON('/members.json?query=' + queryString + '&active=' + active, (response) => { this.setState({ members: response }) });
  }

  handleActiveChange(evt) {
    var val = evt.target.checked;
    this.setState({active: val});
    this.performSearch(this.state.search, val);
  }

  handleSearchChange(evt) {
    var search = evt.target.value;
    this.setState({search: search});

    if (search.length > 2) {
      this.performSearch(search, this.state.active);
    }
  }

  render() { 
    var mems = this.state.members.map((member) => {
      return (
        <MemberTile key={member.id} id={member.id} name={member.first_name + " " + member.last_name} belt={member.belt} />
      );
    });

    return (
      <div>
        <h1>Members</h1>
        <MemberSearch query={this.state.search} active={this.state.active} onSearchChange={this.handleSearchChange} onActiveChange={this.handleActiveChange} />
        <div className="all-members-container">
          {mems}
          <div className="clearfix" />
        </div>
      </div>
    )
  }
}

AllMembers.propTypes = {
  active: React.PropTypes.bool,
  search: React.PropTypes.string,
  onActiveChange: React.PropTypes.func,
  onSearchChange: React.PropTypes.func
}
