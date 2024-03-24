"use client";
import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import useWeb3Provider from "@/util/hooks/useWeb3Provider";
import { createContext, useContext } from "react";

const Web3Context = createContext(null);

export default function Web3ContextProvider({ children }) {

    const {connectWallet, disconnect, state} = useWeb3Provider();

    return (
        <Web3Context.Provider 
            value={{
                connectWallet,
                disconnect,
                state
            }}
        >
            {children}
        </Web3Context.Provider>
    )
}

export const useWeb3Context = () => useContext(Web3Context);