import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Heart, Lock, Unlock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// Types
interface Contributor {
  id: string;
  name: string;
  avatar?: string;
  amount: number;
}

interface Milestone {
  amount: number;
  label: string;
  description: string;
  reward: string;
  unlocked: boolean;
}

interface CampaignProps {
  campaign?: {
    id: string;
    title: string;
    description: string;
    creator: {
      name: string;
      avatar?: string;
    };
    category: string;
    status: 'active' | 'completed' | 'cancelled';
    currentAmount: number;
    goalAmount: number;
    daysLeft: number;
    backers: number;
    contributors: Contributor[];
    votes: number;
    milestones: Milestone[];
  };
}

// Sample data
const defaultCampaign = {
  id: '1',
  title: 'Alpha Male',
  description: 'Alpha Male by Arona is a Aromatic Fougere fragrance for men. It was launched in 2015. The nose behind this fragrance is François Demachy.',
  creator: {
    name: 'Arona',
    avatar: '/avatars/arona.jpg'
  },
  category: 'Fragrance',
  status: 'active' as const,
  currentAmount: 240.99,
  goalAmount: 500,
  daysLeft: 15,
  backers: 128,
  votes: 42,
  contributors: [
    { id: '1', name: 'Alex Johnson', amount: 50 },
    { id: '2', name: 'Sarah Miller', amount: 25 },
    { id: '3', name: 'Mike Chen', amount: 100 },
    { id: '4', name: 'Emma Davis', amount: 30 },
    { id: '5', name: 'James Wilson', amount: 75 },
  ],
  milestones: [
    { amount: 125, label: '25%', description: 'Early Backer Reward', reward: 'Special thank you message + digital badge', unlocked: true },
    { amount: 250, label: '50%', description: 'Product Sample', reward: 'Small sample of the fragrance', unlocked: true },
    { amount: 375, label: '75%', description: 'Full Size Product', reward: 'One full bottle of Alpha Male', unlocked: false },
    { amount: 500, label: '100%', description: 'Complete Set', reward: 'Full fragrance set with exclusive packaging', unlocked: false },
  ]
};

