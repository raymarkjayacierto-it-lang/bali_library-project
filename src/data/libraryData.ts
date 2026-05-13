import type { IconName } from '../types'

export type Book = {
  id: string
  title: string
  author: string
  category: string
  isbn: string
  year: number
  available: number
  total: number
  borrows: number
  description: string
  cover?: string
}

export type Member = {
  id: string
  name: string
  email: string
  role: 'admin' | 'member'
  phone: string
  joined: string
  status: 'Active' | 'Inactive'
}

export type Transaction = {
  id: string
  user: string
  book: string
  borrow: string
  due: string
  returnDate: string
  renewals: number
  status: 'Active' | 'Overdue' | 'Completed'
}

export type Fine = {
  id: string
  user: string
  amount: string
  reason: string
  created: string
  paid: string
  method: string
  status: 'Paid' | 'Unpaid' | 'Waived'
}

export type NotificationItem = {
  id: string
  type: string
  title: string
  message: string
  date: string
  read: boolean
}

export const books: Book[] = []
export const members: Member[] = []
export const transactions: Transaction[] = []
export const fines: Fine[] = []
export const notifications: NotificationItem[] = []

export const memberNav = [
  { page: 'member-dashboard', label: 'Dashboard', icon: 'dashboard' },
  { page: 'catalog', label: 'Book Catalog', icon: 'book' },
  { page: 'my-books', label: 'My Books', icon: 'book' },
  { page: 'history', label: 'History', icon: 'history' },
  { page: 'notifications', label: 'Notifications', icon: 'bell' },
  { page: 'profile', label: 'Profile', icon: 'profile' },
] as const

export const adminNav = [
  { page: 'admin-dashboard', label: 'Dashboard', icon: 'dashboard' },
  { page: 'books', label: 'Books', icon: 'book' },
  { page: 'users', label: 'Users', icon: 'users' },
  { page: 'transactions', label: 'Transactions', icon: 'transaction' },
  { page: 'fines', label: 'Fines', icon: 'fine' },
  { page: 'reports', label: 'Reports', icon: 'report' },
] as const

export const landingFeatures: [IconName, string, string][] = [
  ['book', 'Vast Collection', 'Access books across Filipino literature, fiction, biography, and reference.'],
  ['dashboard', 'Easy Management', 'Track borrowed books, reservations, fines, and due dates online.'],
  ['history', '24/7 Access', 'Browse and reserve books whenever you need them.'],
  ['users', 'Community Hub', 'Serving Balingasag with quality learning resources.'],
]
