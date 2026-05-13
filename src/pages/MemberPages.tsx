import { books } from '../data/libraryData'
import type { IconName, Page } from '../types'
import { Icon } from '../components/Icon'
import { DataTable, PageHeader, ProgressRow, SearchFilters, StatCard } from '../components/UI'

export function MemberDashboard({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      <PageHeader title="Welcome back, Juan!" subtitle="Here's an overview of your library activity." />
      <div className="stats-grid four">
        <StatCard label="Active Loans" value="3" hint="Currently borrowed books" icon="book" />
        <StatCard label="Overdue Books" value="0" hint="Books past due date" icon="alert" />
        <StatCard label="Pending Reservations" value="1" hint="Books in queue" icon="calendar" />
        <StatCard label="Notifications" value="2" hint="Unread notifications" icon="bell" />
      </div>
      <div className="split-grid">
        <section className="panel">
          <h2>Upcoming Due Dates</h2>
          <p>Books due soon</p>
          {['Noli Me Tangere', 'ABNKKBSNPLAko?!', "Dekada '70"].map((title, index) => (
            <div className="due-row" key={title}>
              <strong>{title}</strong>
              <small>Due: 5/{11 + index}/2026</small>
              <span>{4 + index}d left</span>
            </div>
          ))}
          <button className="secondary full" type="button" onClick={() => onNavigate('my-books')}>View All Loans</button>
        </section>
        <section className="panel">
          <h2>Recent Notifications</h2>
          <p>Latest updates and alerts</p>
          <NotificationPreview title="Book Due Soon" copy="Your borrowed book 'Noli Me Tangere' is due in 4 days." />
          <NotificationPreview title="Book Due Soon" copy="Your borrowed book 'Dekada 70' is due in 6 days." />
          <button className="secondary full" type="button" onClick={() => onNavigate('notifications')}>View All Notifications</button>
        </section>
      </div>
      <section className="panel">
        <h2>Quick Actions</h2>
        <p>Quickly access common features</p>
        <div className="quick-actions">
          <button type="button" onClick={() => onNavigate('catalog')}><Icon name="search" />Browse Catalog</button>
          <button type="button" onClick={() => onNavigate('my-books')}><Icon name="book" />My Books</button>
          <button type="button" onClick={() => onNavigate('history')}><Icon name="history" />History</button>
          <button type="button" onClick={() => onNavigate('profile')}><Icon name="profile" />My Profile</button>
        </div>
      </section>
    </>
  )
}

function NotificationPreview({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="notification-mini">
      <strong>{title}</strong>
      <p>{copy}</p>
      <small>5/6/2026</small>
    </article>
  )
}

export function Catalog() {
  return (
    <>
      <PageHeader title="Book Catalog" subtitle="Browse and borrow from our collection" />
      <div className="alert-banner"><Icon name="alert" />You've reached the maximum borrow limit of 3 books.</div>
      <div className="catalog-filters">
        <label className="search"><Icon name="search" /><input placeholder="Search by title, author, ISBN..." /></label>
        <select aria-label="Category"><option>All Categories</option></select>
        <select aria-label="Availability"><option>All Books</option></select>
        <select aria-label="Sort"><option>Title (A-Z)</option></select>
      </div>
      <p className="muted">Showing 12 books</p>
      <div className="book-grid">
        {books.map((book) => <BookCard book={book} key={book.title} />)}
      </div>
    </>
  )
}

function BookCard({ book }: { book: typeof books[number] }) {
  return (
    <article className="book-card">
      <div className={`book-cover ${book.cover}`} role="img" aria-label={`${book.title} cover illustration`}>
        <span>{book.title}</span>
      </div>
      <div className="book-body">
        <div className="book-badges">
          <span className={book.available ? 'available' : 'unavailable'}>{book.available ? `${book.available} Available` : 'Unavailable'}</span>
          <span>{book.category}</span>
        </div>
        <h2>{book.title}</h2>
        <p><Icon name="profile" size={14} />{book.author}</p>
        <p><Icon name="calendar" size={14} />{book.year}</p>
        <p>{book.description}</p>
      </div>
    </article>
  )
}

export function MyBooks() {
  return (
    <>
      <PageHeader title="My Books" subtitle="Manage your borrowed books and reservations" />
      <div className="tabs">
        <button className="active"><Icon name="book" />Active Loans (3)</button>
        <button><Icon name="alert" />Overdue (0)</button>
        <button><Icon name="history" />Reservations (1)</button>
        <button><Icon name="fine" />Fines (0)</button>
      </div>
      {['Noli Me Tangere', 'ABNKKBSNPLAko?!', "Dekada '70"].map((title, index) => (
        <article className="loan-card" key={title}>
          <div>
            <h2>{title}</h2>
            <p>Due: 5/{11 + index}/2026</p>
          </div>
          <span>{index === 2 ? '1 days left' : 'Due Today'}</span>
          <dl>
            <div><dt><Icon name="calendar" />Borrowed</dt><dd>4/{27 + index}/2026</dd></div>
            <div><dt><Icon name="renew" />Renewals</dt><dd>0 of 2</dd></div>
          </dl>
          <div className="loan-actions">
            <button type="button"><Icon name="renew" />Renew</button>
            <button className="primary" type="button"><Icon name="check" />Return</button>
          </div>
        </article>
      ))}
    </>
  )
}

