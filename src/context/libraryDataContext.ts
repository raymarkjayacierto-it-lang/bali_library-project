import { createContext, useContext } from 'react'
import type { Book, Fine, Member, NotificationItem, Transaction } from '../data/libraryData'

export type LibraryData = {
  books: Book[]
  members: Member[]
  transactions: Transaction[]
  fines: Fine[]
  notifications: NotificationItem[]
  loading: boolean
  error: string | null
  reload: () => Promise<void>
}

export const LibraryDataContext = createContext<LibraryData | null>(null)

export function useLibraryData() {
  const context = useContext(LibraryDataContext)

  if (!context) {
    throw new Error('useLibraryData must be used inside LibraryDataProvider')
  }

  return context
}
