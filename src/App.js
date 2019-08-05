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

function playKazoos (listOfKazoos) {
    for (var i = 0; i < listOfKazoos.length; i ++) {
        playKazooTimeoutFunction(listOfKazoos[i])
    }
}

function playKazooTimeoutFunction (kazoo) {
    setTimeout(function() {
        kazoo.playSound()
        stopKazooTimeoutFunction(kazoo)
    }, kazoo.range.start * 1000)
}

function stopKazooTimeoutFunction (kazoo) {
    setTimeout(function() {
        kazoo.audio.muted = true
    }, kazoo.range.end * 1000)
}

class App extends React.Component {
    constructor(props) {
        var kazooD = new Kazoo('D')
        super(props)
        this.state = {
            maxVolume: 100,
            kazoos: [kazooD],
            maxTime: 100
        }
    }

    handleVolume = (newMaxVolume) => {
        this.setState({maxVolume: newMaxVolume})
    }
// TODO: Make above and below into one function
    handleTime = (newMaxTime) => {
        this.setState({maxTime: newMaxTime})
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

    addNewKazoo = () => {
        this.state.kazoos.push(new Kazoo('A'))
        let temp = this.state.kazoos
        this.setState({kazoos: temp})
    }

    playNotes = () => {
        playKazoos(this.state.kazoos)
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
                return <KazooReact note={kazoo.note} key={index} onSelectNewNote={self.handleKazooNote} maxTime={self.props.maxTime} onChangeRange={self.handleRange}/>
        })}</div>)

        return (
            <div className="App">
                <header className="App-header">
                    Max Volume
                    <MaxValueInput volume={this.state.maxVolume} onSelectNewVolume={this.handleVolume}/>
                    Max Time
                    <MaxValueInput volume={this.state.maxTime} onSelectNewVolume={this.handleTime}/>
                    {displayKazoos}
                    <button onClick={this.addNewKazoo}> Add New Kazoo </button>
                    <button onClick={this.playNotes}> Play Notes</button>
                </header>
            </div>
        );
    }
}


export default App;
