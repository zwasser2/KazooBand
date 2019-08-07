import React from 'react';
import RangeSlider from "./RangeSlider"

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

    render() {
        return(
            <div className="kazooItems">
                <select className="kazooDropDown" value={this.props.note} onChange={this.handleChange}>
                    <option value="A">A</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                </select>
                <RangeSlider maxValue={this.props.maxTime} passedRange={Object.values(this.props.range)} onChange={this.handleRangeChange}/>
                <input type="text" value={this.props.range.start} onChange={this.handleInputRangeStart}/>
                <input type="text" value={this.props.range.end} onChange={this.handleInputRangeEnd}/>
                <button onClick={this.deleteKazoo}> Delete Kazoo </button>
            </div>
        )
    }
}