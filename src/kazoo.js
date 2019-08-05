import React from 'react';
import RangeSlider from "./RangeSlider"

export default class KazooReact extends React.Component {

    handleChange = (event) => {
        this.props.onSelectNewNote(parseInt(this._reactInternalFiber.key), event.target.value)
    }

    handleRangeChange = (range) => {
        this.props.onChangeRange(parseInt(this._reactInternalFiber.key), range)
    }

    render() {
        return(
            <div className="kazoo">
                <select value={this.props.note} onChange={this.handleChange}>
                    <option value="A">A</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                </select>
                <RangeSlider maxValue={this.props.maxTime} onChange={this.handleRangeChange}/>
            </div>
        )
    }
}