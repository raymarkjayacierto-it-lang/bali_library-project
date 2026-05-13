import { useMemo, useState } from 'react'
import './App.css'
import { Shell } from './components/Layout'
import {
  AdminDashboard,
  BooksAdmin,
  FinesAdmin,
  ReportsAdmin,
  TransactionsAdmin,
  UsersAdmin,
} from './pages/AdminPages'
import {
  Catalog,
  History,
  MemberDashboard,
  MyBooks,
  Notifications,
  Profile,
} from './pages/MemberPages'
import { AuthPage, Landing } from './pages/PublicPages'
import type { Page } from './types'

function App() {
  const initialPage = (window.location.hash.replace('#', '') as Page) || 'landing'
  const [page, setPage] = useState<Page>(initialPage)

  const navigate = (nextPage: Page) => {
    window.location.hash = nextPage
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderedPage = useMemo(() => {
    switch (page) {
      case 'landing':
        return <Landing onNavigate={navigate} />
      case 'login':
        return <AuthPage variant="login" onNavigate={navigate} />
      case 'signin':
        return <AuthPage variant="signin" onNavigate={navigate} />
      case 'member-dashboard':
        return <Shell mode="member" active={page} onNavigate={navigate}><MemberDashboard onNavigate={navigate} /></Shell>
      case 'catalog':
        return <Shell mode="member" active={page} onNavigate={navigate}><Catalog /></Shell>
      case 'my-books':
        return <Shell mode="member" active={page} onNavigate={navigate}><MyBooks /></Shell>
      case 'history':
        return <Shell mode="member" active={page} onNavigate={navigate}><History /></Shell>
      case 'notifications':
        return <Shell mode="member" active={page} onNavigate={navigate}><Notifications /></Shell>
      case 'profile':
        return <Shell mode="member" active={page} onNavigate={navigate}><Profile /></Shell>
      case 'admin-dashboard':
        return <Shell mode="admin" active={page} onNavigate={navigate}><AdminDashboard /></Shell>
      case 'books':
        return <Shell mode="admin" active={page} onNavigate={navigate}><BooksAdmin /></Shell>
      case 'users':
        return <Shell mode="admin" active={page} onNavigate={navigate}><UsersAdmin /></Shell>
      case 'transactions':
        return <Shell mode="admin" active={page} onNavigate={navigate}><TransactionsAdmin /></Shell>
      case 'fines':
        return <Shell mode="admin" active={page} onNavigate={navigate}><FinesAdmin /></Shell>
      case 'reports':
        return <Shell mode="admin" active={page} onNavigate={navigate}><ReportsAdmin /></Shell>
      default:
        return <Landing onNavigate={navigate} />
    }
  }, [page])

  return renderedPage
}

export default App
