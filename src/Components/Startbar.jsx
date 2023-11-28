import React, { useEffect, useState } from "react";
function getTimeStr() {
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  
  return formatAMPM(new Date())
}
export default function Startbar() {
  const [time, setTime] = useState(getTimeStr())

  useEffect(()=>{
    setInterval(()=>{
      setTime(getTimeStr())
    },1000)
  }, [])
  return (
    <div class="start-bar">
      <a
        href="./"
        title="Start Menu"
        class="button start-button-wrapper js-start-button"
        target="_blank"
      >
        <div class="start-button"></div>
      </a>
      <span class="start-bar-window">
        <div class="sprite gallery"></div>SDL9000
      </span>
      <div className="timer-wrap">
      <span class="start-bar-window timer">
        <div class="sprite gallery"></div>{time}
      </span></div>
    </div>
  );
}
