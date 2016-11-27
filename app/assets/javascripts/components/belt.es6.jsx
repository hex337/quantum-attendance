class Belt extends React.Component {
  render () {
    return (
      <div>
        <div>Id: {this.props.id}</div>
        <div>Name: {this.props.name}</div>
      </div>
    );
  }
}

Belt.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string
};
