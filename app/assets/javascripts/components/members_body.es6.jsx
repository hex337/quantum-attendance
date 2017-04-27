class MembersBody extends React.Component {
  componentDidMount() {
    console.log("members body mounted");
  }

  render() {
    return (
      <div>
        <h1>Members Body Here</h1>
        <AllMembers />
      </div>
    )
  }
}
