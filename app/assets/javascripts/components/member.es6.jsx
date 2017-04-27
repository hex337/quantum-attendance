class Member extends React.Component {
  render () {
    return (
      <div key={this.props.id}>
        <div>Id: {this.props.id}</div>
        <div>First Name: {this.props.first_name}</div>
        <div>Last Name: {this.props.last_name}</div>
        <Belt id={this.props.belt.id} name={this.props.belt.name} />
      </div>
    );
  }
}

Member.propTypes = {
  id: React.PropTypes.number,
  first_name: React.PropTypes.string,
  last_name: React.PropTypes.string,
  current_belt: React.PropTypes.instanceOf(Belt)
};
