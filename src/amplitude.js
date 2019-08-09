import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
                <Grid className="idk1" container spacing={2}>
                    <Grid item className="idk2">
                        <VolumeDown />
                    </Grid>
                    <Grid item xs className="idk3">
                        <Slider value={this.state.value} onChange={this.handleChange} aria-labelledby="continuous-slider" />
                    </Grid>
                    <Grid item className="idk4">
                        <VolumeUp />
                    </Grid>
                </Grid>
            </div>
        );
    }
}