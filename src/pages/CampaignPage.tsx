import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, Filter, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DonationCard from '@/components/DonationCard';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('All');

  // Calculate pagination
  const totalPages = Math.ceil(MOCK_CAMPAIGNS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  
  // Filter campaigns based on search and filter
  const filteredCampaigns = MOCK_CAMPAIGNS.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === 'All' || campaign.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  const currentCampaigns = filteredCampaigns.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Get unique brands for filter
  const brands = ['All', ...new Set(MOCK_CAMPAIGNS.map(campaign => campaign.brand))];

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

        {/* Stats Overview */}
        {/* <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    TOTAL CAMPAIGNS
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {MOCK_CAMPAIGNS.length}
                  </div>
                </div>
                <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                  <span className="text-lime-600 text-xl">📊</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    ACTIVE BACKERS
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    5,642
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">👥</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    TOTAL RAISED
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    $2.1M
                  </div>
                </div>
                <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
                  <span className="text-lime-600 text-xl">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    SUCCESS RATE
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    78%
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">🎯</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Search and Filter Section */}
        <Card className="mb-8 border-none ">
          <CardContent className="p-6">
            <div className="flex gap-4 items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                />
              </div>
              
              {/* Filter */}
              {/* <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-4 h-4" />
                <select
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <Button variant="outline" className="border-gray-300">
                Sort By: Newest
              </Button> */}
            </div>
          </CardContent>
        </Card>

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
                    id={index}
                    image={campaign.image}
                    title={campaign.title}
                  description={campaign.description}
                  raised={campaign.raised}
                  goal={campaign.goal}
                  supporters={campaign.supporters}
                  category={campaign.category}
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

        {/* Pagination */}
        <Card className="border-none shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Page Info */}
              <div className="text-gray-600 text-sm">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredCampaigns.length)} of{' '}
                {filteredCampaigns.length} campaigns
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page)}
                      className={
                        currentPage === page
                          ? "bg-lime-600 hover:bg-lime-700 text-white"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Pagination Info */}
            <div className="sm:hidden text-center text-gray-500 text-sm mt-4">
              Page {currentPage} of {totalPages}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignPage;