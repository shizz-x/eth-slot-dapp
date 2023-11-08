import { WalletContext } from "./WalletContext.js";
import { useMemo, useState, useContext, useEffect } from "react";

import { CHAIN } from "../net/RPC/Info.jsx";

import Web3 from "web3";
export default function Wallet({ children }) {
  const [address, setAddress] = useState(null);
  const [balance, balanceSet] = useState(0);
  const [chainId, chainIdSet] = useState(null);
  const [connected, connectedSet] = useState(false);

  const web3wss = useMemo(() => new Web3(CHAIN.ws), []);

  const disconnect = () => {
    connectedSet(null);
    balanceSet(0);
    chainIdSet(null);
    setAddress(null);
  };

  const connectWallet = (provider) => {
    function handleAccountsChanged(accs) {
      const getWalletInfo = () => {
        provider
          .request({ method: "eth_chainId" })
          .then((chain) => {
            chainIdSet(chain);
            console.log(chain);
          })
          .catch((err) => console.log(err));
        web3wss.eth
          .getBalance(accs[0])
          .then((balance) => balanceSet(balance))
          .catch((err) => console.log(err));
      };
      setAddress(accs[0]);
      connectedSet(true);

      getWalletInfo();
    }

    return provider
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const listner = async () => {
      window.ethereum.on("chainChanged", (chainIdInScope) => {
        if (chainIdInScope === CHAIN.id) {
          window.location.reload();
        } else {
          disconnect();
        }
      });
    };
    listner();
  }, [connected]);

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        chainId,
        connectWallet,
        connected,
        web3wss,
        disconnect,
      }}
    >
      <div>{children}</div>
    </WalletContext.Provider>
  );
}
