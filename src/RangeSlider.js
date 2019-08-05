import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider(props) {
    const self = this
    const classes = useStyles();

    const [value, setValue] = React.useState([0, 1]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onChange(newValue)
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Time Range (seconds)
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                max={props.maxValue}
                getAriaValueText={valuetext}
            />
        </div>
    );
}