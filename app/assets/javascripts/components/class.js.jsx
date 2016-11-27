var Class = React.createClass({
  propTypes: {
    met: React.PropTypes.string,
    comment: React.PropTypes.string,
    school: React.PropTypes.instanceOf(School),
    meetingType: React.PropTypes.instanceOf(MeetingType),
    members: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Member))
  },

  render: function() {
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
});
