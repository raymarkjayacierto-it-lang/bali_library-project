import type { ReactNode } from 'react'
import { adminNav, memberNav } from '../data/libraryData'
import type { NavItem, Page } from '../types'
import { Icon } from './Icon'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <button className="brand" type="button" onClick={() => { window.location.hash = 'landing' }} aria-label="Go to landing page">
      <img src="/logo.jpg" alt="" />
      <span>{compact ? 'Library Admin' : 'Balingasag Library'}</span>
    </button>
  )
}

function TopBar({ admin = false, onNavigate }: { admin?: boolean; onNavigate: (page: Page) => void }) {
  return (
    <header className="topbar">
      <Logo compact={admin} />
      <div className="top-actions">
        <button type="button" aria-label="Toggle dark mode"><Icon name="moon" /></button>
        {!admin && <button type="button" aria-label="Change language"><Icon name="globe" /></button>}
        <button type="button" aria-label="Log out" onClick={() => onNavigate('landing')}><Icon name="login" /></button>
      </div>
    </header>
  )
}

function Sidebar({ mode, active, onNavigate }: { mode: 'member' | 'admin'; active: Page; onNavigate: (page: Page) => void }) {
  const items = (mode === 'admin' ? adminNav : memberNav) as readonly NavItem[]
  const profile = mode === 'admin'
    ? { initials: 'AD', name: 'Admin User', subtitle: 'Administrator' }
    : { initials: 'MB', name: 'Library Member', subtitle: 'Member account' }

  return (
    <aside className="sidebar">
      <div className="avatar">{profile.initials}</div>
      <h2>{profile.name}</h2>
      <p>{profile.subtitle}</p>
      <nav aria-label={`${mode} navigation`}>
        {items.map((item) => (
          <button
            key={item.page}
            type="button"
            className={active === item.page ? 'active' : ''}
            onClick={() => onNavigate(item.page)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.badge ? <em>{item.badge}</em> : null}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export function Shell({ mode, active, children, onNavigate }: { mode: 'member' | 'admin'; active: Page; children: ReactNode; onNavigate: (page: Page) => void }) {
  return (
    <div className="app-shell">
      <TopBar admin={mode === 'admin'} onNavigate={onNavigate} />
      <main className="workspace">
        <Sidebar mode={mode} active={active} onNavigate={onNavigate} />
        <section className="content">{children}</section>
      </main>
    </div>
  )
}
