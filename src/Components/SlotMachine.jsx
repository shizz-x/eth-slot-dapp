import React, { useEffect, useState } from "react";
import SlotCell from "./SlotCell";
import Web3 from "web3";
import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { ToastContext } from "../context/ToastContext";
import { SpendedTokenAbi } from "../net/ABI/SpendedTokenAbi";
import { TOKEN_ADDRESS } from "../net/ABI/SpendedTokenAddress";
import { SlotContractAbi } from "../net/ABI/SlotContracAbi";
import { SLOT_CONTRACT_ADDRESS } from "../net/ABI/SlotContracAddress";
import { CHAIN } from "../net/RPC/Info";

export default function SlotMachine() {
  const { connected, address, web3wss, chainId } = useContext(WalletContext);
  const { toastAlert, toastSucces, toastError, toastPromise } =
    useContext(ToastContext);
  const [value, valueSet] = useState(100.1);
  const [allowance, setAllowance] = useState(0);
  const [tokenBalance, tokeBalanceSet] = useState(0);
  const [winning, winningSet] = useState(0);

  const [gameResults, gameResultsSet] = useState(null);

  const changeValue = (e) => {
    const { value } = e.target;
    valueSet(value);
  };

  const getAllowance = async (contract, web3) => {
    let allowed = await contract.methods
      .allowance(address, SLOT_CONTRACT_ADDRESS)
      .call();

    setAllowance(web3.utils.fromWei(allowed, "ether"));
  };

  const getTokenBalance = async (contract, web3) => {
    let balance = await contract.methods.balanceOf(address).call();

    tokeBalanceSet(web3.utils.fromWei(balance, "ether"));
  };

  const getWinning = async (contract, web3) => {
    let winning = await contract.methods.getWinning(address).call();

    winningSet(web3.utils.fromWei(winning, "ether"));
  };

  useEffect(() => {
    if (connected) {
      const tokenContract = new web3wss.eth.Contract(
        SpendedTokenAbi,
        TOKEN_ADDRESS
      );
      const slotContract = new web3wss.eth.Contract(
        SlotContractAbi,
        SLOT_CONTRACT_ADDRESS
      );

      getTokenBalance(tokenContract, web3wss);
      getAllowance(tokenContract, web3wss);
      getWinning(slotContract, web3wss);
    }
  }, [connected]);

  const approve = async (amountInWei) => {
    if (!connected) {
      toastAlert("Please connect your wallet first.");
      return 1;
    }

    if (chainId !== CHAIN.id) {
      toastAlert("Switch to the " + CHAIN.name);
      return 1;
    }

    const allowed = allowance;

    console.log(amountInWei);

    const web3 = new Web3(window.ethereum);

    if (
      parseFloat(allowed) > parseFloat(web3.utils.fromWei(amountInWei, "ether"))
    ) {
      toastAlert(
        `Your current allowance is greater than ${web3.utils.fromWei(
          amountInWei,
          "ether"
        )}`
      );
      return 1;
    }
    const contract = new web3.eth.Contract(SpendedTokenAbi, TOKEN_ADDRESS);

    let gasPrice = (await web3.eth.getGasPrice()) + 1027488649n;
    let gasLimit = await contract.methods
      .approve(SLOT_CONTRACT_ADDRESS, amountInWei.toString())
      .estimateGas({ from: address });

    let trx = await toastPromise(
      contract.methods
        .approve(SLOT_CONTRACT_ADDRESS, amountInWei.toString())
        .send({ from: address, gasPrice: gasPrice, gasLimit: gasLimit })
    );

    if (!trx) {
      toastError("Cannot approve token spending.");
      return 1;
    }

    getAllowance(contract, web3);
  };
  const play = async (amountInWei) => {
    if (!connected) {
      toastAlert("Please connect your wallet first.");
      return 1;
    }

    if (chainId !== CHAIN.id) {
      toastAlert("Switch to the " + CHAIN.name);
      return 1;
    }

    if (gameResults !== null) {
      if (gameResults.pending === true) {
        toastAlert("Game is pending.");
        return 1;
      }
    }

    const allowed = allowance;

    const web3 = new Web3(window.ethereum);

    if (
      parseFloat(allowed) < parseFloat(web3.utils.fromWei(amountInWei, "ether"))
    ) {
      toastAlert("Please approve more tokens for spinning.");
      return 1;
    }

    gameResultsSet({ pending: true });

    const contract = new web3.eth.Contract(
      SlotContractAbi,
      SLOT_CONTRACT_ADDRESS
    );
    let gasPrice = (await web3.eth.getGasPrice()) + 4007488649n;
    let gasLimit = 200000n;
    console.log(gasPrice);

    try {
      let trx = await toastPromise(
        contract.methods
          .play(TOKEN_ADDRESS, amountInWei)
          .send({ from: address, gasPrice: gasPrice, gasLimit: gasLimit })
      );

      try {
        let decoded = web3.eth.abi.decodeLog(
          [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "percentage",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          trx.logs[1].data,
          trx.logs[1].topics
        );
        gameResultsSet({
          pending: false,
          winner: true,
          amount: (decoded.percentage * decoded.amount) / 100n,
          percentage: decoded.percentage,
        });
        toastSucces("YOU WON");
      } catch (error) {
        let decoded = web3.eth.abi.decodeLog(
          [
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          trx.logs[1].data,
          trx.logs[1].topics
        );
        gameResultsSet({ pending: false, winner: false });
        toastSucces("YOU LOSE");
      }
    } catch {
      gameResultsSet(null);
    }

    let tokenContract = new web3wss.eth.Contract(
      SpendedTokenAbi,
      TOKEN_ADDRESS
    );

    getTokenBalance(tokenContract, web3wss);
    getAllowance(tokenContract, web3wss);
    getWinning(contract, web3wss);
  };
  const withdraw = async () => {
    if (!connected) {
      toastAlert("Please connect your wallet first.");
      return 1;
    }

    if (chainId !== CHAIN.id) {
      toastAlert("Switch to the" + CHAIN.name);
      return 1;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      SlotContractAbi,
      SLOT_CONTRACT_ADDRESS
    );
    let gasPrice = (await web3.eth.getGasPrice()) + 1027488649n;
    let gasLimit = await contract.methods
      .withdraw(TOKEN_ADDRESS)
      .estimateGas({ from: address });

    let trx = await toastPromise(
      contract.methods
        .withdraw(TOKEN_ADDRESS)
        .send({ from: address, gasPrice: gasPrice, gasLimit: gasLimit })
    );

    getTokenBalance(
      new web3.eth.Contract(SpendedTokenAbi, TOKEN_ADDRESS),
      web3wss
    );
    getWinning(contract, web3wss);
  };
  return (
    <>
      <div className="slots_content">
        <SlotCell gameResults={gameResults}></SlotCell>
      </div>
      <div className="slot_controls_content">
        <div className="slot_controls">
          <div className="slot_row_contorls">
            <div className="controls_input">
              <div
                className="slot_spin button"
                onClick={() => play(Web3.utils.toWei(value, "ether"))}
              >
                Spin
              </div>

              <input type="number" value={value} onChange={changeValue} />

              <div
                className="slot_spin button"
                onClick={() => approve(Web3.utils.toWei(value, "ether"))}
              >
                Approve
              </div>
            </div>
            <div className="assets">
              <div className="approved_tokens">
                Allowed tokens to spin: <b>{allowance}</b>
              </div>
              <div className="approved_tokens">
                Token balance: <b>{tokenBalance}</b>
              </div>
            </div>
            <div
              style={{
                display: `${
                  parseInt(winning) === 0 || !connected ? "none" : ""
                }`,
              }}
              className="slot_winnings"
            >
              <h3>winnings: {winning}</h3>
              <div className="slot_spin button" onClick={() => withdraw()}>
                Withdraw
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
