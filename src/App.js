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
			timeLeft: 1500,
			running: false,
			type: "Session"
		};
		this.breakOperations = this.breakOperations.bind(this);
		this.sessionOperations = this.sessionOperations.bind(this);
		this.format = this.format.bind(this);
		this.timerOperations = this.timerOperations.bind(this);
		this.tick = this.tick.bind(this);
		this.reset = this.reset.bind(this);
	}
	breakOperations(e) {
		switch (e.target.value) {
			case "+":
				this.setState(prevState => {
					if (prevState.breakLength + 1 <= 60 && !this.state.running) {
						return this.state.type === "Break"
							? {
									breakLength: prevState.breakLength + 1,
									timeLeft: (prevState.breakLength + 1) * 60
							  }
							: {
									breakLength: prevState.breakLength + 1
							  };
					}
				});
				break;
			case "-":
				this.setState(prevState => {
					if (prevState.breakLength - 1 > 0 && !this.state.running) {
						return this.state.type === "Break"
							? {
									breakLength: prevState.breakLength - 1,
									timeLeft: (prevState.breakLength - 1) * 60
							  }
							: {
									breakLength: prevState.breakLength - 1
							  };
					}
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
					if (prevState.sessionLength + 1 <= 60 && !this.state.running) {
						return this.state.type === "Session"
							? {
									sessionLength: prevState.sessionLength + 1,
									timeLeft: (prevState.sessionLength + 1) * 60
							  }
							: {
									sessionLength: prevState.sessionLength + 1
							  };
					}
				});
				break;
			case "-":
				this.setState(prevState => {
					if (prevState.sessionLength - 1 > 0 && !this.state.running) {
						return this.state.type === "Session"
							? {
									sessionLength: prevState.sessionLength - 1,
									timeLeft: (prevState.sessionLength - 1) * 60
							  }
							: {
									sessionLength: prevState.sessionLength - 1
							  };
					}
				});
				break;
			default:
				break;
		}
	}
	format() {
		let minutes = Math.floor(this.state.timeLeft / 60);
		let seconds = this.state.timeLeft - minutes * 60;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		return minutes + ":" + seconds;
	}
	timerOperations() {
		if (!this.state.running) {
			this.setState({ running: true });
			intervalHelper = setInterval(() => {
				this.tick();
			}, 1000);
		} else {
			clearInterval(intervalHelper);
			this.setState({ running: false });
		}
	}
	tick() {
		if (this.state.timeLeft === 0) {
			this.setState(prevState => {
				return {
					type: prevState.type === "Session" ? "Break" : "Session",
					timeLeft:
						prevState.type === "Session"
							? prevState.breakLength * 60
							: prevState.sessionLength * 60
				};
			});
			this.alarm.play();
		} else {
			this.setState(prevState => {
				return { timeLeft: prevState.timeLeft - 1 };
			});
		}
	}
	reset() {
		this.setState({
			breakLength: 5,
			sessionLength: 25,
			timeLeft: 1500,
			running: false,
			type: "Session"
		});
		clearInterval(intervalHelper);
		this.alarm.pause();
		this.alarm.currentTime=0;
	}
	render() {
		return (
			<div className="app">
				<SessionCtrl
					length={this.state.sessionLength}
					handler={this.sessionOperations}
				/>
				<TimerCtrl
					time={this.format()}
					type={this.state.type}
					handler={this.timerOperations}
					reset={this.reset}
				/>
				<BreakCtrl
					length={this.state.breakLength}
					handler={this.breakOperations}
				/>
				<audio
					id="beep"
					src="https://goo.gl/65cBl1"
					ref={element => {
						this.alarm = element;
					}}
				/>
			</div>
		);
	}
}

export default App;
