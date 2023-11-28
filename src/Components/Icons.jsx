import React from "react";
import bin from "../Media/Images/recycle_bin_empty_cool-0.png";
import sailor from "../Media/Images/sailor2.ico";
import lythx from "../Media/Sounds/Lythx, rufflws - Lythx The Cruel Angel's Thesis.mp3"
import donsentsu from "../Media/Sounds/Moonlight Densetsu - Save up for a rainy day.mp3"
import mp3ico from '../Media/Images/wm_file-5.png'
import useSound from 'use-sound';
import { useEffect } from "react";
import { useState } from "react";

function trackName(srcpath) {
  return srcpath.split("/")[srcpath.split("/").length - 1].split(".")[0]
}
export default function Icons() {
  const [currentTrack, setCurrentTrack] = useState(lythx)
  const [volume, setVolume] = useState(0.11)
  const [playSound, {stop}] = useSound(currentTrack, {volume: volume});
  const[plaing, setplaying] = useState(false);

  function handleChangeValue(e) {
    setVolume(e.target.value)
  } 

  const stopPlay = () =>{
    stop();
    setplaying(false);
  }

  const setTrack = (track) =>{
    stopPlay();
    setCurrentTrack(track);
  }

  const startPlay = () =>{
    
    playSound();
    setplaying(true);
  }

  
  
  return (
    <>
    <div id="PLAYER" className="player_layer">
      <div className="player"><p>{trackName(currentTrack)}</p>
      <input value={volume} step={0.01} onChange={handleChangeValue} min={0} max={1} ste type="range" name="" id="" />
      <div className="windows-button " onClick={()=>plaing ? stopPlay() : startPlay()}>{plaing ? "Stop" : "Play"}</div>
      </div>
      </div>
    <div className="icons_wrapper">
      <div className="ico">
        <img src={sailor} alt="recycle bin" />
        <p >my computer</p>
      </div>
      <div className="ico">
        <img src={bin} alt="recycle bin" />
        <p >recycle</p>
      </div>
      <div onDoubleClick={()=>setTrack(donsentsu)} className="ico">
        <img src={mp3ico} alt="recycle bin" />
        <p >Moonlight Densetsu - Save up for a rainy day</p>
      </div>
      <div onDoubleClick={()=>setTrack(lythx)} className="ico">
        <img src={mp3ico} alt="recycle bin" />
        <p >Lythx, rufflws - Lythx The Cruel Angel's Thesis</p>
      </div>
    </div>
    </>
  );
}
