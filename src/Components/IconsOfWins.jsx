import React from "react";
import xrp from "../Images/xrp.svg";
import usdt from "../Images/usdt.svg";
import dash from "../Images/dash.svg";
import ape from "../Images/ape.svg";
import bnb from "../Images/bnb.svg";
import eth from "../Images/eth.svg";
import btc from "../Images/btc.svg";
import ltc from "../Images/ltc.svg";

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
