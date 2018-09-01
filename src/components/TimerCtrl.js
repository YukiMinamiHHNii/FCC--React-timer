import React from "react";

class Timer extends React.Component {
	render() {
		return (
			<div id="timer-ctrl">
				<h2 id="timer-label">Session</h2>
				<h3 id="time-left">
					{this.props.minutes}:{this.props.seconds}
				</h3>
				<div className="pad">
					<button id="start-stop">Start/Stop</button>
					<button id="reset">Reset</button>
				</div>
			</div>
		);
	}
}

export default Timer;
