import { AppProviders } from '@/components/app-providers.tsx'
// import { RouteObject, useRoutes } from 'react-router'
// import { lazy } from 'react'

import { Route, Routes } from "react-router";
import Donate from './components/donate/donate';
import { SolanaAuthButton } from './components/auth/SolanaAuth';
import { User } from './components/user/User';
import LandingPage from './pages/LandingPage';
import TreasuryDashboard from './pages/Treasury';
import DonationCard from './components/DonationCard';
import Campaigns from './pages/CampaignsPage';
import CampaignsPage from './pages/CampaignsPage';
import ProfilePage from './pages/ProfilePage';
import CampaignPage from './pages/CampaignPage';
import ContentPage from './pages/ContentPage';
import CampaignDetail from './components/campagins/CampaignDetail';
import { UserPda } from './components/user/UserPda';

// const links = [
//   //
//   { label: 'Home', path: '/' },
//   { label: 'Account', path: '/account' },
//   { label: 'Basic Program', path: '/basic' },
// ]

// const LazyAccountIndex = lazy(() => import('@/components/account/account-index-feature'))
// const LazyAccountDetail = lazy(() => import('@/components/account/account-detail-feature'))
// const LazyBasic = lazy(() => import('@/basic/basic-feature'))
// const LazyDashboard = lazy(() => import('@/components/dashboard/dashboard-feature'))

// const routes: RouteObject[] = [
//   { index: true, element: <LazyDashboard /> },
//   {
//     path: 'account',
//     children: [
//       { index: true, element: <LazyAccountIndex /> },
//       { path: ':address', element: <LazyAccountDetail /> },
//     ],
//   },
//   { path: 'basic', element: <LazyBasic /> },
// ]

// console.log({ links, routes })

export function App() {
  // const router = useRoutes(routes)
  // return (
  //   <AppProviders>
  //     <AppLayout links={links}>{router}</AppLayout>
  //   </AppProviders>
  // )

return (
  <AppProviders>
    {/* <AppLayout links={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Campaigns', path: '/campaigns' }]}> */}
      <Routes>
    <Route path="/donate" element={<Donate />} />
    <Route path="/" element={<LandingPage  />} />
    <Route path="/treasury" element={<TreasuryDashboard  />} />
    <Route path="/campaigns" element={<CampaignPage/>} />
    <Route path="/auth" element={<SolanaAuthButton />} />
    <Route path="/content" element={<ContentPage/>} />
    <Route path="/user" element={<User />} />
    <Route path="/camp" element={<CampaignsPage />} />
    <Route path="/profile" element={<ProfilePage />} />

    <Route path="/user-pda" element={<UserPda />} />
    <Route path="/campaign/:sponsor/:id" element={<CampaignDetail />} />
  </Routes>
  {/* </AppLayout> */}
  </AppProviders>
)
}
