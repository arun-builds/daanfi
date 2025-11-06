import { AchievementBadges } from "@/components/profilepage/AchievementBadges";
import { DonationSummary } from "@/components/profilepage/DonationSummary";
import { ProfileHeader } from "@/components/profilepage/ProfileHeader";
import Sidebar from "@/components/Sidebar";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-lime-50 to-lime-100 relative">
      {/* Animated soft background blobs */}
      <Sidebar />
      
      {/* Main content container with sidebar offset */}
      <div className="ml-64"> {/* Matches the sidebar width (w-64) */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Top-left lime glow */}
          <div className="absolute top-0 -left-8 w-72 h-72 bg-lime-300/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          {/* Top-right emerald glow */}
          <div className="absolute top-10 -right-8 w-80 h-80 bg-emerald-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
          {/* Bottom-left soft lime/neutral mix */}
          <div className="absolute bottom-0 left-16 w-96 h-96 bg-lime-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Main content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <ProfileHeader />
          <DonationSummary />
          <AchievementBadges />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;