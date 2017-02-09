import React, { Component } from 'react';
import FitText from './fittext.js'

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('render-digital-clock').innerHTML =
    h + ":" + m + ":" + s;
    fitText(document.getElementById('render-digital-clock'), 1);
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

export class DigitalClock extends Component {

  render(){
    startTime();
    return (
    <div id="digital-clock"></div>
    );
  }
}
