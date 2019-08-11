import React from 'react';
import KazooReact from "./kazoo"

export default class SheetMusic extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            volume: 5
        };
    }

    render() {
        var offSet = -6
        var temp = JSON.parse(JSON.stringify(this.props.kazoos))
        temp.sort((a, b) => {
            return a.range.start - b.range.start
        })
        var notes = (<div>
            {temp.map((kazoo, index) => {
                offSet += 3
                var offSetSyle = {
                    left: offSet + 'em'
                }
                return <span style={offSetSyle} className={"cat_sheet__note cat_sheet__note--" + kazoo.note}></span>
            })}</div>)
        var topOffset = {
            top: 500 + 'px'
        }
        return(
            <div className='sheet'>
                <div className='bars'>
                    <div className="cat_sheet cat_sheet--animate">
                        <span className="cat_sheet__lines">
                            <span className="cat_sheet__notes-wrapper">
                                {notes}
                            </span>
                        </span>
                    </div>
                </div>
            </div>

        )
    }
}