import React, { useCallback, useEffect, useState } from "react";
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
  const variations = [
    ` ${slicedUser} lost ${amount} coins`,
    ` ${slicedUser} got wiped out with ${amount} coins`,
    ` ${slicedUser} suffered a loss of ${amount} coins `,
    ` ${slicedUser} experienced a downfall of ${amount} coins`,
    ` ${slicedUser} faced a deficit of ${amount} coins`,
  ];

  return variations[Math.floor(Math.random() * variations.length)];
}
function createPrettyWiner(user, amount, x) {
  let slicedUser = sliceUser(user);
  const variations = [
    `${slicedUser} won ${amount}(${x}x) coins`,
    `${slicedUser} triumphed with ${amount}(${x}x) coins`,
    `${slicedUser} gained ${amount}(${x}x) coins`,
    `${slicedUser} earned ${amount}(${x}x) coins`,
    `${slicedUser} scored ${amount}(${x}x) coins`,
  ];

  return variations[Math.floor(Math.random() * variations.length)];
}

export default function GameHistoryList(props) {
  const [historyRows, historyRowsSet] = useState([]);

  useEffect(() => {
    let result = [];

    if (historyRows.length == 0) {
      console.log("first run");
      props.transactions.forEach((trx) => {
        result.push(
          <p className="show_trx">
            <img src={trx.event == "Loser" ? lost : checked} alt="" srcset="" />
            {trx.event == "Loser"
              ? createPrettyLoser(
                  trx.returnValues.user,
                  utils.fromWei(trx.returnValues.amount, "ether")
                )
              : createPrettyWiner(
                  trx.returnValues.user,
                  utils.fromWei(trx.returnValues.amount, "ether"),
                  parseFloat(trx.returnValues.percentage) / 100
                )}
          </p>
        );
      });
      historyRowsSet(result);
    } else {
      props.transactions.forEach((trx) => {
        result.push(
          <p
            className={`${
              result.length == props.transactions.length - 1 ? "show_trx" : ""
            }`}
          >
            <img src={trx.event == "Loser" ? lost : checked} alt="" srcset="" />
            {trx.event == "Loser"
              ? createPrettyLoser(
                  trx.returnValues.user,
                  utils.fromWei(trx.returnValues.amount, "ether")
                )
              : createPrettyWiner(
                  trx.returnValues.user,
                  utils.fromWei(trx.returnValues.amount, "ether"),
                  parseFloat(trx.returnValues.percentage) / 100
                )}
          </p>
        );
      });
      historyRowsSet(result);
    }
  }, [props.transactions]);

  return historyRows;
}
