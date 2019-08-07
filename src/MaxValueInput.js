import React from 'react';
var volume = undefined
export default class MaxValueInput extends React.Component{

    handleChange = (event) => {
        volume = parseInt(event.target.value)
        if (Number.isNaN(volume)) {
            volume = 0
        }
        if (volume < 0) {
            volume = 0
        }
        this.props.onSelectNewVolume(volume)
    }

    handleConfirm = () => {
        this.props.onConfirmTime(this.props.volume)
    }
    render() {
        return(
            <span className="maxTime">
                <input type="text" value={volume || this.props.volume} onChange={this.handleChange} />
                <button onClick={this.handleConfirm}> Confirm</button>
            </span>
        )
    }
}