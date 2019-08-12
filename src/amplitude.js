import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';


export default class Amplitude extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 100
        };
    }
    handleChange = (event, newValue) => {
        this.setState({value: newValue})
        this.props.modifyAmplitude(newValue)
    };


    render() {

        return (
            <div className="soundBar">
                <Grid className="volumeSlider" container spacing={2}>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider value={this.state.value} onChange={this.handleChange} aria-labelledby="continuous-slider" />
                    </Grid>
                    <Grid item>
                        <VolumeUp />
                    </Grid>
                </Grid>
            </div>
        );
    }
}