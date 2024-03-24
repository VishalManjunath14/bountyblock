"use client";
import { Button } from "@/components/ui/button"
import NavBar from "@/components/ui/navbar"
import useWeb3Provider from "@/util/hooks/useWeb3Provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label, label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import toast, { Toaster } from "react-hot-toast";

export default function Home({ params }) {
  const [bountyData, setBountyData] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState('');
  const router = useRouter();
  const { state: { address } } = useWeb3Provider();
  let [formattedAddress, setFormattedAddress] = useState('');
  let [formattedOwnerAddress, setFormattedOwnerAddress] = useState('');

  useEffect(() => {
    (async () => {
      try {
        console.log("CURRENT ADDRESS: " + address);
        const response = await fetch('/api/bounties/' + params.slug);
        const dat = await response.json();

        setFormattedAddress(address ? address.toLowerCase() : '');
        setFormattedOwnerAddress(dat.bounty.ownerAddress ? dat.bounty.ownerAddress.toLowerCase() : '');

        setBountyData(dat.bounty);
        console.log("DATA", bountyData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [address, params.slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/bounties/remove/' + params.slug)
    await response.json();

    toast.success('Successfully fullfilled bounty!')
    // router.push('/')
    
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Toaster position="bottom-right"/>
      <NavBar />
      {bountyData ? (
        <div>
          <div className="w-full h-10" />
          <div className="bg-white">
            <h1 className="text-2xl font-bold">{bountyData.title}</h1>
            <p className="text-sm text-gray-500">Company: {bountyData.company}</p>
            <div className="mt-4">
              <p className="mb-2 text-lg">Description</p>
              <p className="text-gray-700">{bountyData.description}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Token Reward</p>
                <p>{bountyData.tokens}</p>
              </div>
              <div>
                <p className="font-semibold">Retainer</p>
                <p>${bountyData.retainer}</p>
              </div>
              <div>
                <p className="font-semibold">Solution Payout</p>
                <p>{bountyData.payout}</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <a className="underline" href={`mailto:${bountyData.email}`}>
                  {bountyData.email}
                </a>
              </div>
              <div>
                <p className="font-semibold">Deadline</p>
                <p>{[bountyData.deadline.split('-')[1], bountyData.deadline.split('-')[2], bountyData.deadline.split('-')[0]].join('/')}</p>
              </div>
              <div>
                <p className="font-semibold">Upload Date</p>
                <p>{bountyData.uploadDate}</p>
              </div>
            </div>
            <div className="mt-8">
              {formattedAddress === formattedOwnerAddress ? (
                <div className="flex justify-center">
                  <form
                    onSubmit={handleSubmit}
                    className="container border border-gray-300 p-6 rounded-md w-full max-w-lg"
                  >
                    <h2 className="text-2xl font-semibold mb-4">Select Applicant</h2>
                    <div className="space-y-4">
                      <RadioGroup value={selectedApplicant} onValueChange={setSelectedApplicant}>
                        {bountyData.upload ?  bountyData.upload
                          .filter((user, index, self) =>
                            index === self.findIndex((u) => u.address === user.address)
                          )
                          .map((user, index) => (
                            <div key={user.address} className="flex items-center space-x-2">
                              <RadioGroupItem value={user.address} id={`option-${index}`} />
                              <Label htmlFor={`option-${index}`}>User: {user.address}</Label>
                            </div>
                          )) : "No Submissions Yet"}
                      </RadioGroup>
                    </div>
                    {bountyData.upload ? <Button type="submit" className="mt-6">Submit</Button> : <Button type="submit" disabled className="mt-6">Submit</Button>}
                  </form>
                </div>
              ) : (
                <Button
                  onClick={async () => {
                    const response = await fetch(`/api/bounties/upload/${bountyData._id}/${address}`);
                    const dat = await response.json();
                  }}
                >
                  Submit Code
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}