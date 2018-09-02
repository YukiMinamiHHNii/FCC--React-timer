import React from "react";

class BreakCtrl extends React.Component {
	render() {
		return (
			<div id="break-ctrl">
				<h2 id="break-label">Break Length</h2>
				<div className="pad">
					<button id="break-decrement" value="-" onClick={this.props.handler}>
						-
					</button>
					<h3 id="break-length">{this.props.length}</h3>
					<button id="break-increment" value="+" onClick={this.props.handler}>
						+
					</button>
				</div>
			</div>
		);
	}
}

export default BreakCtrl;
