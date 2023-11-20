import React from 'react'
import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { WalletContext } from "../context/WalletContext";
export default function WalletInterface() {
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
    <div className='wallet_interface'>
        <div className="wallet_interfave_controls">
            <div className="connect_button windows-button" onClick={()=> connected ? disconnect() : connectWallet(window.ethereum)}>{connected ? "Disconnect" : "Connect"}</div>
            <div className='wallet_address'>{connected ? address : ""}</div>
            <div className="wallet_balance">{connected ? web3wss.utils.fromWei(balance, "ether").slice(0,6) + " eth" : ""}</div>
        </div>
    
    </div>
  )
}
