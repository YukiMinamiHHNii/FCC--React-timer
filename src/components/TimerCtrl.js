import React from "react";

class Timer extends React.Component {
	render() {
		return (
			<div id="timer-ctrl">
				<h2 id="timer-label">Session</h2>
				<h3 id="time-left">
					{this.props.minutes}:{ this.props.seconds<10?"0".concat(this.props.seconds):this.props.seconds}
				</h3>
				<div className="pad">
					<button
						id="start_stop"
						value="start/stop"
						onClick={this.props.handler}
					>
						Start/Stop
					</button>
					<button id="reset" value="reset" onClick={this.props.handler}>
						Reset
					</button>
				</div>
			</div>
		);
	}
}

export default Timer;
