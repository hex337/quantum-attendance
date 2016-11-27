class Member extends React.Component {
  render () {
    return (
      <div>
        <div>Id: {this.props.id}</div>
        <div>First Name: {this.props.firstName}</div>
        <div>Last Name: {this.props.lastName}</div>
        <div>Current Belt: {this.props.currentBelt}</div>
      </div>
    );
  }
}

Member.propTypes = {
  id: React.PropTypes.number,
  firstName: React.PropTypes.string,
  lastName: React.PropTypes.string,
  currentBelt: React.PropTypes.instanceOf(Belt)
};
