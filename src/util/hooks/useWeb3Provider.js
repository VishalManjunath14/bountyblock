import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { useCallback, useEffect, useState } from "react";

const useWeb3Provider = () => {

  const initialWeb3State = {
    address: null,
    currentChain: null,
    signer: null,
    provider: null,
    isAuthenticated: false,
};
    const [state, setState] = useState(initialWeb3State);
    useEffect(() => {
  },[state])

    const connectWallet = useCallback(async () => {
        if(state.isAuthenticated) return;

        try {
            const {ethereum} = window;
            if (!ethereum) console.log("ERROR: NO ETH WALLET FOUND");

            const provider = new ethers.BrowserProvider(ethereum);

            const accounts = await provider.send("eth_requestAccounts", []);

            if(accounts.length > 0) {
                const signer = await provider.getSigner();
                const chain = Number(await (await provider.getNetwork()).chainId);

                setState({
                    ...state,
                    address: accounts[0],
                    signer,
                    currentChain: chain,
                    provider,
                    isAuthenticated: true
                });

                localStorage.setItem("isAuthenticated", true);
            }
        } catch {}
    }, [state]);

    const disconnect = () => {
        setState(initialWeb3State);
        localStorage.removeItem("isAuthenticated");
    };

    useEffect(() => {
        if (window == null) return;
    
        if (localStorage.hasOwnProperty("isAuthenticated")) {
          connectWallet();
        }
      }, [connectWallet, state.isAuthenticated]);
    
      useEffect(() => {
        if (typeof window.ethereum === "undefined") return;
    
        window.ethereum.on("accountsChanged", (accounts) => {
          setState({ ...state, address: accounts[0] });
        });
    
        window.ethereum.on("networkChanged", (network) => {
          setState({ ...state, currentChain: Number(network) });
        });
    
        return () => {
          window.ethereum.removeAllListeners();
        };
      }, [state]);
    
      return {
        connectWallet,
        disconnect,
        state,
      };
}

export default useWeb3Provider;