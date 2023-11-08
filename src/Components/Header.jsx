import React from "react";
import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { WalletContext } from "../context/WalletContext";

export default function Header() {
  const { toastAlert, toastSucces, toastError, toastPromise } =
    useContext(ToastContext);
  const {
    address,
    balance,
    chainId,
    connectWallet,
    connected,
    web3wss,
    disconnect,
    approveTokenSpend,
  } = useContext(WalletContext);

  return (
    <header>
      <div className="header_content">
        <div className="header_logo" onClick={() => approveTokenSpend(10000)}>
          kakegurui
        </div>
        <div className="header_connect_content">
          <div
            className="button connect tooltip"
            onClick={() => {
              if (!connected) {
                connectWallet(window.ethereum).then(() =>
                  toastSucces("Connected")
                );
              } else {
                disconnect();
                toastSucces("Disconnected");
              }
            }}
          >
            {connected ? address.slice(0, 8) : "Connect"}
            <span
              style={{ display: `${connected ? "block" : "none"}` }}
              className="tooltiptext"
            >
              <div className="balance">
                {`${web3wss.utils.fromWei(balance, "ether")}`.slice(0, 6) +
                  " ETH"}
              </div>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
