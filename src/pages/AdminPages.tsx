import { books, fines, members, transactions } from '../data/libraryData'
import type { IconName } from '../types'
import { Icon } from '../components/Icon'
import { DataTable, PageHeader, SearchFilters, StatCard } from '../components/UI'

export function AdminDashboard() {
  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Welcome back, Maria! Here's what's happening in your library." />
      <div className="stats-grid four">
        <StatCard label="Total Books" value="45" hint="12 unique titles" icon="users" tone="good" />
        <StatCard label="Active Transactions" value="16" hint="4 active borrowers" icon="transaction" tone="good" />
        <StatCard label="Overdue Books" value="2" hint="Require immediate attention" icon="alert" tone="danger" />
        <StatCard label="Total Fines" value="₱85.00" hint="2 unpaid fines" icon="fine" />
      </div>
      <div className="split-grid">
        <section className="panel">
          <h2><Icon name="chart" />Top Borrowed Books</h2>
          {books.slice(0, 5).map((book, index) => (
            <div className="rank-row" key={book.title}>
              <span>{index + 1}</span>
              <div><strong>{book.title}</strong><small>{book.borrows} borrows</small></div>
              <meter min="0" max="6" value={book.borrows} />
            </div>
          ))}
        </section>
        <section className="panel">
          <h2><Icon name="alert" />Overdue Books</h2>
          <DataTable
            headers={['Book', 'Due Date', 'Days Late']}
            rows={[['The Woman Who Had Two Navels', '5/1/2026', '7 days'], ['Dwellers', '4/26/2026', '12 days']]}
          />
          <button className="secondary full">View All</button>
        </section>
      </div>
      <section className="panel">
        <h2>Recent Activity</h2>
        <DataTable
          headers={['Action', 'Details', 'User ID', 'Timestamp']}
          rows={[
            ['Create', "Added new book: Bata, Bata... Pa'no Ka Ginawa?", 'u1', '5/1/2026, 6:30:00 PM'],
            ['Borrow', 'Borrowed book: Noli Me Tangere', 'u2', '4/27/2026, 8:00:00 AM'],
            ['Reserve', 'Reserved book: ABNKKBSNPLAko?!', 'u3', '5/5/2026, 8:00:00 AM'],
            ['Update', 'Updated user account status', 'u1', '5/2/2026, 8:00:00 AM'],
          ]}
        />
      </section>
    </>
  )
}

export function BooksAdmin() {
  return (
    <>
      <PageHeader title="Book Management" subtitle="Manage your library's book collection" action={<button className="primary"><Icon name="plus" />Add Book</button>} />
      <SearchFilters placeholder="Search books..." tabs={['All Categories', 'Show Archived']} />
      <section className="panel">
        <DataTable
          headers={['Title ↑', 'Author', 'Category', 'ISBN', 'Year', 'Available', 'Total', 'Actions']}
          rows={books.map((book) => [book.title, book.author, book.category, book.isbn, String(book.year), String(book.available), String(book.total), 'edit copy archive'])}
          actionIcons
        />
      </section>
    </>
  )
}

export function UsersAdmin() {
  return (
    <>
      <PageHeader title="User Management" subtitle="Manage library members and their accounts" />
      <div className="stats-grid four">
        <StatCard label="Total Users" value="5" icon="users" />
        <StatCard label="Active Users" value="5" icon="users" tone="good" />
        <StatCard label="Inactive Users" value="0" icon="users" tone="danger" />
        <StatCard label="Administrators" value="1" icon="users" />
      </div>
      <SearchFilters placeholder="Search by name, email, or phone..." tabs={['All', 'Admin', 'Member', 'Active', 'Inactive']} />
      <section className="panel">
        <DataTable
          headers={['Name ↑', 'Email', 'Role', 'Phone', 'Joined', 'Status', 'Actions']}
          rows={members.map((user) => [user.name, user.email, user.role, user.phone, user.joined, user.status, 'view deactivate'])}
          actionIcons
        />
        <p className="table-foot">Showing 1 to 5 of 5 users <span>Page 1 of 1</span></p>
      </section>
    </>
  )
}

export function TransactionsAdmin() {
  return (
    <>
      <PageHeader title="Transaction Management" subtitle="View and manage all book borrowing transactions" />
      <div className="stats-grid four">
        <StatCard label="Total Transactions" value="19" icon="transaction" />
        <StatCard label="Active" value="14" icon="check" tone="blue" />
        <StatCard label="Overdue" value="2" icon="alert" tone="danger" />
        <StatCard label="Completed" value="3" icon="check" tone="good" />
      </div>
      <SearchFilters placeholder="Search by book, user, or transaction ID..." />
      <section className="panel">
        <DataTable
          headers={['Transaction ID', 'User', 'Book', 'Borrow Date ↓', 'Due Date', 'Return Date', 'Renewals', 'Status', 'Actions']}
          rows={transactions.map((tx) => [tx.id, tx.user, tx.book, tx.borrow, tx.due, tx.returnDate, '0', tx.status, 'Return'])}
          actionIcons
        />
      </section>
    </>
  )
}

export function FinesAdmin() {
  return (
    <>
      <PageHeader title="Fine Management" subtitle="Track and manage library fines and payments" />
      <div className="stats-grid four">
        <StatCard label="Total Fines" value="₱85.00" hint="3 fines" icon="fine" />
        <StatCard label="Unpaid" value="₱85.00" hint="2 fines" icon="alert" tone="danger" />
        <StatCard label="Paid" value="₱0.00" hint="1 fines" icon="check" tone="good" />
        <StatCard label="Waived" value="₱0.00" hint="0 fines" icon="alert" tone="blue" />
      </div>
      <SearchFilters placeholder="Search by user, fine ID, or reason..." tabs={['All', 'Unpaid', 'Paid', 'Waived']} />
      <section className="panel">
        <DataTable
          headers={['Fine ID', 'User', 'Amount', 'Reason', 'Created ↓', 'Paid Date', 'Payment Method', 'Status', 'Actions']}
          rows={fines.map((fine) => [fine.id, fine.user, fine.amount, fine.reason, fine.created, fine.paid, fine.method, fine.status, fine.status === 'Unpaid' ? 'Waive' : ''])}
          actionIcons
        />
        <p className="table-foot">Showing 1 to 3 of 3 fines <span>Page 1 of 1</span></p>
      </section>
    </>
  )
}

export function ReportsAdmin() {
  return (
    <>
      <PageHeader title="Reports & Analytics" subtitle="Generate comprehensive reports and insights" action={<button className="primary"><Icon name="download" />Export Report</button>} />
      <div className="report-tabs">
        {[
          ['chart', 'Most Borrowed'],
          ['alert', 'Overdue Stats'],
          ['users', 'Active Users'],
          ['box', 'Inventory Status'],
          ['fine', 'Fine Collection'],
          ['chart', 'Circulation'],
        ].map(([icon, label], index) => <button className={index === 0 ? 'active' : ''} key={label}><Icon name={icon as IconName} />{label}</button>)}
      </div>
      <section className="panel">
        <h2><Icon name="chart" />Most Borrowed Books</h2>
        <DataTable
          headers={['Rank', 'Title', 'Author', 'Category', 'Total Borrows', 'Availability']}
          rows={books.map((book, index) => [String(index + 1), book.title, book.author, book.category, `${book.borrows} times`, `${book.available} / ${book.total}`])}
        />
      </section>
    </>
  )
}
