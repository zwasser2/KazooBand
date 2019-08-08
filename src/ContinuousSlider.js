import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export default class KazooReact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: -1,
            time: 0,
            pauseTime: 0
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            10
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        if (this.props.isRestart) {
            this.finish()
            this.props.setRestartFalse()
        }
        const isPaused = !(this.props.isTimerStarted) && !(this.state.time > .99 * this.props.maxTime) && this.state.time !== 0
        const finished = !(this.props.isTimerStarted) && (this.state.time > .99 * this.props.maxTime)
        if (isPaused) {
            this.setState({startTime: performance.now()})
            this.setState({pauseTime: this.state.time})
        }
        if (this.props.isTimerStarted) {
            if (this.state.startTime === -1) {
                this.setState({startTime: performance.now()})
            }
            this.setState({
                time: ((performance.now() - this.state.startTime) / 1000 + this.state.pauseTime)
            });
            this.props.setTimeRunning(this.state.time)
        }
        if (finished) {
            this.finish()
        }
    }

    finish() {
        this.setState({startTime: -1})
        this.setState({pauseTime: 0})
        this.setState({time: 0})
    }

    changeTimeManually = (_, newValue) => {
        this.setState({startTime: performance.now()})
        this.setState({pauseTime: newValue})
        this.setState({time: newValue})
        this.props.setTimeManually(newValue)
    }

    render() {
        const secondToDecisecond = .1
        return (
            <div className="sliderContainer">
                <div className="timeSlider">
                    <Slider
                        value={(this.state.time).toFixed(2)}
                        onChange={this.changeTimeManually}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        max={this.props.secondIncrements === 'second' ? this.props.maxTime : this.props.maxTime * secondToDecisecond}/>
                </div>
            </div>
        );
    }
}