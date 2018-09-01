import React from "react";
import "./App.css";
import BreakCtrl from "./components/BreakCtrl";
import SessionCtrl from "./components/SessionCtrl";
import TimerCtrl from "./components/TimerCtrl";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength: 5,
			sessionLength: 25,
			minutesLeft: "25",
			secondsLeft: "00"
		};
	}
	render() {
		return (
			<div className="app">
				<SessionCtrl length={this.state.sessionLength} />
				<TimerCtrl minutes={this.state.minutesLeft} seconds={this.state.secondsLeft}/>
				<BreakCtrl length={this.state.breakLength} />
			</div>
		);
	}
}

export default App;
