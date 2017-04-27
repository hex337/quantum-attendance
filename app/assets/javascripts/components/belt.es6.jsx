class Belt extends React.Component {
  render () {
    return (
      <div key={this.props.id}>
        <div>Id: {this.props.id}</div>
        <div>Belt Name: {this.props.name}</div>
      </div>
    );
  }
}

Belt.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string
};
