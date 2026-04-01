import { useState } from 'react'
import LaunchScreen    from './pages/LaunchScreen'
import SignInPage      from './pages/SignInPage'
import HomePage        from './pages/HomePage'
import TrendingAllPage from './pages/TrendingAllPage'
import FilterPage      from './pages/FilterPage'
import SearchPage      from './pages/SearchPage'
import AgentDetailPage from './pages/AgentDetailPage'
import ChatPage        from './pages/ChatPage'
import ConfigPage      from './pages/ConfigPage'
import ReviewsPage     from './pages/ReviewsPage'
import SettingsPage    from './pages/SettingsPage'
import EditProfilePage  from './pages/EditProfilePage'
import SocialLinksPage from './pages/SocialLinksPage'
import ReferralPage    from './pages/ReferralPage'
import ThemePage       from './pages/ThemePage'
import LaunchAgentPage from './pages/LaunchAgentPage'

export default function App() {
  const [page, setPage] = useState('launch')

  if (page === 'launch')        return <LaunchScreen    onGetStarted={() => setPage('signin')} />
  if (page === 'signin')        return <SignInPage      onSignIn={() => setPage('home')} />
  if (page === 'trending-all')  return <TrendingAllPage onBack={() => setPage('home')} />
  if (page === 'filter')        return <FilterPage      onBack={() => setPage('home')} onApply={() => setPage('home')} />
  if (page === 'search')        return <SearchPage      onBack={() => setPage('home')} />
  if (page === 'agent-detail')  return <AgentDetailPage onBack={() => setPage('home')} onReviews={() => setPage('reviews')} />
  if (page === 'reviews')       return <ReviewsPage     onBack={() => setPage('agent-detail')} />
  if (page === 'settings')      return <SettingsPage    onLogout={() => setPage('signin')} onChat={() => setPage('chat')} onSettings={() => setPage('settings')} onEditProfile={() => setPage('edit-profile')} onSocialLinks={() => setPage('social-links')} onReferral={() => setPage('referral')} />
  if (page === 'edit-profile')  return <EditProfilePage onBack={() => setPage('settings')} />
  if (page === 'social-links')  return <SocialLinksPage onBack={() => setPage('settings')} />
  if (page === 'referral')      return <ReferralPage    onBack={() => setPage('settings')} />
  if (page === 'theme')         return <ThemePage       onBack={() => setPage('settings')} />
  if (page === 'chat')          return <ChatPage        onGoHome={() => setPage('home')} onConfig={() => setPage('config')} />
  if (page === 'config')        return <ConfigPage      onBack={() => setPage('chat')} />
  if (page === 'launch-agent')  return <LaunchAgentPage onBack={() => setPage('home')} />

  return (
    <HomePage
      onSeeAllTrending={() => setPage('trending-all')}
      onFilter={() => setPage('filter')}
      onSearch={() => setPage('search')}
      onAgentClick={() => setPage('agent-detail')}
      onChat={() => setPage('chat')}
      onSettings={() => setPage('settings')}
      onLaunchAgent={() => setPage('launch-agent')}
    />
  )
}
