import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Book, Fine, Member, NotificationItem, Transaction } from '../data/libraryData'
import { api } from '../services/api'
import { LibraryDataContext } from './libraryDataContext'

export function LibraryDataProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [fines, setFines] = useState<Fine[]>([])
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = async () => {
    setLoading(true)
    setError(null)

    try {
      const [bookData, userData, transactionData, fineData, notificationData] = await Promise.all([
        api.list<Book>('books'),
        api.list<Member>('users'),
        api.list<Transaction>('transactions'),
        api.list<Fine>('fines'),
        api.list<NotificationItem>('notifications'),
      ])

      setBooks(bookData)
      setMembers(userData)
      setTransactions(transactionData)
      setFines(fineData)
      setNotifications(notificationData)
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Unable to load backend data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [bookData, userData, transactionData, fineData, notificationData] = await Promise.all([
          api.list<Book>('books'),
          api.list<Member>('users'),
          api.list<Transaction>('transactions'),
          api.list<Fine>('fines'),
          api.list<NotificationItem>('notifications'),
        ])

        setBooks(bookData)
        setMembers(userData)
        setTransactions(transactionData)
        setFines(fineData)
        setNotifications(notificationData)
      } catch (exception) {
        setError(exception instanceof Error ? exception.message : 'Unable to load backend data')
      } finally {
        setLoading(false)
      }
    }

    void loadInitialData()
  }, [])

  const value = useMemo(
    () => ({ books, members, transactions, fines, notifications, loading, error, reload }),
    [books, members, transactions, fines, notifications, loading, error],
  )

  return (
    <LibraryDataContext.Provider value={value}>
      {children}
    </LibraryDataContext.Provider>
  )
}
