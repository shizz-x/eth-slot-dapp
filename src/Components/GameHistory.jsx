import React, { Component } from "react";
import Web3 from "web3";
import { CHAIN } from "../net/RPC/Info";
import { SlotContractAbi } from "../net/ABI/SlotContracAbi";
import { SLOT_CONTRACT_ADDRESS } from "../net/ABI/SlotContracAddress";
import { utils } from "web3";
import checked from "../Images/checked.svg";
import lost from "../Images/lost.svg";
function sliceUser(user) {
  return (
    `${user}`.slice(0, 5) +
    "..." +
    `${user}`.slice(user.length - 6, user.length - 1)
  );
}
function createPrettyLoser(user, amount) {
  let slicedUser = sliceUser(user);
  const variations = [` ${slicedUser} lost ${amount} coins`];

  return variations[Math.floor(Math.random() * variations.length)];
}
function createPrettyWinner(user, amount, x) {
  let slicedUser = sliceUser(user);
  const variations = [`${slicedUser} won ${parseFloat(amount) * x} coins`];

  return variations[Math.floor(Math.random() * variations.length)];
}
export default class GameHistory extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
    };
    this.web3wss = new Web3(CHAIN.ws);
    this.wscontract = new this.web3wss.eth.Contract(
      SlotContractAbi,
      SLOT_CONTRACT_ADDRESS
    );
    this.logSubscription = this.wscontract.events.allEvents();
    this.reconnectionInterval = 5000;
  }

  appendNewTransaction(trx, length) {
    return (
      <p key={length + 1} className={"show_trx"}>
        <img src={trx.event === "Loser" ? lost : checked} alt="" srcSet="" />
        {trx.event === "Loser"
          ? createPrettyLoser(
              trx.returnValues.user,
              utils.fromWei(trx.returnValues.amount, "ether")
            )
          : createPrettyWinner(
              trx.returnValues.user,
              utils.fromWei(trx.returnValues.amount, "ether"),
              parseFloat(trx.returnValues.percentage) / 100
            )}
      </p>
    );
  }

  getPreviousTransactions = async () => {
    let previousBlock = (await this.web3wss.eth.getBlockNumber()) - 50000n;
    const events = await this.wscontract.getPastEvents("allEvents", {
      fromBlock: previousBlock,
      toBlock: "latest",
    });
    events.reverse();

    let eventsLimit = 10;

    if (events.length < 10) {
      eventsLimit = events.length;
    }

    let result = [];

    for (let index = 0; index < eventsLimit; index++) {
      result.push(this.appendNewTransaction(events[index], index));
    }
    this.setState({ transactions: result });
  };
  subscribeToEvents = () => {
    this.getPreviousTransactions();
    // 15 seconds

    const subscribeFunction = () => {
      try {
        this.logSubscription.once("data", (event) => {
          this.web3wss.subscriptionManager.clear();
          this.getPreviousTransactions();
          subscribeFunction();
        });

        this.logSubscription.once("error", (error) => {
          console.log("WebSocket error:", error);
        });
      } catch (err) {
        console.log("WebSocket resubscribe error:", err);
      }
    };
    subscribeFunction();
  };
  componentDidMount() {
    this.subscribeToEvents();
    this.reconnectionIntervalId = setInterval(async () => {
      if (this.logSubscription) {
        try {
          this.web3wss.eth
            .getBlockNumber()
            .then((block) => console.table({ "Connection OK": block }));
        } catch (err) {
          console.table({ "Connection ERROR": err });
          clearInterval(this.reconnectionIntervalId);
          this.web3wss.subscriptionManager.clear();
          this.subscribeToEvents();
        }
      }
    }, this.reconnectionInterval);
  }

  componentWillUnmount() {
    this.web3wss.subscriptionManager.clear();
    clearInterval(this.reconnectionIntervalId);
  }
  componentDidUpdate() {}
  render() {
    const historyRows = this.state.transactions;

    if (historyRows.length > 0) {
      return (
        <div className="history_content">
          <h1>LIVE TRANSACTIONS</h1>
          <div className="history_rows">{historyRows}</div>
        </div>
      );
    } else {
      return (
        <div className="history_content">
          <h1>LIVE TRANSACTIONS</h1>
          <div className="history_rows">
            <p id="WAITING">undefiend</p>
            <p id="WAITING">undefiend</p>
            <p id="WAITING">undefiend</p>
            <p id="WAITING">undefiend</p>
            <p id="WAITING">undefiend</p>
            <p id="WAITING">undefiend</p>
            <p id="WAITING">undefiend</p>
            <p id="WAITING">undefiend</p>
          </div>
        </div>
      );
    }
  }
}
