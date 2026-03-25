import { useState } from 'react'
import LaunchScreen    from './pages/LaunchScreen'
import SignInPage      from './pages/SignInPage'
import HomePage        from './pages/HomePage'
import TrendingAllPage from './pages/TrendingAllPage'
import FilterPage      from './pages/FilterPage'

export default function App() {
  const [page, setPage] = useState('launch')

  if (page === 'launch')       return <LaunchScreen    onGetStarted={() => setPage('signin')} />
  if (page === 'signin')       return <SignInPage      onSignIn={() => setPage('home')} />
  if (page === 'trending-all') return <TrendingAllPage onBack={() => setPage('home')} />
  if (page === 'filter')       return <FilterPage      onBack={() => setPage('home')} onApply={() => setPage('home')} />

  return (
    <HomePage
      onSeeAllTrending={() => setPage('trending-all')}
      onFilter={() => setPage('filter')}
    />
  )
}
