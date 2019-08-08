import React from 'react';
import './App.css';
import RangeSlider from './RangeSlider.js'
import MaxValueInput from './MaxValueInput.js'
import KazooReact from './kazoo.js'
import ContinuousSlider from './ContinuousSlider.js'
import SheetMusic from './SheetMusic.js'

function Kazoo(kazooNote) {
    this.note = kazooNote;
    this.range = {
        start: 0,
        end: 0
    }
    this.audio = new Audio("https://enterdnscompliantname.s3.us-east-2.amazonaws.com/kazoo" + kazooNote + "3Min.wav")
    this.audio.loop = true
}

Kazoo.prototype.playSound = function() {
    this.audio.play()
}

Kazoo.prototype.setVolume = function(newVolume) {
    this.audio.volume = newVolume
}

class App extends React.Component {
    constructor(props) {
        // I create this initial Kazoo to give the user an idea of how the UI is set up
        var kazooD = new Kazoo('E')
        kazooD.range.end = 2
        super(props)
        this.state = {
            secondIncrements: 'second',
            kazoos: [kazooD],
            maxTime: 5,
            isTimerStarted: 0,
            timeRunning: 0,
            timeOut: undefined,
            isPaused: false,
            isRestart: false
        }
    }

    playKazoos = (listOfKazoos, secondIncrements, pauseTimeOffset) => {
        if (typeof pauseTimeOffset === 'undefined') {
            pauseTimeOffset = 0
        }
        var timeOffset = secondIncrements === 'second' ? 1000 : 100
        this.setState({isTimerStarted: true})
        setTimeout(() => {
            const isFinished = (this.state.timeRunning > .99 * this.state.maxTime)
            if (isFinished) {
                this.setState({isTimerStarted: false})
                this.setState({timeRunning: 0})
            }

        }, (this.state.maxTime - this.state.timeRunning) * timeOffset)
        for (var i = 0; i < listOfKazoos.length; i ++) {
            this.playKazooTimeoutFunction(listOfKazoos[i], timeOffset, pauseTimeOffset)
        }
    }

    playKazooTimeoutFunction = (kazoo, timeOffset, pauseTimeOffset) => {
        setTimeout(() => {
            kazoo.playSound()
            this.stopKazooTimeoutFunction(kazoo, timeOffset, pauseTimeOffset)
        }, (kazoo.range.start - pauseTimeOffset) * timeOffset)
    }

    stopKazooTimeoutFunction = (kazoo, timeOffset, pauseTimeOffset) => {
        setTimeout(function() {
            kazoo.audio.currentTime = 0;
            kazoo.audio.pause()
        }, (kazoo.range.end - kazoo.range.start - pauseTimeOffset) * timeOffset)
    }

    handleConfirmTime = (newMaxTime) => {
        let temp = this.state.kazoos
        temp.forEach(function(kazoo) {
            if (kazoo.range.end > newMaxTime) {
                kazoo.range.end = newMaxTime
            }
        })
        this.setState({maxTime: newMaxTime})
        this.setState({kazoos: temp})
    }

    handleKazooNote = (index, newNote) => {
        const temp = this.state.kazoos
        temp[index].note = newNote
        temp[index].audio = new Audio("https://enterdnscompliantname.s3.us-east-2.amazonaws.com/kazoo" + newNote + "3Min.wav")
        this.setState({kazoos: temp})
    }

    handleRange = (index, newRange) => {
        const temp = this.state.kazoos
        temp[index].range.start = newRange[0]
        temp[index].range.end = newRange[1]
        this.setState({kazoos: temp})
    }

    deleteKazoo = (index) => {
        let temp = this.state.kazoos
        temp.splice(index, 1)
        this.setState({kazoos: temp})
    }

    addNewKazoo = () => {
        this.state.kazoos.push(new Kazoo('A'))
        let temp = this.state.kazoos
        this.setState({kazoos: temp})
    }

    clearAll = () => {
        this.setState({kazoos: []})
    }

    playNotes = () => {
        this.playKazoos(this.state.kazoos, this.state.secondIncrements)
    }

    handleRadioChange = (event) => {
        this.setState({secondIncrements: event.target.value})
    }

