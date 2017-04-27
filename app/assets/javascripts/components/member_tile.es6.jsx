class MemberTile extends React.Component {
  render () {
    return (
      <div key={this.props.id} className="member-tile-container">
        <BeltTile id={this.props.belt.id} name={this.props.belt.name} />
        <div className="name-container">{this.props.name}</div>
      </div>
    );
  }
}

Member.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string,
  current_belt: React.PropTypes.instanceOf(Belt)
};
