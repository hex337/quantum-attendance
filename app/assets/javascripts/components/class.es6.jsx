class Class extends React.Component {
  render () {
    return (
      <div>
        <div>Met: {this.props.met}</div>
        <div>Comment: {this.props.comment}</div>
        <div>School: {this.props.school}</div>
        <div>Meeting Type: {this.props.meetingType}</div>
        <div>Members: {this.props.members}</div>
      </div>
    );
  }
}

Class.propTypes = {
  met: React.PropTypes.string,
  comment: React.PropTypes.string,
  school: React.PropTypes.instanceOf(School),
  meetingType: React.PropTypes.instanceOf(MeetingType),
  members: React.PropTypes.array
};
