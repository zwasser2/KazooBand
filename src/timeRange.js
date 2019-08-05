import React from 'react';

export default class timeRange extends React.Component{
    handleChange = (event) => {
        let volume = parseInt(event.target.value)
        if (Number.isNaN(volume)) {
            volume = 0
        }
        if (volume > 100) {
            volume = 100
        } else if (volume < 0) {
            volume = 0
        }
        this.props.onSelectNewVolume(volume)
    }
    render() {
        return(
            <div className="maxTime">
                Max Volume
                <input type="text" value={this.props.volume} onChange={this.handleChange} />
            </div>
        )
    }
}