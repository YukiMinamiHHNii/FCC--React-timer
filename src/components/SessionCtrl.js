import React from "react";

class SessionCtrl extends React.Component {
	render() {
		return (
			<div id="session-ctrl">
				<h2 id="session-label">Session Length</h2>
				<div className="pad">
					<button id="session-decrement" value="-" onClick={this.props.handler}>
						-
					</button>
					<h3 id="session-length">{this.props.length}</h3>
					<button id="session-increment" value="+" onClick={this.props.handler}>
						+
					</button>
				</div>
			</div>
		);
	}
}

export default SessionCtrl;
