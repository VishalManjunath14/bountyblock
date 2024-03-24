"use client";
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import NavBar from "@/components/ui/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import usdc from '@/../public/usdc.png'
import Link from "next/link";





export default function Component() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/useBounty');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
      <main>
        <section className="text-center py-12">
          <h2 className="text-5xl font-bold">Find the perfect bounty</h2>
          <p className="text-lg mt-4">
            Connect with industry leading companies to work on exciting projects and earn tokens.
          </p>
        </section>
        <section className="grid md:grid-cols-2 gap-8 mt-8">
          {cards ? cards.map((card) => (
            <Link href={`/bounties/${card._id}`}>
            <Card className="w-full hover:shadow-md duration-100">
            <CardHeader>
              <CardTitle className="truncate">{card.title}</CardTitle>
              <CardDescription className="flex items-center">
                <p>{card.tokens} USDC</p>
                <div className="ml-2 w-5 h-5">
                  <Image src={usdc} alt={usdc} height={20} width={20}/>
                </div>
                </CardDescription>
              <CardDescription>Company: {card.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2">
                {card.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="text-gray-500" />
                <span>Deadline: {[card.deadline.split('-')[1], card.deadline.split('-')[2], card.deadline.split('-')[0]].join('/')}</span>
              </div>  
              <div className="text-gray-500">Posted {new Date(card.uploadDate).toLocaleDateString()}</div>
            </CardFooter>
            <div className="flex justify-between items-center p-3">
              <Button className="w-full" variant="">
                View Details
              </Button>
            </div>
          </Card>
            </Link>
          )) : "No Bounties"}
        </section>
      </main>
    </div>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
