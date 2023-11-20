import React from "react";
import xrp from "../Media/Images/xrp.svg";
import usdt from "../Media/Images/usdt.svg";
import dash from "../Media/Images/dash.svg";
import ape from "../Media/Images/ape.svg";
import bnb from "../Media/Images/bnb.svg";
import eth from "../Media/Images/eth.svg";
import btc from "../Media/Images/btc.svg";
import ltc from "../Media/Images/ltc.svg";

export default function IconsOfWins() {
  const iconsPercents = [xrp, usdt, dash, bnb, ape, ltc, eth, btc];
  const percentToIcons = {
    110: iconsPercents[0],
    125: iconsPercents[1],
    150: iconsPercents[2],
    200: iconsPercents[3],
    300: iconsPercents[4],
    400: iconsPercents[5],
    500: iconsPercents[6],
    1000: iconsPercents[7],
  };

  return (
    <div className="icons_of_win_content">
      {iconsPercents.map((value, index) => (
        <div key={index} id={index} className="icon_of_win">
          <img src={value} alt="" srcSet="" />
          <span>{parseFloat(Object.keys(percentToIcons)[index]) / 100}x</span>
        </div>
      ))}
    </div>
  );
}
