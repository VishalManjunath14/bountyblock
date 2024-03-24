"use client";
import { Button } from "@/components/ui/button";
import { useWeb3Context } from "@/util/context/Web3Context";
import { FaEthereum} from 'react-icons/fa'
export default function Web3Connection() {
    const {
        connectWallet,
        disconnect,
        state: { isAuthenticated, address, currentChain, provider },
      } = useWeb3Context();

      return (
        <div>
            {!isAuthenticated ? (
              <Button
                onClick={connectWallet}

              >
                {/* <Icon as={FaEthereum} /> */}
                <FaEthereum className="mr-2"/>Connect Wallet
              </Button>
            ) : (
                
              <div
                
              >
                <Button
                onClick={disconnect}
                variant="outline"
                >
                    <FaEthereum className="mr-2"/>Disconnect
                </Button>
              </div>
              )}
        </div>
      )
}