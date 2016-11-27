class School extends React.Component {
  render () {
    return (
      <div>
        <div>Id: {this.props.id}</div>
        <div>Name: {this.props.name}</div>
        <div>Slug: {this.props.slug}</div>
      </div>
    );
  }
}

School.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  slug: React.PropTypes.string
};
