import React from "react";

class TimerCtrl extends React.Component {
	render() {
		return (
			<div id="timer-ctrl">
				<h2 id="timer-label">{this.props.type}</h2>
				<h3 id="time-left">{this.props.time}</h3>
				<div className="pad">
					<button
						id="start_stop"
						value="start/stop"
						onClick={this.props.handler}
					>
						Start/Stop
					</button>
					<button id="reset" value="reset" onClick={this.props.reset}>
						Reset
					</button>
				</div>
			</div>
		);
	}
}

export default TimerCtrl;