const ContentPage: React.FC<CampaignProps> = ({ campaign = defaultCampaign }) => {
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [isDonateDialogOpen, setIsDonateDialogOpen] = useState(false);
  const [votes, setVotes] = useState(campaign.votes);
  const [currentAmount, setCurrentAmount] = useState(campaign.currentAmount);
  const [isVoting, setIsVoting] = useState(false);

  const progressPercentage = Math.min((currentAmount / campaign.goalAmount) * 100, 100);
  const visibleContributors = campaign.contributors.slice(0, 3);
  const remainingContributors = campaign.contributors.length - visibleContributors.length;

  const presetAmounts = [10, 25, 50, 100];

  const handleDonate = () => {
    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    setCurrentAmount(prev => prev + amount);
    setIsDonateDialogOpen(false);
    setDonationAmount('');
    
    toast.success(`Thank you for your donation of $${amount.toFixed(2)}!`, {
      description: 'Your support helps make this project possible.',
    });
  };

  const handleVote = async () => {
    if (isVoting) return;
    
    setIsVoting(true);
    setVotes(prev => prev + 1);
    
    toast.success('Thanks for voting!', {
      description: 'Your vote has been recorded.',
    });
    
    // Reset voting state after animation
    setTimeout(() => setIsVoting(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen from-gray-50 to-gray-100">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          <div className="">
            <div className="max-w-7xl mx-auto">
              {/* Main Content Card */}
              <Card className="w-full shadow-2xl border-0">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Left Side - Hero Image */}
                    <div className="lg:w-2/5">
                      <div className="sticky top-8">
                        <div className="relative">
                          <img
                            src="/api/placeholder/600/700"
                            alt={campaign.title}
                            className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl"
                          />
                          <Badge 
                            className={`absolute top-3 right-3 md:top-4 md:right-4 ${getStatusColor(campaign.status)} text-white text-sm py-1 px-3`}
                          >
                            {getStatusText(campaign.status)}
                          </Badge>
                        </div>

                        {/* Quick Stats on Mobile */}
                        <div className="lg:hidden mt-6 grid grid-cols-3 gap-4 p-4 bg-white rounded-xl shadow-sm">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">${currentAmount.toFixed(2)}</div>
                            <div className="text-xs text-gray-500">Raised</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{progressPercentage.toFixed(0)}%</div>
                            <div className="text-xs text-gray-500">Funded</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{campaign.daysLeft}</div>
                            <div className="text-xs text-gray-500">Days Left</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="lg:w-3/5 space-y-6">
                      {/* Title and Creator */}
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 md:h-10 md:w-10">
                            <AvatarImage src={campaign.creator.avatar} />
                            <AvatarFallback className="text-sm">
                              {campaign.creator.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="text-base md:text-lg text-gray-700">by {campaign.creator.name}</span>
                            <Badge variant="secondary" className="ml-2 md:ml-3 text-xs md:text-sm">
                              {campaign.category}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        {campaign.description}
                      </p>

                      {/* Main Notes */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Main Notes</h3>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {['Fresh Spicy', 'Amber', 'Citrus', 'Aromatic', 'Musty', 'Woody', 'Lavender', 'Herbal', 'Warm Spicy'].map((note) => (
                            <Badge key={note} variant="outline" className="text-xs md:text-sm py-1 md:py-2 px-3 md:px-4">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="hidden lg:grid grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 bg-white rounded-xl shadow-sm">
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-bold text-gray-900">${currentAmount.toFixed(2)}</div>
                          <div className="text-xs md:text-sm text-gray-500">Raised</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-bold text-gray-900">{campaign.backers}</div>
                          <div className="text-xs md:text-sm text-gray-500">Backers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-bold text-gray-900">{campaign.daysLeft}</div>
                          <div className="text-xs md:text-sm text-gray-500">Days Left</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl md:text-3xl font-bold text-gray-900">{votes}</div>
                          <div className="text-xs md:text-sm text-gray-500">Votes</div>
                        </div>
                      </div>

                      {/* Contributors */}
                      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contributors</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="flex -space-x-2 md:-space-x-3">
                              {visibleContributors.map((contributor, index) => (
                                <Tooltip key={contributor.id}>
                                  <TooltipTrigger asChild>
                                    <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 md:border-4 border-white shadow-md">
                                      <AvatarImage src={contributor.avatar} />
                                      <AvatarFallback className="text-xs md:text-sm font-medium">
                                        {contributor.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="font-semibold">{contributor.name}</p>
                                    <p className="text-green-600 font-medium">${contributor.amount}</p>
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                              {remainingContributors > 0 && (
                                <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 md:border-4 border-white bg-gray-100 shadow-md">
                                  <AvatarFallback className="text-xs md:text-sm font-medium bg-gray-200">
                                    +{remainingContributors}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                            <span className="text-base md:text-lg text-gray-700 font-medium">
                              {campaign.contributors.length} contributors
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Section */}
                      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg md:text-xl font-semibold">${currentAmount.toFixed(2)} raised</span>
                          <span className="text-base md:text-lg text-gray-600">Goal: ${campaign.goalAmount}</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2 md:h-3" />
                        <div className="text-right mt-2">
                          <span className="text-sm text-gray-500">
                            {progressPercentage.toFixed(1)}% complete
                          </span>
                        </div>
                      </div>

                      {/* Milestone Bar */}
                      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 md:mb-6">Campaign Milestones</h3>
                        <div className="relative pt-6 md:pt-8">
                          <div className="absolute top-6 md:top-8 left-0 right-0 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-green-500 rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                          <div className="relative flex justify-between">
                            {campaign.milestones.map((milestone, index) => (
                              <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                  <button 
                                    className="flex flex-col items-center -mt-3 md:-mt-4 cursor-pointer hover:scale-110 transition-transform group"
                                    onClick={() => {
                                      toast.info(milestone.description, {
                                        description: `Reward: ${milestone.reward}`,
                                      });
                                    }}
                                  >
                                    <div className={`p-1 md:p-2 rounded-full shadow-lg ${
                                      milestone.unlocked 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-gray-300 text-gray-600'
                                    } group-hover:shadow-xl transition-shadow`}>
                                      {milestone.unlocked ? (
                                        <Unlock className="h-4 w-4 md:h-5 md:w-5" />
                                      ) : (
                                        <Lock className="h-4 w-4 md:h-5 md:w-5" />
                                      )}
                                    </div>
                                    <span className="text-xs md:text-sm font-medium mt-1 md:mt-2">
                                      ${milestone.amount}
                                    </span>
                                    <span className="text-xs text-gray-500 mt-0.5 md:mt-1">
                                      {milestone.label}
                                    </span>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs">
                                  <div className="text-center">
                                    <p className="font-semibold text-sm md:text-base">{milestone.description}</p>
                                    <p className="text-green-600 font-medium mt-1">{milestone.reward}</p>
                                    <p className={`text-xs mt-2 font-medium ${
                                      milestone.unlocked ? 'text-green-600' : 'text-gray-500'
                                    }`}>
                                      {milestone.unlocked ? '✓ Unlocked!' : '🔒 Locked'}
                                    </p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                        <Button 
                          onClick={() => setIsDonateDialogOpen(true)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white text-base md:text-lg py-4 md:py-6 h-auto font-semibold"
                          size="lg"
                        >
                          Support This Project
                        </Button>
                        <Button 
                          onClick={handleVote}
                          disabled={isVoting}
                          variant="outline"
                          className={`flex items-center gap-2 md:gap-3 py-4 md:py-6 h-auto text-base md:text-lg transition-all ${
                            isVoting ? 'animate-pulse' : ''
                          }`}
                          size="lg"
                        >
                          <Heart className={`h-5 w-5 md:h-6 md:w-6 ${isVoting ? 'fill-red-500 text-red-500' : ''}`} />
                          <span>Vote ({votes})</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Donation Dialog */}
            <Dialog open={isDonateDialogOpen} onOpenChange={setIsDonateDialogOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl md:text-2xl">Support {campaign.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 md:space-y-6 py-4">
                  <div>
                    <label className="text-base md:text-lg font-medium">Donation Amount</label>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full p-3 md:p-4 text-base md:text-lg border-2 rounded-lg mt-2 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setDonationAmount(amount.toString())}
                        className="py-3 md:py-4 text-base md:text-lg font-medium"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>
                <DialogFooter className="gap-2 md:gap-3 sm:gap-0">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDonateDialogOpen(false)}
                    className="flex-1 py-2 md:py-3 text-base md:text-lg"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleDonate} 
                    disabled={!donationAmount || parseFloat(donationAmount) <= 0}
                    className="flex-1 py-2 md:py-3 text-base md:text-lg bg-green-600 hover:bg-green-700"
                  >
                    Confirm Donation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ContentPage;