import React from 'react';

export default class SheetMusic extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            volume: 5
        };
    }

    render() {
        // Take a deep copy as doing directly was messing up order on UI (IE sorting by lowest start)
        // Next, convert it to a 2D array so we can iterate over the notes on a corresponding line
        // Then, convert each kazoo object into the correct React Object
        // Lastly, iterate over the kazoo react object list and assign them to a bar graphically.
        var temp = JSON.parse(JSON.stringify(this.props.kazoos))
        temp.sort((a, b) => {
            return a.range.start - b.range.start
        })
        var dictionary = []
        if (temp.length !== 0) {
            for (var i = 0; i < temp.length; i ++) {
                if (typeof dictionary[Math.floor(i / 8)] === 'undefined') {
                    dictionary[Math.floor(i / 8)] = []
                }
                dictionary[Math.floor(i / 8)].push(temp[i])
            }
            var notes = []
            for (i = 0; i <= Math.floor((temp.length - 1) / 8); i ++) {
                notes[i] = []
                var offSet = 5
                notes[i].push (<div className="sheetLine">
                    {dictionary[i].map((kazoo, index) => {
                        offSet += 10
                        var offSetSyle = {
                            left: offSet + '%'
                        }
                        return <span key={i + index.toString()} style={offSetSyle} className={"cat_sheet__note cat_sheet__note--" + kazoo.note}/>
                    })}</div>)
            }
            var Test = ({notes}) => (
                <div className="overAllSheet">
                    {notes.map(note => (
                        <div className='bars'>
                            <div className="cat_sheet">
                                <span className="cat_sheet__lines">
                                    <span className="cat_sheet__notes-wrapper">
                                        {note}
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )
        } else {
            Test = () => (
                <div className="overAllSheet">
                    <div className='bars'>
                        <div className="cat_sheet">
                            <span className="cat_sheet__lines">
                                <span className="cat_sheet__notes-wrapper">
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div className='sheet'>
                <Test notes={notes}/>
            </div>

        )
    }
}