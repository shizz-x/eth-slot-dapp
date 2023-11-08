import React, { useEffect, useState } from "react";
import xrp from "../Images/xrp.svg";
import usdt from "../Images/usdt.svg";
import dash from "../Images/dash.svg";
import ape from "../Images/ape.svg";
import bnb from "../Images/bnb.svg";
import eth from "../Images/eth.svg";
import btc from "../Images/btc.svg";
import ltc from "../Images/ltc.svg";

export default function SlotCell({ gameResults }) {
  const iconsPercents = [xrp, usdt, dash, bnb, ape, ltc, eth, btc];
  const [currentWinPecent, currentWinPecentSet] = useState("0");

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

  const [cells, setCells] = useState([]);

  useEffect(() => {
    if (gameResults === null) {
      defaultGameState();
      currentWinPecentSet("0");
    } else {
      if (gameResults.pending) {
        startGameAnimation();
      } else if (gameResults.pending === false) {
        if (gameResults.winner) {
          generateSlotPosition(
            true,
            gameResults.amount,
            gameResults.percentage.toString()
          );
        } else {
          generateSlotPosition();
        }
      }
    }
  }, [gameResults]);

  const startGameAnimation = async () => {
    currentWinPecentSet("0");
    let res = [];

    for (let index = 0; index < 15; index++) {
      res.push(
        <div id={index} key={index} className="slot_cell pending">
          <img
            src={
              iconsPercents[Math.floor(Math.random() * iconsPercents.length)]
            }
            alt=""
          />
        </div>
      );
    }
    setCells(res);
  };

  const generateSlotPosition = async (
    win = false,
    amount = null,
    percent = null
  ) => {
    let res = [];

    for (let index = 0; index < 15; index++) {
      res.push(
        <div id={index} key={index} className="slot_cell pending_ends">
          <img
            src={
              iconsPercents[Math.floor(Math.random() * iconsPercents.length)]
            }
            alt=""
          />
        </div>
      );
    }
    res.reverse();

    const twoDimensionalRes = [];

    let rows = 3;
    let columns = 5;
    const rowIcon = percentToIcons[percent];
    for (let row = 0; row < rows; row++) {
      const column = [];
      for (let col = 0; col < columns; col++) {
        const index = row * columns + col;
        if (index < res.length) {
          column.push(res[index]);
        }
      }
      twoDimensionalRes.push(column);
    }
    if (!win) {
      currentWinPecentSet("0");
      setCells(twoDimensionalRes);
      return 0;
    }

    for (let col = 0; col < columns; col++) {
      let contains = false;
      let index = 0;
      for (let row = 0; row < rows; row++) {
        if (twoDimensionalRes[row][col].props.children.props.src === rowIcon) {
          twoDimensionalRes[row][col] = (
            <div
              id={twoDimensionalRes[row][col].key}
              key={twoDimensionalRes[row][col].key}
              className="slot_cell winned"
            >
              <img src={rowIcon} alt="" />
            </div>
          );
          contains = true;
          break;
        }
      }
      if (!contains) {
        let randIndex = Math.floor(Math.random() * rows);
        twoDimensionalRes[randIndex][col] = (
          <div
            id={twoDimensionalRes[randIndex][col].key}
            key={twoDimensionalRes[randIndex][col].key}
            className="slot_cell winned"
          >
            <img src={rowIcon} alt="" />
          </div>
        );
      }
    }

    currentWinPecentSet(percent);
    setCells(twoDimensionalRes);
    return 0;
  };

  const defaultGameState = async () => {
    let res = [];

    for (let index = 0; index < 15; index++) {
      res.push(
        <div id={index} key={index} className="slot_cell">
          <img
            src={
              iconsPercents[Math.floor(Math.random() * iconsPercents.length)]
            }
            alt=""
          />
        </div>
      );
    }
    setCells(res);
  };

  return (
    <div className="slots_wrapper">
      <div className="slots_percents">
        <div
          className={`button slots_percentage ${
            currentWinPecent === "110" ? "winned" : ""
          }`}
        >
          1.1x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "125" ? "winned" : ""
          }`}
        >
          1.25x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "150" ? "winned" : ""
          }`}
        >
          1.5x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "200" ? "winned" : ""
          }`}
        >
          2x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "300" ? "winned" : ""
          }`}
        >
          3x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "400" ? "winned" : ""
          }`}
        >
          4x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "500" ? "winned" : ""
          }`}
        >
          5x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "1000" ? "winned" : ""
          }`}
        >
          10x
        </div>
      </div>
      <div className="slots-grid">{cells}</div>
      <div className="slots_percents">
        <div
          className={`button slots_percentage ${
            currentWinPecent === "110" ? "winned" : ""
          }`}
        >
          1.1x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "125" ? "winned" : ""
          }`}
        >
          1.25x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "150" ? "winned" : ""
          }`}
        >
          1.5x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "200" ? "winned" : ""
          }`}
        >
          2x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "300" ? "winned" : ""
          }`}
        >
          3x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "400" ? "winned" : ""
          }`}
        >
          4x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "500" ? "winned" : ""
          }`}
        >
          5x
        </div>
        <div
          className={`button slots_percentage ${
            currentWinPecent === "1000" ? "winned" : ""
          }`}
        >
          10x
        </div>
      </div>
    </div>
  );
}
