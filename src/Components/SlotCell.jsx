import React, { useEffect, Component, useState } from "react";
import xrp from "../Media/Images/xrp.svg";
import usdt from "../Media/Images/usdt.svg";
import dash from "../Media/Images/dash.svg";
import ape from "../Media/Images/ape.svg";
import bnb from "../Media/Images/bnb.svg";
import eth from "../Media/Images/eth.svg";
import btc from "../Media/Images/btc.svg";
import ltc from "../Media/Images/ltc.svg";

class SlotCell extends Component {
  constructor(props) {
    super(props);

    this.iconsPercents = [xrp, usdt, dash, bnb, ape, ltc, eth, btc];
    this.percentToIcons = {
      110: this.iconsPercents[0],
      125: this.iconsPercents[1],
      150: this.iconsPercents[2],
      200: this.iconsPercents[3],
      300: this.iconsPercents[4],
      400: this.iconsPercents[5],
      500: this.iconsPercents[6],
      1000: this.iconsPercents[7],
    };

    this.state = {
      currentWinPecent: "0",
      cells: [],
      animate: false,
    };
  }

  componentDidMount() {
    this.defaultGameState();
  }

  componentDidUpdate(prevProps) {
    const { gameResults } = this.props;

    if (gameResults !== prevProps.gameResults) {
      console.log(prevProps);
      if (gameResults === null) {
      } else {
        if (gameResults.pending) {
          this.startGameAnimation();
        }
      }
    }
  }

  spin(win = false, percent = null) {
    this.props.playSound();
    this.setState({ animate: true });
    let newValue = [];
    let prevValue = [];
    if (win) {
      const percentParsed = percent.toString();

      const winnedIcon = this.percentToIcons[percentParsed];

      setTimeout(() => {
        function generateWinLine(array, winIcon) {
          for (let index = 0; index < 5; index++) {
            let containsIcon = false;
            if (
              array[index].props.children.props.src === winIcon ||
              array[index + 5].props.children.props.src === winIcon ||
              array[index + 10].props.children.props.src === winIcon
            ) {
              containsIcon = true;
            }
            if (!containsIcon) {
              let position = [index, index + 5, index + 10];
              let randomIndex =
                position[Math.floor(Math.random() * position.length)];
              console.log(array[randomIndex].props.id);

              array[randomIndex] = (
                <div
                  id={array[randomIndex].props.id}
                  key={array[randomIndex].props.id}
                  className="slot_cell winned"
                >
                  <img src={winIcon} alt="" />
                </div>
              );
              containsIcon = false;
            }
          }
          return array;
        }

        for (let index = 0; index < 15; index++) {
          let randomimage =
            this.iconsPercents[
              Math.floor(Math.random() * this.iconsPercents.length)
            ];
          while (randomimage === winnedIcon) {
            randomimage =
              this.iconsPercents[
                Math.floor(Math.random() * this.iconsPercents.length)
              ];
          }

          newValue.push(
            <div id={index} key={index} className="slot_cell">
              <img src={randomimage} alt="" />
            </div>
          );
        }

        newValue = generateWinLine(newValue, winnedIcon);

        let currentCellsState = this.state.cells;

        for (let index = 15; index < 30; index++) {
          let image = currentCellsState[index].props.children.props.src;

          prevValue.push(
            <div id={index} key={index} className="slot_cell">
              <img src={image} alt="" />
            </div>
          );
        }

        this.setCells(prevValue.concat(newValue));
        this.setState({ animate: false });
      }, 1500);
    } else {
      setTimeout(() => {
        for (let index = 0; index < 15; index++) {
          let image =
            this.iconsPercents[
              Math.floor(Math.random() * this.iconsPercents.length)
            ];

          newValue.push(
            <div id={index} key={index} className="slot_cell">
              <img src={image} alt="" />
            </div>
          );
        }

        let currentCellsState = this.state.cells;

        for (let index = 15; index < 30; index++) {
          let image = currentCellsState[index].props.children.props.src;

          prevValue.push(
            <div id={index} key={index} className="slot_cell">
              <img src={image} alt="" />
            </div>
          );
        }

        this.setCells(prevValue.concat(newValue));
        this.setState({ animate: false });
      }, 1500);
    }
    return 0;
  }

  startGameAnimation = async () => {
    this.currentWinPecentSet("0");
    const intervalId = setInterval(() => {
      if (this.props.gameResults !== null) {
        if (this.props.gameResults.pending) {
          this.spin();
        } else {
          if (this.props.gameResults.winner) {
            console.log("winner");
            this.spin(true, this.props.gameResults.percentage);
            setTimeout(() => {
              this.currentWinPecentSet(this.props.gameResults.percentage);
              this.spin(true, this.props.gameResults.percentage);
            }, 1600);
            clearInterval(intervalId);
          } else {
            this.spin();
            clearInterval(intervalId);
          }
        }
      } else {
        clearInterval(intervalId);
      }
    }, 1600);

    console.log("SPINED");
  };

  defaultGameState = async () => {
    let res = [];

    for (let index = 0; index < 30; index++) {
      res.push(
        <div id={index} key={index} className="slot_cell">
          <img
            src={
              this.iconsPercents[
                Math.floor(Math.random() * this.iconsPercents.length)
              ]
            }
            alt=""
          />
        </div>
      );
    }
    this.setCells(res);
  };

  currentWinPecentSet = (percent) => {
    this.setState({ currentWinPecent: percent });
  };

  setCells = (cells) => {
    this.setState({ cells });
  };

  render() {
    const animate = this.state.animate;

    return (
      <div className="slots_wrapper">
        <div className="slots_web">
          <div className={`animated_layer ${animate ? "flow" : ""}`}>
            <div className="slots_row">
              {[
                this.state.cells[0],
                this.state.cells[1],
                this.state.cells[2],
                this.state.cells[3],
                this.state.cells[4],
              ]}
            </div>
            <div className="slots_row">
              {[
                this.state.cells[5],
                this.state.cells[6],
                this.state.cells[7],
                this.state.cells[8],
                this.state.cells[9],
              ]}
            </div>
            <div className="slots_row">
              {[
                this.state.cells[10],
                this.state.cells[11],
                this.state.cells[12],
                this.state.cells[13],
                this.state.cells[14],
              ]}
            </div>
            <div className="slots_row">
              {[
                this.state.cells[15],
                this.state.cells[16],
                this.state.cells[17],
                this.state.cells[18],
                this.state.cells[19],
              ]}
            </div>
            <div className="slots_row">
              {[
                this.state.cells[20],
                this.state.cells[21],
                this.state.cells[22],
                this.state.cells[23],
                this.state.cells[24],
              ]}
            </div>
            <div className="slots_row">
              {[
                this.state.cells[25],
                this.state.cells[26],
                this.state.cells[27],
                this.state.cells[28],
                this.state.cells[29],
              ]}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SlotCell;
