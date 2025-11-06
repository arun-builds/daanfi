import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, Filter, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DonationCard from '@/components/DonationCard';
import { useWallet } from '@solana/wallet-adapter-react';
import BN from 'bn.js';
import { PublicKey } from '@solana/web3.js';
import { useCampaigns } from '@/components/campagins/campaigns-data-access';

type AnchorMilestoneData = {
  id: BN;
  amount: BN;
  order: number;
  totalVotes: BN;
  totalAgreedVotes: BN;
  totalDisagreedVotes: BN;
  status: { ongoing?: {}; completed?: {}; cancelled?: {}; }; // Must match Anchor's return type
}

type AnchorProgramAccount = {
  account: {
      id: BN;
      sponsor: PublicKey;
      totalAmount: BN;
      title: string;
      description: string;
      milestones: AnchorMilestoneData[];
      beneficiary: PublicKey;
  }
}

// Your clean display type (using the imported Status type)
type Status = {
  ongoing?: Record<string, never>;
  completed?: Record<string, never>;
  cancelled?: Record<string, never>;
}

type Milestone = {
  id: BN;
  amount: BN;
  order: number;
  totalVotes: BN;
  totalAgreedVotes: BN;
  totalDisagreedVotes: BN;
  isCompleted: boolean;
  status: Status;
}

export type Campaign = {
  id: BN;
  title: string;
  description: string;
  sponsor: string;
  totalAmount: BN;
  milestones: Milestone[];
  beneficiary: string;
}

// Mock data for demonstration
const MOCK_CAMPAIGNS = [
  {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    title: "Save the Rainforest",
    description: "Help preserve the Amazon rainforest and its biodiversity",
    raised: 45000,
    goal: 100000,
    supporters: 320,
    category: 'Temp',
    campaignUrl: "#",
  },
   {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    title: "Save the Rainforest",
    description: "Help preserve the Amazon rainforest and its biodiversity",
    raised: 45000,
    goal: 100000,
    supporters: 320,
    category: 'Temp',
    campaignUrl: "#",
  },
   {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    title: "Save the Rainforest",
    description: "Help preserve the Amazon rainforest and its biodiversity",
    raised: 45000,
    goal: 100000,
    supporters: 320,
    category: 'Temp',
    campaignUrl: "#",
  },
  {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    title: "Save the Rainforest",
    description: "Help preserve the Amazon rainforest and its biodiversity",
    raised: 45000,
    goal: 100000,
    supporters: 320,
    category: 'Temp',
    campaignUrl: "#",
  },
  {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    title: "Save the Rainforest",
    description: "Help preserve the Amazon rainforest and its biodiversity",
    raised: 45000,
    goal: 100000,
    supporters: 320,
    category: 'Temp',
    campaignUrl: "#",
  },
   {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    title: "Save the Rainforest",
    description: "Help preserve the Amazon rainforest and its biodiversity",
    raised: 45000,
    goal: 100000,
    supporters: 320,
    category: 'Temp',
    campaignUrl: "#",
  },
   {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    title: "Save the Rainforest",
    description: "Help preserve the Amazon rainforest and its biodiversity",
    raised: 45000,
    goal: 100000,
    supporters: 320,
    category: 'Temp',
    campaignUrl: "#",
  },
  {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    title: "Save the Rainforest",
    description: "Help preserve the Amazon rainforest and its biodiversity",
    raised: 45000,
    goal: 100000,
    supporters: 320,
    category: 'Temp',
    campaignUrl: "#",
  },
   {
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    title: "Save the Rainforest",
    description: "Help preserve the Amazon rainforest and its biodiversity",
    raised: 45000,
    goal: 100000,
    supporters: 320,
    category: 'Temp',
    campaignUrl: "#",
  },
];
const ITEMS_PER_PAGE = 6;

const CampaignPage = () => {

  const [id, setId] = useState(new BN(1))
    const wallet = useWallet()
    const publicKey = wallet.publicKey

  const { getCampaigns, createCampaign } = useCampaigns({beneficiary: new PublicKey("4rAvATEgWMVGjrxiF1AiY6qn4SCCEg92EgURySVfxcP2"), id: id, sponsor: publicKey as PublicKey});
  if (!publicKey) {
    return <div>Connect your wallet to view campaigns</div>;
}
const { data: campaigns, isLoading, error } = getCampaigns; 

// Handle initial loading and error states
if (isLoading) {
    return <div>Loading campaigns...</div>;
}

if (error) {
    return <div>Error loading campaigns: {error.message}</div>; 
}

const campaignList: Campaign[] = (campaigns as AnchorProgramAccount[] || [])
    .map(programAccount => ({
        id: programAccount.account.id,
        totalAmount: programAccount.account.totalAmount,
        title: programAccount.account.title,
        description: programAccount.account.description,
        // 🔑 Map Milestones: Extracting data and deriving 'isCompleted'
        milestones: programAccount.account.milestones.map(milestone => ({
            id: milestone.id,
            amount: milestone.amount,
            order: milestone.order,
            totalVotes: milestone.totalVotes,
            totalAgreedVotes: milestone.totalAgreedVotes,
            totalDisagreedVotes: milestone.totalDisagreedVotes,
            
            // FIX: Simplifies boolean check based on the completed variant's presence
            isCompleted: !!milestone.status.completed, 
            
            // Use of 'unknown' is necessary here to map the dynamic JS object back to the static TS type
            status: milestone.status as unknown as Status, 
        })),
        beneficiary: programAccount.account.beneficiary.toBase58(),
        sponsor: programAccount.account.sponsor.toBase58(), 
    }));
  

    const handleCreateCampaign = () => {
      // Automatically disables button if creation is pending (via disabled={createCampaign.isPending})
      createCampaign.mutate();
      if (createCampaign.isSuccess) {
          setId(id.add(new BN(1)));
      }
  }
  
  
  // const currentCampaigns = filteredCampaigns.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const currentCampaigns = campaignList;

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-2">
              Discover and support amazing projects making a difference
            </p>
          </div>
          <Button className="bg-lime-600 hover:bg-lime-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        

        {/* Campaigns Grid */}
        <Card className="mb-8 border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Featured Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCampaigns.map((campaign, index) => (
                <DonationCard
                    image={MOCK_CAMPAIGNS[index].image}
                    title={campaign.title}
                  description={campaign.description}
                  raised={MOCK_CAMPAIGNS[index].raised}
                  goal={MOCK_CAMPAIGNS[index].goal}
                  sponsor={campaign.sponsor}
                  campaignId={campaign.id}
                />
              ))}
            </div>

            {/* No Results Message */}
            {currentCampaigns.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No campaigns found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>

       
        
      </div>
    </div>
  );
};

export default CampaignPage;