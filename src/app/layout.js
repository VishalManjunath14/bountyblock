import { Inter } from "next/font/google";
import "./globals.css";
import Web3ContextProvider from "@/util/context/Web3Context";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BountyBlock",
  description: "Created for a Hackathon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Web3ContextProvider>
        {children}
        {/* <div className="w-2/3 h-4"></div> */}
        </Web3ContextProvider>
      </body>
    </html>
  );
}
