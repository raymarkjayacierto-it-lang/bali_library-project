import type { IconName } from '../types'
import { Icon } from '../components/Icon'
import { DataTable, EmptyState, PageHeader, SearchFilters, StatCard } from '../components/UI'
import { useLibraryData } from '../context/libraryDataContext'

export function AdminDashboard() {
  const { books, fines, transactions } = useLibraryData()
  const activeTransactions = transactions.filter((item) => item.status === 'Active')
  const overdueBooks = transactions.filter((item) => item.status === 'Overdue')
  const unpaidFines = fines.filter((item) => item.status === 'Unpaid')

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Library statistics will appear here after backend data is added." />
      <div className="stats-grid four">
        <StatCard label="Total Books" value={String(books.length)} hint="Catalog records" icon="users" tone="good" />
        <StatCard label="Active Transactions" value={String(activeTransactions.length)} hint="Current borrowings" icon="transaction" tone="good" />
        <StatCard label="Overdue Books" value={String(overdueBooks.length)} hint="Require attention" icon="alert" tone="danger" />
        <StatCard label="Total Fines" value="0.00" hint={`${unpaidFines.length} unpaid fines`} icon="fine" />
      </div>
      <div className="split-grid">
        <section className="panel">
          <h2><Icon name="chart" />Top Borrowed Books</h2>
          <EmptyState title="No borrowing data" message="Most borrowed books will appear after transactions are recorded." />
        </section>
        <section className="panel">
          <h2><Icon name="alert" />Overdue Books</h2>
          <DataTable
            headers={['Book', 'Due Date', 'Days Late']}
            rows={[]}
            emptyMessage="No overdue books found."
          />
        </section>
      </div>
      <section className="panel">
        <h2>Recent Activity</h2>
        <DataTable
          headers={['Action', 'Details', 'User ID', 'Timestamp']}
          rows={[]}
          emptyMessage="No recent activity yet."
        />
      </section>
    </>
  )
}

export function BooksAdmin() {
  const { books } = useLibraryData()

  return (
    <>
      <PageHeader title="Book Management" subtitle="Manage your library's book collection" action={<button className="primary"><Icon name="plus" />Add Book</button>} />
      <SearchFilters placeholder="Search books..." tabs={['All Categories', 'Show Archived']} />
      <section className="panel">
        <DataTable
          headers={['Title', 'Author', 'Category', 'ISBN', 'Year', 'Available', 'Total', 'Actions']}
          rows={books.map((book) => [book.title, book.author, book.category, book.isbn, String(book.year), String(book.available), String(book.total), 'edit copy archive'])}
          actionIcons
          emptyMessage="No books yet. Add books through the PHP API or admin form."
        />
      </section>
    </>
  )
}

export function UsersAdmin() {
  const { members } = useLibraryData()
  const admins = members.filter((user) => user.role === 'admin')
  const activeUsers = members.filter((user) => user.status === 'Active')
  const inactiveUsers = members.filter((user) => user.status === 'Inactive')

  return (
    <>
      <PageHeader title="User Management" subtitle="Manage library members and their accounts" />
      <div className="stats-grid four">
        <StatCard label="Total Users" value={String(members.length)} icon="users" />
        <StatCard label="Active Users" value={String(activeUsers.length)} icon="users" tone="good" />
        <StatCard label="Inactive Users" value={String(inactiveUsers.length)} icon="users" tone="danger" />
        <StatCard label="Administrators" value={String(admins.length)} icon="users" />
      </div>
      <SearchFilters placeholder="Search by name, email, or phone..." tabs={['All', 'Admin', 'Member', 'Active', 'Inactive']} />
      <section className="panel">
        <DataTable
          headers={['Name', 'Email', 'Role', 'Phone', 'Joined', 'Status', 'Actions']}
          rows={members.map((user) => [user.name, user.email, user.role, user.phone, user.joined, user.status, 'view deactivate'])}
          actionIcons
          emptyMessage="No users yet. Registered members will appear here."
        />
        <p className="table-foot">Showing 0 to 0 of 0 users <span>Page 1 of 1</span></p>
      </section>
    </>
  )
}

export function TransactionsAdmin() {
  const { transactions } = useLibraryData()
  const active = transactions.filter((item) => item.status === 'Active')
  const overdue = transactions.filter((item) => item.status === 'Overdue')
  const completed = transactions.filter((item) => item.status === 'Completed')

  return (
    <>
      <PageHeader title="Transaction Management" subtitle="View and manage all book borrowing transactions" />
      <div className="stats-grid four">
        <StatCard label="Total Transactions" value={String(transactions.length)} icon="transaction" />
        <StatCard label="Active" value={String(active.length)} icon="check" tone="blue" />
        <StatCard label="Overdue" value={String(overdue.length)} icon="alert" tone="danger" />
        <StatCard label="Completed" value={String(completed.length)} icon="check" tone="good" />
      </div>
      <SearchFilters placeholder="Search by book, user, or transaction ID..." />
      <section className="panel">
        <DataTable
          headers={['Transaction ID', 'User', 'Book', 'Borrow Date', 'Due Date', 'Return Date', 'Renewals', 'Status', 'Actions']}
          rows={transactions.map((tx) => [tx.id, tx.user, tx.book, tx.borrow, tx.due, tx.returnDate, String(tx.renewals), tx.status, 'Return'])}
          actionIcons
          emptyMessage="No transactions yet."
        />
      </section>
    </>
  )
}

export function FinesAdmin() {
  const { fines } = useLibraryData()
  const unpaid = fines.filter((fine) => fine.status === 'Unpaid')
  const paid = fines.filter((fine) => fine.status === 'Paid')
  const waived = fines.filter((fine) => fine.status === 'Waived')

  return (
    <>
      <PageHeader title="Fine Management" subtitle="Track and manage library fines and payments" />
      <div className="stats-grid four">
        <StatCard label="Total Fines" value="0.00" hint={`${fines.length} fines`} icon="fine" />
        <StatCard label="Unpaid" value="0.00" hint={`${unpaid.length} fines`} icon="alert" tone="danger" />
        <StatCard label="Paid" value="0.00" hint={`${paid.length} fines`} icon="check" tone="good" />
        <StatCard label="Waived" value="0.00" hint={`${waived.length} fines`} icon="alert" tone="blue" />
      </div>
      <SearchFilters placeholder="Search by user, fine ID, or reason..." tabs={['All', 'Unpaid', 'Paid', 'Waived']} />
      <section className="panel">
        <DataTable
          headers={['Fine ID', 'User', 'Amount', 'Reason', 'Created', 'Paid Date', 'Payment Method', 'Status', 'Actions']}
          rows={fines.map((fine) => [fine.id, fine.user, fine.amount, fine.reason, fine.created, fine.paid, fine.method, fine.status, fine.status === 'Unpaid' ? 'Waive' : ''])}
          actionIcons
          emptyMessage="No fines yet."
        />
        <p className="table-foot">Showing 0 to 0 of 0 fines <span>Page 1 of 1</span></p>
      </section>
    </>
  )
}

export function ReportsAdmin() {
  const { books } = useLibraryData()

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
          emptyMessage="No report data yet."
        />
      </section>
    </>
  )
}
