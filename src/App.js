import React from "react";
import "./App.css";
import BreakCtrl from "./components/BreakCtrl";
import SessionCtrl from "./components/SessionCtrl";
import TimerCtrl from "./components/TimerCtrl";

let intervalHelper;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			breakLength: 5,
			sessionLength: 25,
			minutesLeft: 25,
			secondsLeft: 0,
			running: false
		};
		this.timerOperations = this.timerOperations.bind(this);
		this.breakOperations = this.breakOperations.bind(this);
		this.sessionOperations = this.sessionOperations.bind(this);
		this.timerTick = this.timerTick.bind(this);
	}
	timerOperations(e) {
		switch (e.target.value) {
			case "reset":
				this.timerTick(!this.state.running);
				this.setState({
					breakLength: 5,
					sessionLength: 25,
					minutesLeft: 25,
					secondsLeft: 0
				});
				break;
			case "start/stop":
				this.timerTick(!this.state.running);
				/*this.setState(prevState => {
					this.timerTick(
						!prevState.running,
						prevState.minutesLeft,
						prevState.secondsLeft
					);
					return {
						running: !prevState.running
					};
				});*/
				break;
			default:
				break;
		}
	}
	breakOperations(e) {
		switch (e.target.value) {
			case "+":
				this.setState(prevState => {
					return prevState.breakLength + 1 <= 60
						? {
								breakLength: prevState.breakLength + 1,
								secondsLeft: 0
						  }
						: "";
				});
				break;
			case "-":
				this.setState(prevState => {
					return prevState.breakLength - 1 > 0
						? {
								breakLength: prevState.breakLength - 1,
								secondsLeft: 0
						  }
						: "";
				});
				break;
			default:
				break;
		}
	}
	sessionOperations(e) {
		switch (e.target.value) {
			case "+":
				this.setState(prevState => {
					return prevState.sessionLength + 1 <= 60 && !this.state.running
						? {
								sessionLength: prevState.sessionLength + 1,
								minutesLeft: prevState.sessionLength + 1,
								secondsLeft: 0
						  }
						: "";
				});
				break;
			case "-":
				this.setState(prevState => {
					return prevState.sessionLength - 1 > 0 && !this.state.running
						? {
								sessionLength: prevState.sessionLength - 1,
								minutesLeft: prevState.sessionLength - 1,
								secondsLeft: 0
						  }
						: "";
				});
				break;
			default:
				break;
		}
	}
	timerTick(status) {
		let min = this.state.minutesLeft,
				sec = this.state.secondsLeft;
		if (status) {
			intervalHelper = setInterval(() => {
				this.setState(prevState => {
					return {
						running: min===0 && sec===0?false: true,
						minutesLeft: sec === 0 ? (min-=1) : min,
						secondsLeft: sec === 0 ? (sec += 59): (sec -= 1)
					};
				});
				if(!this.state.running){
					console.log("clearing")
					clearInterval(intervalHelper);
				}
			}, 1000);
		} else {
			clearInterval(intervalHelper);
			return this.setState({ running: false });
		}
	}
	render() {
		return (
			<div className="app">
				<SessionCtrl
					length={this.state.sessionLength}
					handler={this.sessionOperations}
				/>
				<TimerCtrl
					minutes={this.state.minutesLeft}
					seconds={this.state.secondsLeft}
					handler={this.timerOperations}
				/>
				<BreakCtrl
					length={this.state.breakLength}
					handler={this.breakOperations}
				/>
			</div>
		);
	}
}

export default App;
