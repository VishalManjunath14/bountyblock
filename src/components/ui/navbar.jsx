"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Web3Connection from "./web3connection";
import { useWeb3Context } from "@/util/context/Web3Context";
import { FaEthereum } from "react-icons/fa";
import Image from "next/image";
import b from '@/../public/b.png'


export default function NavBar() {
    const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain, provider },
  } = useWeb3Context();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    router.push('/bounties/?query=' + searchTerm)
  };

  return (
    <header className="flex justify-between items-center py-6">
      <Link href="/" className="flex"><Image src={b} alt={b} height={32} width={32}/><h1 className="text-3xl font-bold">BountyBlock</h1></Link>
      <div className="flex space-x-4">
        {/* <form onSubmit={handleSubmit}>
          <Input
            className="block w-full"
            placeholder="Search for Bounties"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">View Bounties &darr;</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Bounty Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={'/bounties/filter'}>View All Bounties</Link></DropdownMenuItem>
            
            <DropdownMenuItem>
              <Link href="/bounties/new">Create Bounty</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
      </div>
    </header>
  );
}
