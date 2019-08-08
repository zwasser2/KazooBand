import React from 'react';

export default class sheetMusic extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            volume: 5
        };
    }

    render() {
        return(
            <button>Convert Sheet Music to Kazoo</button>
        )
    }
}