export function History() {
  return (
    <>
      <PageHeader title="Borrowing History" subtitle="Complete record of your library transactions" />
      <div className="stats-grid four">
        <StatCard label="Total Transactions" value="4" hint="All-time borrowing" icon="book" />
        <StatCard label="Completed" value="1" hint="Books returned" icon="calendar" />
        <StatCard label="Currently Active" value="3" hint="Books borrowed" icon="book" />
        <StatCard label="On-Time Rate" value="100%" hint="Returned on time" icon="chart" />
      </div>
      <section className="panel">
        <div className="panel-head">
          <div><h2>Transaction History</h2><p>All your borrowing records</p></div>
          <SearchFilters placeholder="Search books..." tabs={['All Status']} />
        </div>
        <DataTable
          headers={['Book Title', 'Borrow Date', 'Due Date', 'Return Date', 'Renewals', 'Status']}
          rows={[
            ["Dekada '70", '4/29/2026', '5/13/2026', '-', '0', 'Active'],
            ['ABNKKBSNPLAko?!', '4/28/2026', '5/12/2026', '-', '0', 'Active'],
            ['Noli Me Tangere', '4/27/2026', '5/11/2026', '-', '0', 'Active'],
            ['El Filibusterismo', '4/7/2026', '4/21/2026', '4/19/2026', '0', 'Completed'],
          ]}
        />
      </section>
      <section className="panel breakdown">
        <h2>Statistics Breakdown</h2>
        <p>Your borrowing patterns</p>
        <ProgressRow label="Active Loans" value={75} count="3" />
        <ProgressRow label="Completed" value={25} count="1" />
        <ProgressRow label="Overdue" value={0} count="0" />
      </section>
    </>
  )
}

export function Notifications() {
  return (
    <>
      <PageHeader title="Notifications" subtitle="Stay updated with your library activities" action={<span className="new-badge">2 new</span>} />
      <section className="panel">
        <div className="panel-head">
          <div><h2>All Notifications</h2><p>3 notifications</p></div>
          <div className="tabs compact"><button className="active">All</button><button>Unread</button><button><Icon name="check" />Mark All as Read</button></div>
        </div>
        <NotificationRow icon="calendar" title="Book Due Soon" copy="Your borrowed book 'Noli Me Tangere' is due in 4 days." unread />
        <NotificationRow icon="calendar" title="Book Due Soon" copy="Your borrowed book 'Dekada 70' is due in 6 days." unread />
        <NotificationRow icon="megaphone" title="Library Hours Update" copy="The library will be closed on May 10, 2026 for inventory maintenance." />
      </section>
      <section className="panel">
        <h2>Notification Types</h2>
        <p>Understanding your notifications</p>
        <div className="type-grid">
          {[
            ['calendar', 'Due Reminder', 'Books approaching due date'],
            ['alert', 'Overdue Alert', 'Books past due date'],
            ['book', 'Reservation Ready', 'Reserved books available'],
            ['fine', 'Fine Notice', 'Late return fines'],
            ['megaphone', 'Announcement', 'Library updates'],
          ].map(([icon, title, copy]) => <article key={title}><Icon name={icon as IconName} /><strong>{title}</strong><span>{copy}</span></article>)}
        </div>
      </section>
    </>
  )
}

function NotificationRow({ icon, title, copy, unread = false }: { icon: IconName; title: string; copy: string; unread?: boolean }) {
  return (
    <article className={`notification-row ${unread ? 'unread' : ''}`}>
      <Icon name={icon} />
      <div>
        <h3>{title}</h3>
        <p>{copy}</p>
        <small>May {unread ? '6' : '4'}, 2026, 08:00 AM</small>
      </div>
      {unread ? <button type="button">Mark as read</button> : null}
    </article>
  )
}

export function Profile() {
  return (
    <>
      <PageHeader title="My Profile" subtitle="Manage your account settings and view your statistics" />
      <div className="tabs"><button className="active"><Icon name="profile" />Profile</button><button><Icon name="archive" />Security</button><button><Icon name="chart" />Statistics</button></div>
      <section className="panel form-panel">
        <div className="panel-head"><div><h2>Personal Information</h2><p>Update your account details</p></div><button className="primary">Edit Profile</button></div>
        <div className="form-grid">
          <label>First Name *<input disabled defaultValue="Juan" /></label>
          <label>Last Name *<input disabled defaultValue="Cruz" /></label>
        </div>
        <label><Icon name="mail" />Email *<input disabled defaultValue="juan.cruz@email.com" /></label>
        <label><Icon name="phone" />Phone Number<input disabled defaultValue="+63 917 234 5678" /></label>
        <label><Icon name="map" />Address<input disabled defaultValue="Baliwagan, Balingasag, Misamis Oriental" /></label>
        <div className="profile-meta">
          <div><Icon name="calendar" /><strong>Member Since</strong><span>1/10/2024</span></div>
          <div><Icon name="profile" /><strong>Account Status</strong><span className="status dark">Active</span></div>
        </div>
      </section>
    </>
  )
}
