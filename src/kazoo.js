import React from 'react';
import Amplitude from "./Amplitude"
import RangeSlider from "./RangeSlider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default class KazooReact extends React.Component {

    handleChange = (event) => {
        this.props.onSelectNewNote(parseInt(this._reactInternalFiber.key), event.target.value)
    }

    handleRangeChange = (range) => {
        this.props.onChangeRange(parseInt(this._reactInternalFiber.key), range)
    }

    deleteKazoo = () => {
        this.props.onDeleteKazoo(parseInt(this._reactInternalFiber.key))
    }

    handleInputRangeStart = (event) => {
        let newValue = event.target.value
        if (Number.isNaN(newValue)) {
            newValue = 0
        }
        if (newValue < 0) {
            newValue = 0
        }
        if (newValue > this.props.maxTime) {
            newValue = this.props.maxTime
        }
        this.props.onChangeRange(parseInt(this._reactInternalFiber.key), [newValue, this.props.range.end])
    }

    handleInputRangeEnd = (event) => {
        let newValue = event.target.value
        if (Number.isNaN(newValue)) {
            newValue = 0
        }
        if (newValue < 0) {
            newValue = 0
        }
        if (newValue > this.props.maxTime) {
            newValue = this.props.maxTime
        }
        this.props.onChangeRange(parseInt(this._reactInternalFiber.key), [this.props.range.start, newValue])
    }

    modifyAmplitude = (newVolume) => {
        const volumeBarRangeToAudioRange = 100
        this.props.modifyAmplitude(parseInt(this._reactInternalFiber.key), newVolume / volumeBarRangeToAudioRange)
    }

    render() {
        return(
            <div className="kazooItems slideInClass">
                <select className="kazooDropDown" value={this.props.note} onChange={this.handleChange}>
                    <option value="A">A</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                </select>
                <RangeSlider maxValue={this.props.maxTime} passedRange={Object.values(this.props.range)} onChange={this.handleRangeChange}/>
                <div className="kazooPaddingLeft">
                    <input type="text" value={this.props.range.start} onChange={this.handleInputRangeStart}/>
                </div>
                <div className="kazooPaddingLeft">
                    <input type="text" value={this.props.range.end} onChange={this.handleInputRangeEnd}/>
                </div>
                <Amplitude modifyAmplitude={this.modifyAmplitude} />
                <div className="kazooTrash">
                    <FontAwesomeIcon onClick={this.deleteKazoo} icon={faTrash} />
                </div>
            </div>
        )
    }
}