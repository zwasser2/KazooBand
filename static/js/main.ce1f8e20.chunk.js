(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(e,t,a){e.exports=a(54)},44:function(e,t,a){},45:function(e,t,a){},54:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(22),o=a.n(i),r=(a(44),a(8)),c=a(4),l=a(10),m=a(9),u=a(11),d=(a(45),void 0),h=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e){d=parseInt(e.target.value),Number.isNaN(d)&&(d=0),d<0&&(d=0),a.setState({volume:d})},a.handleConfirm=function(){a.props.onConfirmTime(a.state.volume)},a.state={volume:5},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("span",{className:"maxTime"},s.a.createElement("input",{type:"text",value:d||this.state.volume,onChange:this.handleChange}),s.a.createElement("button",{onClick:this.handleConfirm}," Confirm"))}}]),t}(s.a.Component),p=a(66),f=a(69),g=a(34),v=a.n(g),T=a(35),E=a.n(T),S=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).handleChange=function(e,t){a.setState({value:t}),a.props.modifyAmplitude(t)},a.state={value:100},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"soundBar"},s.a.createElement(p.a,{container:!0,spacing:2},s.a.createElement(p.a,{item:!0},s.a.createElement(v.a,null)),s.a.createElement(p.a,{item:!0,xs:!0},s.a.createElement(f.a,{value:this.state.value,onChange:this.handleChange,"aria-labelledby":"continuous-slider"})),s.a.createElement(p.a,{item:!0},s.a.createElement(E.a,null))))}}]),t}(s.a.Component),k=a(36),y=a(67),z=a(68),b=Object(y.a)({root:{width:300}});function C(e){return"".concat(e,"\xb0C")}function N(e){var t=b(),a=s.a.useState([0,e.maxValue]),n=Object(k.a)(a,2),i=n[0],o=n[1];return s.a.createElement("div",{className:t.root},s.a.createElement(z.a,{id:"range-slider",gutterBottom:!0}),s.a.createElement(f.a,{value:e.passedRange||i,onChange:function(t,a){o(a),e.onChange(a)},valueLabelDisplay:"auto","aria-labelledby":"range-slider",max:e.maxValue,getAriaValueText:C}))}var R=a(18),x=a(15),I=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).handleChange=function(e){a.props.onSelectNewNote(parseInt(a._reactInternalFiber.key),e.target.value)},a.handleRangeChange=function(e){a.props.onChangeRange(parseInt(a._reactInternalFiber.key),e)},a.deleteKazoo=function(){a.props.onDeleteKazoo(parseInt(a._reactInternalFiber.key))},a.handleInputRangeStart=function(e){var t=e.target.value;Number.isNaN(t)&&(t=0),t<0&&(t=0),t>a.props.maxTime&&(t=a.props.maxTime),a.props.onChangeRange(parseInt(a._reactInternalFiber.key),[t,a.props.range.end])},a.handleInputRangeEnd=function(e){var t=e.target.value;Number.isNaN(t)&&(t=0),t<0&&(t=0),t>a.props.maxTime&&(t=a.props.maxTime),a.props.onChangeRange(parseInt(a._reactInternalFiber.key),[a.props.range.start,t])},a.modifyAmplitude=function(e){a.props.modifyAmplitude(parseInt(a._reactInternalFiber.key),e/100)},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"kazooItems"},s.a.createElement("select",{className:"kazooDropDown",value:this.props.note,onChange:this.handleChange},s.a.createElement("option",{value:"A"},"A"),s.a.createElement("option",{value:"D"},"D"),s.a.createElement("option",{value:"E"},"E"),s.a.createElement("option",{value:"F"},"F"),s.a.createElement("option",{value:"G"},"G")),s.a.createElement(N,{maxValue:this.props.maxTime,passedRange:Object.values(this.props.range),onChange:this.handleRangeChange}),s.a.createElement("div",{className:"kazooPaddingLeft"},s.a.createElement("input",{type:"text",value:this.props.range.start,onChange:this.handleInputRangeStart})),s.a.createElement("div",{className:"kazooPaddingLeft"},s.a.createElement("input",{type:"text",value:this.props.range.end,onChange:this.handleInputRangeEnd})),s.a.createElement(S,{modifyAmplitude:this.modifyAmplitude}),s.a.createElement("div",{className:"kazooTrash"},s.a.createElement(R.a,{onClick:this.deleteKazoo,icon:x.f})))}}]),t}(s.a.Component),w=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).changeTimeManually=function(e,t){a.setState({startTime:performance.now()}),a.setState({pauseTime:t}),a.setState({time:t}),a.props.setTimeManually(t)},a.state={startTime:-1,time:0,pauseTime:0},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.intervalID=setInterval(function(){return e.tick()},10)}},{key:"componentWillUnmount",value:function(){clearInterval(this.intervalID)}},{key:"tick",value:function(){this.props.isRestart&&(this.finish(),this.props.setRestartFalse());var e="second"===this.props.timeOffset?1:.1,t=!this.props.isTimerStarted&&!(this.state.time>.995*this.props.maxTime*e),a=!this.props.isTimerStarted&&this.state.time>.995*this.props.maxTime*e;t&&(this.setState({startTime:performance.now()}),this.setState({pauseTime:this.state.time})),this.props.isTimerStarted&&(-1===this.state.startTime&&this.setState({startTime:performance.now()}),this.setState({time:(performance.now()-this.state.startTime)/1e3+this.state.pauseTime}),this.props.setTimeRunning(this.state.time)),a&&this.finish()}},{key:"finish",value:function(){this.setState({startTime:-1}),this.setState({pauseTime:0}),this.setState({time:0}),this.props.isFinished()}},{key:"render",value:function(){return s.a.createElement("div",{className:"sliderContainer"},s.a.createElement("div",{className:"timeSlider"},s.a.createElement(f.a,{value:this.state.time.toFixed(2),onChange:this.changeTimeManually,"aria-labelledby":"continuous-slider",valueLabelDisplay:"auto",max:"second"===this.props.secondIncrements?this.props.maxTime:.1*this.props.maxTime})))}}]),t}(s.a.Component);s.a.Component;function O(e){this.note=e,this.range={start:0,end:0},this.audio=new Audio("https://enterdnscompliantname.s3.us-east-2.amazonaws.com/kazoo"+e+"3Min.wav"),this.audio.loop=!0}O.prototype.playSound=function(){this.audio.play()},O.prototype.setVolume=function(e){this.audio.volume=e};var j=function(e){function t(e){var a;Object(r.a)(this,t);var n=new O("E");return n.range.end=2,(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).playKazoos=function(e,t,n){"undefined"===typeof n&&(n=0);var s="second"===t?1e3:100;a.setState({isTimerStarted:!0}),setTimeout(function(){a.state.timeRunning>.995*a.state.maxTime*s/1e3&&(a.setState({isTimerStarted:!1}),a.setState({timeRunning:0}))},(a.state.maxTime-a.state.timeRunning)*s);for(var i=0;i<e.length;i++)a.playKazooTimeoutFunction(e[i],s,n)},a.playKazooTimeoutFunction=function(e,t,n){setTimeout(function(){e.range.end*t/1e3>n&&e.playSound(),a.stopKazooTimeoutFunction(e,t,n)},(e.range.start-n)*t)},a.stopKazooTimeoutFunction=function(e,t,n){setTimeout(function(){a.state.timeRunning>.995*e.range.end*t/1e3&&(e.audio.currentTime=0,e.audio.pause())},(e.range.end-e.range.start-n)*t)},a.handleConfirmTime=function(e){var t=a.state.kazoos;t.forEach(function(t){t.range.end>e&&(t.range.end=e)}),a.setState({maxTime:e}),a.setState({kazoos:t})},a.handleKazooNote=function(e,t){var n=a.state.kazoos;n[e].note=t,n[e].audio=new Audio("https://enterdnscompliantname.s3.us-east-2.amazonaws.com/kazoo"+t+"3Min.wav"),a.setState({kazoos:n})},a.handleRange=function(e,t){var n=a.state.kazoos;n[e].range.start=t[0],n[e].range.end=t[1],a.setState({kazoos:n})},a.deleteKazoo=function(e){var t=a.state.kazoos;t.splice(e,1),a.setState({kazoos:t})},a.addNewKazoo=function(){a.state.kazoos.push(new O("A"));var e=a.state.kazoos;a.setState({kazoos:e})},a.clearAll=function(){a.setState({kazoos:[]})},a.playNotes=function(){a.restartKazoos(),a.playKazoos(a.state.kazoos,a.state.secondIncrements)},a.handleRadioChange=function(e){a.setState({secondIncrements:e.target.value})},a.setTimeRunning=function(e){a.setState({timeRunning:e})},a.pauseKazoos=function(){var e=a.state.kazoos;a.setState({isTimerStarted:!1}),e.forEach(function(e){e.audio.pause()}),a.setState({kazoos:e}),a.setState({isPaused:!0})},a.resume=function(){a.playKazoos(a.state.kazoos,a.state.secondIncrements,a.state.timeRunning),a.setState({isPaused:!1})},a.modifyAmplitude=function(e,t){var n=a.state.kazoos;n[e].audio.volume=t,a.setState({kazoos:n})},a.restartKazoos=function(){a.setState({isRestart:!0}),a.setState({isPaused:!0}),a.setState({isTimerStarted:!1}),a.setState({timeRunning:0}),a.state.kazoos.forEach(function(e){e.audio.pause(),e.audio.currentTime=0})},a.setRestartFalse=function(){a.setState({isRestart:!1})},a.setTimeManually=function(e){console.log(e),a.setState({isTimerStarted:!1}),a.setState({isPaused:!0}),a.setState({timeRunning:e}),a.pauseKazoos()},a.fullFinish=function(){a.setState({isPaused:!0})},a.state={secondIncrements:"second",kazoos:[n],maxTime:5,isTimerStarted:!1,timeRunning:0,timeOut:void 0,isPaused:!0,isRestart:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=s.a.createElement("div",null,this.state.kazoos.map(function(t,a){return s.a.createElement(I,{note:t.note,key:a,onSelectNewNote:e.handleKazooNote,maxTime:e.state.maxTime,onChangeRange:e.handleRange,onDeleteKazoo:e.deleteKazoo,range:t.range,modifyAmplitude:e.modifyAmplitude})}));return s.a.createElement("div",{className:"App"},s.a.createElement("h1",{className:"header"},"Kazoo Bandcamp"),s.a.createElement("header",{className:"App-header"},s.a.createElement("div",{className:"parent"},s.a.createElement("div",{className:"maxSettings"},s.a.createElement("span",{className:"maxTime"},"Max Time",s.a.createElement(h,{volume:this.state.maxTime,onConfirmTime:this.handleConfirmTime})),s.a.createElement("span",{className:"maxRadio"},"Time Increments",s.a.createElement("div",{className:"radioButtons"},s.a.createElement("div",{className:"radio"},s.a.createElement("label",null,s.a.createElement("input",{type:"radio",value:"second",checked:"second"===this.state.secondIncrements,onChange:this.handleRadioChange}),"Second")),s.a.createElement("div",{className:"radio"},s.a.createElement("label",null,s.a.createElement("input",{type:"radio",value:"deciSecond",checked:"deciSecond"===this.state.secondIncrements,onChange:this.handleRadioChange}),"DeciSecond")))))),t,s.a.createElement("div",{className:"kazooButtons"},s.a.createElement("div",null,s.a.createElement(R.a,{icon:x.e,onClick:this.addNewKazoo}),s.a.createElement(R.a,{className:"mainGroupingButtons",icon:this.state.isPaused?x.c:x.d,onClick:this.state.isPaused?this.resume:this.pauseKazoos}),s.a.createElement(R.a,{className:"mainGroupingButtons",icon:x.a,onClick:this.restartKazoos}),s.a.createElement(R.a,{icon:x.b,className:"mainGroupingButtons",onClick:this.clearAll}))),s.a.createElement(w,{className:"botSlider",maxTime:this.state.maxTime,isTimerStarted:this.state.isTimerStarted,secondIncrements:this.state.secondIncrements,setTimeRunning:this.setTimeRunning,isRestart:this.state.isRestart,setRestartFalse:this.setRestartFalse,setTimeManually:this.setTimeManually,isFinished:this.fullFinish,timeOffset:this.state.secondIncrements})))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[39,1,2]]]);
//# sourceMappingURL=main.ce1f8e20.chunk.js.map