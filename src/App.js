import React from 'react';
import './App.scss';
import MaxValueInput from './MaxValueInput.js'
import KazooReact from './kazoo.js'
import ContinuousSlider from './ContinuousSlider.js'
import SheetMusic from './SheetMusic.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faArrowLeft, faPlus, faEraser} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"


function Kazoo(kazooNote) {
    this.note = kazooNote;
    this.range = {
        start: 0,
        end: 0
    }
    this.volume = 1
    this.audio = new Audio("https://enterdnscompliantname.s3.us-east-2.amazonaws.com/kazoo" + kazooNote + "3Min.wav")
    this.audio.loop = true
}

class App extends React.Component {
    constructor(props) {
        // I create this initial Kazoo to give the user an idea of how the UI is set up
        super(props)
        let localStorageKazoos = window.localStorage.getItem('kazoos')
        if (localStorageKazoos !== null) {
            localStorageKazoos = JSON.parse(localStorageKazoos)
            localStorageKazoos = this.getAudioForLocalStorage(localStorageKazoos)
        } else {
            localStorageKazoos = []
        }
        console.log(localStorageKazoos)
        this.state = {
            secondIncrements: 'second',
            kazoos: localStorageKazoos,
            maxTime: 5,
            isTimerStarted: false,
            timeRunning: 0,
            timeOut: undefined,
            isPaused: true,
            isRestart: false,
        }
    }

    getAudioForLocalStorage = (localStorageKazoos) => {
        localStorageKazoos.forEach((kazoo) => {
            kazoo.audio = new Audio("https://enterdnscompliantname.s3.us-east-2.amazonaws.com/kazoo" + kazoo.note + "3Min.wav")
            kazoo.audio.volume = kazoo.volume
        })
        return localStorageKazoos
    }

    playKazoos = (listOfKazoos, secondIncrements, pauseTimeOffset) => {
        if (typeof pauseTimeOffset === 'undefined') {
            pauseTimeOffset = 0
        }
        var timeOffset = secondIncrements === 'second' ? 1000 : 100
        this.setState({isTimerStarted: true})
        setTimeout(() => {
            const isFinished = (this.state.timeRunning > .995 * this.state.maxTime * timeOffset / 1000)
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
            console.log(kazoo)
            // Statement is needed so sound doesn't turn on and immediately off, creating a bad noise
            if ((kazoo.range.end * timeOffset) / 1000 > pauseTimeOffset && !this.state.isPaused) {
                kazoo.audio.play()
            }
            this.stopKazooTimeoutFunction(kazoo, timeOffset, pauseTimeOffset)
        }, (kazoo.range.start - pauseTimeOffset) * timeOffset)
    }

    stopKazooTimeoutFunction = (kazoo, timeOffset, pauseTimeOffset) => {
        setTimeout(() => {
            // If user hits the Play from Start button over and over, the timeout does not clear.
            // Need to make sure we stop when the time running is about equal to this kazoos end point.
            if (this.state.timeRunning > (.995 * kazoo.range.end * timeOffset) / 1000) {
                kazoo.audio.currentTime = 0;
                kazoo.audio.pause()
            }
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

    playNotes = () => { //TODO REMOVE
        this.restartKazoos()
        this.playKazoos(this.state.kazoos, this.state.secondIncrements)
    }

    handleRadioChange = (event) => {
        this.setState({secondIncrements: event.target.value})
    }

    setTimeRunning = (time) => {
        this.setState({timeRunning: time})
    }

    pauseKazoos = () => {
        let temp = this.state.kazoos
        this.setState({isTimerStarted: false})
        temp.forEach((kazoo) => {
            kazoo.audio.pause()
        })
        this.setState({kazoos: temp})
        this.setState({isPaused: true})
    }

    resume = () => {
        let temp = this.state.kazoos
        temp.forEach((kazoo) => {
            if (kazoo.range.end < kazoo.range.start) {
                [kazoo.range.end, kazoo.range.start] = [kazoo.range.start, kazoo.range.end]
            }
        })
        window.localStorage.clear()
        window.localStorage.setItem('kazoos', JSON.stringify(temp))
        this.setState({kazoos: temp})
        this.playKazoos(this.state.kazoos, this.state.secondIncrements, this.state.timeRunning)
        this.setState({isPaused: false})
    }

    modifyAmplitude = (index, newVolume) => {
        const temp = this.state.kazoos
        // We need it stored in the audio.volume so it actually has an effect and in just Object.volume for
        // when we reload for localStorage as the Audio object gets destroyed
        temp[index].audio.volume = newVolume
        temp[index].volume = newVolume
        this.setState({kazoos: temp})
    }

    restartKazoos = () => {
        this.setState({isRestart: true})
        this.setState({isPaused: true})
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
        console.log(stopTime)
        // Setting the time to a specific point is the equivalent of pausing at the point
        this.setState({isTimerStarted: false})
        this.setState({isPaused: true})
        this.setState({timeRunning: stopTime})
        this.pauseKazoos()
    }

    fullFinish = () => {
        this.setState({isPaused: true})
        this.state.kazoos.forEach((kazoo) => {
            kazoo.audio.pause()
        })

    }

    render() {
        var displayKazoos = (<div>
            {this.state.kazoos.map((kazoo, index) => {
                return <KazooReact note={kazoo.note} key={index} onSelectNewNote={this.handleKazooNote} maxTime={this.state.maxTime} onChangeRange={this.handleRange} onDeleteKazoo={this.deleteKazoo} range={kazoo.range} modifyAmplitude={this.modifyAmplitude}/>
        })}</div>)

        return (
            <div className="App">
                <h1 className="header">Kazoo Bandcamp</h1>
                <header className="App-header">
                    <div className="parent">
                        <div className="maxSettings">
                            <span className="maxTime">
                                Max Time
                                <MaxValueInput volume={this.state.maxTime} onConfirmTime={this.handleConfirmTime}/>
                            </span>
                            <span className="maxRadio">
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
                            </span>
                        </div>
                    </div>
                        {displayKazoos}
                    <div className="kazooButtons">
                        <div>
                            <FontAwesomeIcon icon={faPlus} onClick={this.addNewKazoo}/>
                            <FontAwesomeIcon className="mainGroupingButtons" icon={this.state.isPaused ? faPause: faPlay} onClick={!this.state.isPaused ? this.pauseKazoos : this.resume}/>
                            <FontAwesomeIcon className="mainGroupingButtons" icon={faArrowLeft} onClick={this.restartKazoos}/>
                            <FontAwesomeIcon icon={faEraser }className="mainGroupingButtons" onClick={this.clearAll}/>
                        </div>
                    </div>
                    <ContinuousSlider className="botSlider" maxTime={this.state.maxTime} isTimerStarted={this.state.isTimerStarted} secondIncrements={this.state.secondIncrements} setTimeRunning={this.setTimeRunning} isRestart={this.state.isRestart} setRestartFalse={this.setRestartFalse} setTimeManually={this.setTimeManually} isFinished={this.fullFinish} timeOffset={this.state.secondIncrements}/>
                </header>
                <SheetMusic kazoos={this.state.kazoos}/>
                <div className="socialMedia">
                    <a href="https://github.com/zwasser2/KazooBand"><FontAwesomeIcon icon={faGithub} href="https://github.com/zwasser2/KazooBand" size="4x"/></a>
                    <a href="https://www.linkedin.com/in/zachary-wasserman-0b5018127/"><FontAwesomeIcon icon={faLinkedin} href="https://www.linkedin.com/in/zachary-wasserman-0b5018127/" size="4x"/></a>
                </div>

            </div>
        );
    }
}


export default App;