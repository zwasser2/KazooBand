import React from 'react';
var volume = undefined
export default class MaxValueInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            volume: 5
        };
    }

    handleChange = (event) => {
        volume = parseInt(event.target.value)
        if (Number.isNaN(volume)) {
            volume = 0
        }
        if (volume < 0) {
            volume = 0
        }
        this.setState({volume: volume})
    }

    handleConfirm = () => {
        this.props.onConfirmTime(this.state.volume)
    }
    render() {
        return(
            <span className="maxTime">
                <input type="text" value={volume || this.state.volume} onChange={this.handleChange} />
                <button onClick={this.handleConfirm}> Confirm</button>
            </span>
        )
    }
}