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

export default function App() {
  const [page, setPage] = useState('launch')

  if (page === 'launch')        return <LaunchScreen    onGetStarted={() => setPage('signin')} />
  if (page === 'signin')        return <SignInPage      onSignIn={() => setPage('home')} />
  if (page === 'trending-all')  return <TrendingAllPage onBack={() => setPage('home')} />
  if (page === 'filter')        return <FilterPage      onBack={() => setPage('home')} onApply={() => setPage('home')} />
  if (page === 'search')        return <SearchPage      onBack={() => setPage('home')} />
  if (page === 'agent-detail')  return <AgentDetailPage onBack={() => setPage('home')} />
  if (page === 'chat')          return <ChatPage        onGoHome={() => setPage('home')} onConfig={() => setPage('config')} />
  if (page === 'config')        return <ConfigPage      onBack={() => setPage('chat')} />

  return (
    <HomePage
      onSeeAllTrending={() => setPage('trending-all')}
      onFilter={() => setPage('filter')}
      onSearch={() => setPage('search')}
      onAgentClick={() => setPage('agent-detail')}
      onChat={() => setPage('chat')}
    />
  )
}