    setTimeRunning = (time) => {
        this.setState({timeRunning: time})
    }

    pauseKazoos = () => {
        if (!(this.state.isPaused)) {
            let temp = this.state.kazoos
            this.setState({isTimerStarted: false})
            temp.forEach((kazoo) => {
                kazoo.audio.pause()
            })
            this.setState({kazoos: temp})
            this.setState({isPaused: true})
        }
    }

    resume = () => {
        if (this.state.isPaused) {
            this.playKazoos(this.state.kazoos, this.state.secondIncrements, this.state.timeRunning)
            this.setState({isPaused: false})
        }
    }

    modifyAmplitude = (index, newVolume) => {
        const temp = this.state.kazoos
        temp[index].audio.volume = newVolume
        this.setState({kazoos: temp})
    }

    restartKazoos = () => {
        this.setState({isRestart: true})
        this.setState({isPaused: false})
        this.setState({isTimerStarted: false})
        this.setState({timeRunning: 0})
        this.state.kazoos.forEach((kazoo) => {
            kazoo.audio.pause()
            kazoo.audio.currentTime = 0
        })
    }

    setRestartFalse = () => {
        this.setState({isRestart: false})
    }

    setTimeManually = (stopTime) => {
        // Setting the time to a specific point is the equivalent of pausing at the point
        this.setState({isPaused: false})
        this.setState({timeRunning: stopTime})
        this.pauseKazoos()
    }

    render() {
        var displayKazoos = (<div>
            {this.state.kazoos.map((kazoo, index) => {
                return <KazooReact note={kazoo.note} key={index} onSelectNewNote={this.handleKazooNote} maxTime={this.state.maxTime} onChangeRange={this.handleRange} onDeleteKazoo={this.deleteKazoo} range={kazoo.range} modifyAmplitude={this.modifyAmplitude}/>
        })}</div>)

        return (
            <div className="App">
                <header className="App-header">
                    <div className="parent">
                        <div className="maxSettings">
                            <span className="maxTime">
                                Max Time
                                <MaxValueInput volume={this.state.maxTime} onConfirmTime={this.handleConfirmTime}/>
                            </span>
                        </div>
                        Time Increments
                        <div className="radioButtons">
                            <div className="radio">
                                <label>
                                    <input type="radio" value="second" checked={this.state.secondIncrements === 'second'} onChange={this.handleRadioChange} />
                                    Second
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="deciSecond" checked={this.state.secondIncrements === 'deciSecond'} onChange={this.handleRadioChange} />
                                    DeciSecond
                                </label>
                            </div>
                        </div>
                    </div>
                        {displayKazoos}
                    <div className="kazooButtons">
                        <button onClick={this.addNewKazoo}> Add New Kazoo </button>
                        <button onClick={this.playNotes}> Play Notes</button>
                        <div className="clearButton">
                            <button onClick={this.pauseKazoos}> Pause </button>
                            <button onClick={this.resume}> Resume </button>
                            <button onClick={this.restartKazoos}> Restart </button>
                        </div>
                        <button className="clearButton" onClick={this.clearAll}> Clear All </button>
                    </div>
                    <ContinuousSlider className="botSlider" maxTime={this.state.maxTime} isTimerStarted={this.state.isTimerStarted} secondIncrements={this.state.secondIncrements} setTimeRunning={this.setTimeRunning} isRestart={this.state.isRestart} setRestartFalse={this.setRestartFalse} setTimeManually={this.setTimeManually}/>
                </header>
            </div>
        );
    }
}


export default App;
/*
// // A D E F G
    // var kazooG1 = new Kazoo('G')
    // kazooG1.range.end = .3
    // var kazooE1 = new Kazoo('E')
    // kazooE1.start = .3
    // kazooE1.end = 1
    // var kazooG2 = new Kazoo('G')
    // kazooG2.start = 1
    // kazooG2.end = 3
    // var kazooD1 = new Kazoo('D')
    // kazooD1.start = 3
    // kazooD1.end = 4
    // listOfKazoos = [kazooG1, kazooE1, kazooG2, kazooD1]
 */

/*
a: .75
 */