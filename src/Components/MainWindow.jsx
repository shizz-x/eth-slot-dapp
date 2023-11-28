import React from "react";
import SlotMachine from "./SlotMachine"
import WalletInterface from "./WalletInterface";
import QuestionButton from "../Media/Images/question-icon.png"
import  CloseButton from "../Media/Images/close-icon.png";
import { useEffect } from "react";
import Dragger from "../Utils/Dragger";

export default function MainWindow(p) {

  useEffect(()=>{
    if (!p.mob){
      new Dragger("APP", "HEAD", 600, 400);
    }
  }, [])

  return (
    <div className="App" id="APP">
      <header id="HEAD">
        <span>SDL9000</span>
        <div className="controllers">
          <div className="windows-button" data="black"><img src={QuestionButton} alt="" srcset="" /></div>
          <div className="windows-button" data="black"><img src={CloseButton} alt="" srcset="" /></div>
        </div>
      </header>
      <div className="display" id="DISPLAY">
        <div className="display_inner_content">
          <SlotMachine></SlotMachine>
        </div>
        <WalletInterface></WalletInterface>
      </div>
    </div>
  );
}
