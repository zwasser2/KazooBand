import React from 'react';
import './App.css';
import RangeSlider from './RangeSlider.js'
import MaxValueInput from './MaxValueInput.js'
import KazooReact from './kazoo.js'

function Kazoo(kazooNote) {
    this.note = kazooNote;
    this.range = {
        start: 0,
        end: 0
    }
    this.audio = new Audio("https://enterdnscompliantname.s3.us-east-2.amazonaws.com/kazoo" + kazooNote + "Sec.wav")
    this.audio.loop = true
}

Kazoo.prototype.playSound = function() {
    this.audio.muted = false
    this.audio.play()
}

Kazoo.prototype.setVolume = function(newVolume) {
    this.audio.volume = newVolume
}

function playKazoos (listOfKazoos, secondIncrements) {
    var timeOffset = secondIncrements === 'second' ? 1000 : 100
    for (var i = 0; i < listOfKazoos.length; i ++) {
        playKazooTimeoutFunction(listOfKazoos[i], timeOffset)
    }
}

function playKazooTimeoutFunction (kazoo, timeOffset) {
    setTimeout(function() {
        kazoo.playSound()
        stopKazooTimeoutFunction(kazoo, timeOffset)
    }, kazoo.range.start * timeOffset)
}

function stopKazooTimeoutFunction (kazoo, timeOffset) {
    setTimeout(function() {
        kazoo.audio.muted = true
    }, kazoo.range.end * timeOffset)
}

class App extends React.Component {
    constructor(props) {
        var kazooD = new Kazoo('D') // TODO REMOVE THIS
        super(props)
        this.state = {
            secondIncrements: 'second',
            maxVolume: 100,
            kazoos: [kazooD],
            maxTime: 100
        }
    }

    handleVolume = (newMaxVolume) => {
        this.setState({maxVolume: newMaxVolume})
    }

    handleTime = (newMaxTime) => {
        this.setState({maxTime: newMaxTime})
    }

    handleConfirmTime = (newMaxTime) => {
        let temp = this.state.kazoos
        temp.forEach(function(kazoo) {
            if (kazoo.range.end > newMaxTime) {
                kazoo.range.end = newMaxTime
            }
        })
        this.setState({kazoos: temp})
    }

    handleKazooNote = (index, newNote) => {
        const temp = this.state.kazoos
        temp[index].note = newNote
        temp[index].audio = new Audio("https://enterdnscompliantname.s3.us-east-2.amazonaws.com/kazoo" + newNote + "Sec.wav")
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

    playNotes = () => {
        console.log(this.state)
        playKazoos(this.state.kazoos, this.state.secondIncrements)
    }

    handleRadioChange = (event) => {
        this.setState({secondIncrements: event.target.value})
    }

    render() {
        var kazooA = new Kazoo('A')
        var kazooD = new Kazoo('D')
        var kazooE = new Kazoo('E')
        var kazooF = new Kazoo('F')
        var kazooG = new Kazoo('G')
        var self = this


        var displayKazoos = (<div>
            {this.state.kazoos.map(function(kazoo, index) {
                return <KazooReact note={kazoo.note} key={index} onSelectNewNote={self.handleKazooNote} maxTime={self.state.maxTime} onChangeRange={self.handleRange} onDeleteKazoo={self.deleteKazoo} range ={kazoo.range}/>
        })}</div>)

        return (
            <div className="App">
                <header className="App-header">
                    <div className="parent">
                        <div className="maxSettings">
                            <span className="maxVolume">
                                Max Volume
                                <MaxValueInput volume={this.state.maxVolume} onSelectNewVolume={this.handleVolume}/>
                            </span>
                            <span className="maxTime">
                                Max Time
                                <MaxValueInput volume={this.state.maxTime} onSelectNewVolume={this.handleTime} onConfirmTime={this.handleConfirmTime}/>
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
                    </div>
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