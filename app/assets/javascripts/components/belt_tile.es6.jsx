class BeltTile extends React.Component {
  render () {
    var clsName = this.props.name.replace(/ /g, "-").toLowerCase();
    clsName = "belt-image " + clsName;
    return (
      <div key={this.props.id} className="belt-tile-container">
				<svg width="100" height="80" xmlns="http://www.w3.org/2000/svg" className={clsName}>
					 <g>
						<title>Layer 1</title>
						<polygon points="44.952 22.46 26.647 51.383 36.017 57.306 58.074 22.46" id="svg_2" fill="black" className="belt-main"/>
						<polygon points="42.39400100708008,22.459999084472656 15.145999908447266,22.459999084472656 15.145999908447266,35.44599914550781 34.172000885009766,35.44599914550781 " id="svg_3" className="belt-main"/>
						<g id="svg_4">
						 <path d="m60.625,22.459999l-1.68,2.665001l4.326,10.256001l0.205002,0c0.007,0.021999 21.91,0.065998 21.91,0.065998l0,-12.987l-24.761002,0z" id="svg_5" className="belt-main"/>
						 <polygon points="50.75,38.69599914550781 58.33000183105469,57.689002990722656 68.49099731445312,53.29399871826172 57.55400085449219,27.394001007080078 " id="svg_6" className="belt-main"/>
						</g>
						<rect transform="rotate(32.4771 35.9754 46.9636)" fill="#ffffff" strokeWidth="null" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x="30.520357" y="44.791818" width="10.910116" height="4.343599" id="svg_9" className="belt-stripe" />
						<rect id="svg_1" transform="rotate(-23.4809 60.625 48.7041)" fill="#ffffff" strokeWidth="null" strokeDasharray="null" strokeLinejoin="null" strokeLinecap="null" x="55.178695" y="46.298061" width="10.892653" height="4.811992" className="belt-stripe" />
					</g>
				</svg>
      </div>
    );
  }
}

Belt.propTypes = {
  id: React.PropTypes.number,
  name: React.PropTypes.string
};
