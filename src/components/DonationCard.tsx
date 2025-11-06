import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

export interface DonationCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  supporters: number;
  category: string;
  showImage?: boolean;
  className?: string;
  onDonate?: (id: number) => void;
  onShare?: (id: number) => void;
}

const DonationCard: React.FC<DonationCardProps> = ({
  id,
  image,
  title,
  description,
  raised,
  goal,
  supporters,
  category,
  showImage = true,
  className = '',
  onDonate,
  onShare,
}) => {
  const calculateProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleDonate = () => {
    onDonate?.(id);
  };

  const handleShare = () => {
    onShare?.(id);
  };

  return (
    <Card className={` overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      {showImage && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-900 leading-tight line-clamp-2">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 mt-2 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(raised)}
            </span>
            <span className="text-sm text-gray-600">
              raised of {formatCurrency(goal)} goal
            </span>
          </div>
          
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-lime-400 transition-all duration-300"
              style={{ width: `${calculateProgress(raised, goal)}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-1">
            <span className="text-xs font-medium text-lime-600">
              {calculateProgress(raised, goal).toFixed(0)}% funded
            </span>
            <span className="text-xs text-gray-500">
              {formatCurrency(goal - raised)} to go
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
            <span className="text-gray-600">
              {formatNumber(supporters)} Supporters
            </span>
          </div>
          <Badge variant="outline" className="text-gray-600 border-gray-300">
            {category}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleDonate}
            className="flex-1 bg-lime-500 hover:bg-lime-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
          >
            Donate Now
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            Vote
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationCard;