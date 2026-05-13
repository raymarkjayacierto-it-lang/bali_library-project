import type { IconName, Page } from '../types'
import { Icon } from '../components/Icon'
import { DataTable, EmptyState, PageHeader, ProgressRow, SearchFilters, StatCard } from '../components/UI'
import { useLibraryData } from '../context/libraryDataContext'

export function MemberDashboard({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { notifications, transactions } = useLibraryData()
  const activeLoans = transactions.filter((item) => item.status === 'Active')
  const overdueLoans = transactions.filter((item) => item.status === 'Overdue')
  const unreadNotifications = notifications.filter((item) => !item.read)

  return (
    <>
      <PageHeader title="Member Dashboard" subtitle="Your library activity will appear here after backend data is added." />
      <div className="stats-grid four">
        <StatCard label="Active Loans" value={String(activeLoans.length)} hint="Currently borrowed books" icon="book" />
        <StatCard label="Overdue Books" value={String(overdueLoans.length)} hint="Books past due date" icon="alert" />
        <StatCard label="Pending Reservations" value="0" hint="Books in queue" icon="calendar" />
        <StatCard label="Notifications" value={String(unreadNotifications.length)} hint="Unread notifications" icon="bell" />
      </div>
      <div className="split-grid">
        <section className="panel">
          <h2>Upcoming Due Dates</h2>
          <p>Books due soon</p>
          <EmptyState title="No active loans" message="Borrowed books from the PHP backend will appear here." />
          <button className="secondary full" type="button" onClick={() => onNavigate('my-books')}>View All Loans</button>
        </section>
        <section className="panel">
          <h2>Recent Notifications</h2>
          <p>Latest updates and alerts</p>
          <EmptyState title="No notifications" message="Backend notifications will appear here." />
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

export function Catalog() {
  const { books } = useLibraryData()

  return (
    <>
      <PageHeader title="Book Catalog" subtitle="Browse and borrow from your library collection" />
      <div className="catalog-filters">
        <label className="search"><Icon name="search" /><input placeholder="Search by title, author, ISBN..." /></label>
        <select aria-label="Category"><option>All Categories</option></select>
        <select aria-label="Availability"><option>All Books</option></select>
        <select aria-label="Sort"><option>Title (A-Z)</option></select>
      </div>
      <p className="muted">Showing {books.length} books</p>
      {books.length === 0 ? (
        <section className="panel">
          <EmptyState title="No books yet" message="Add books through the PHP backend or admin interface to populate the catalog." />
        </section>
      ) : (
        <div className="book-grid">
          {books.map((book) => <BookCard book={book} key={book.id || book.title} />)}
        </div>
      )}
    </>
  )
}

type BookCardData = ReturnType<typeof useLibraryData>['books'][number]

function BookCard({ book }: { book: BookCardData }) {
  return (
    <article className="book-card">
      <div className={`book-cover ${book.cover || 'cover-one'}`} role="img" aria-label={`${book.title} cover illustration`}>
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
  const { transactions } = useLibraryData()
  const activeLoans = transactions.filter((item) => item.status === 'Active')
  const overdueLoans = transactions.filter((item) => item.status === 'Overdue')

  return (
    <>
      <PageHeader title="My Books" subtitle="Manage your borrowed books and reservations" />
      <div className="tabs">
        <button className="active"><Icon name="book" />Active Loans ({activeLoans.length})</button>
        <button><Icon name="alert" />Overdue ({overdueLoans.length})</button>
        <button><Icon name="history" />Reservations (0)</button>
        <button><Icon name="fine" />Fines (0)</button>
      </div>
      <section className="panel">
        <EmptyState title="No borrowed books" message="Borrowing records from the PHP backend will appear here." />
      </section>
    </>
  )
}

export function History() {
  const { transactions } = useLibraryData()
  const completed = transactions.filter((item) => item.status === 'Completed')
  const active = transactions.filter((item) => item.status === 'Active')
  const overdue = transactions.filter((item) => item.status === 'Overdue')

  return (
    <>
      <PageHeader title="Borrowing History" subtitle="Complete record of your library transactions" />
      <div className="stats-grid four">
        <StatCard label="Total Transactions" value={String(transactions.length)} hint="All-time borrowing" icon="book" />
        <StatCard label="Completed" value={String(completed.length)} hint="Books returned" icon="calendar" />
        <StatCard label="Currently Active" value={String(active.length)} hint="Books borrowed" icon="book" />
        <StatCard label="On-Time Rate" value="0%" hint="Returned on time" icon="chart" />
      </div>
      <section className="panel">
        <div className="panel-head">
          <div><h2>Transaction History</h2><p>All your borrowing records</p></div>
          <SearchFilters placeholder="Search books..." tabs={['All Status']} />
        </div>
        <DataTable
          headers={['Book Title', 'Borrow Date', 'Due Date', 'Return Date', 'Renewals', 'Status']}
          rows={transactions.map((item) => [item.book, item.borrow, item.due, item.returnDate, String(item.renewals), item.status])}
          emptyMessage="No borrowing history found."
        />
      </section>
      <section className="panel breakdown">
        <h2>Statistics Breakdown</h2>
        <p>Your borrowing patterns</p>
        <ProgressRow label="Active Loans" value={0} count={String(active.length)} />
        <ProgressRow label="Completed" value={0} count={String(completed.length)} />
        <ProgressRow label="Overdue" value={0} count={String(overdue.length)} />
      </section>
    </>
  )
}

export function Notifications() {
  const { notifications } = useLibraryData()
  const unread = notifications.filter((item) => !item.read)

  return (
    <>
      <PageHeader title="Notifications" subtitle="Stay updated with your library activities" action={<span className="new-badge">{unread.length} new</span>} />
      <section className="panel">
        <div className="panel-head">
          <div><h2>All Notifications</h2><p>{notifications.length} notifications</p></div>
          <div className="tabs compact"><button className="active">All</button><button>Unread</button><button><Icon name="check" />Mark All as Read</button></div>
        </div>
        {notifications.length === 0 ? (
          <EmptyState title="No notifications" message="Notifications from the PHP backend will appear here." />
        ) : (
          notifications.map((item) => (
            <NotificationRow
              key={item.id}
              icon={item.type as IconName}
              title={item.title}
              copy={item.message}
              date={item.date}
              unread={!item.read}
            />
          ))
        )}
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

function NotificationRow({ icon, title, copy, date, unread = false }: { icon: IconName; title: string; copy: string; date: string; unread?: boolean }) {
  return (
    <article className={`notification-row ${unread ? 'unread' : ''}`}>
      <Icon name={icon} />
      <div>
        <h3>{title}</h3>
        <p>{copy}</p>
        <small>{date}</small>
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
          <label>First Name *<input disabled placeholder="First name" /></label>
          <label>Last Name *<input disabled placeholder="Last name" /></label>
        </div>
        <label><Icon name="mail" />Email *<input disabled placeholder="Email address" /></label>
        <label><Icon name="phone" />Phone Number<input disabled placeholder="Phone number" /></label>
        <label><Icon name="map" />Address<input disabled placeholder="Address" /></label>
        <div className="profile-meta">
          <div><Icon name="calendar" /><strong>Member Since</strong><span>-</span></div>
          <div><Icon name="profile" /><strong>Account Status</strong><span className="status dark">Not loaded</span></div>
        </div>
      </section>
    </>
  )
}
