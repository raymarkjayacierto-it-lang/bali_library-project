export type Page =
  | 'landing'
  | 'login'
  | 'signin'
  | 'member-dashboard'
  | 'catalog'
  | 'my-books'
  | 'history'
  | 'notifications'
  | 'profile'
  | 'admin-dashboard'
  | 'books'
  | 'users'
  | 'transactions'
  | 'fines'
  | 'reports'

export type IconName =
  | 'book'
  | 'dashboard'
  | 'users'
  | 'transaction'
  | 'fine'
  | 'report'
  | 'history'
  | 'bell'
  | 'profile'
  | 'search'
  | 'calendar'
  | 'check'
  | 'alert'
  | 'plus'
  | 'filter'
  | 'login'
  | 'moon'
  | 'globe'
  | 'chart'
  | 'box'
  | 'edit'
  | 'copy'
  | 'archive'
  | 'mail'
  | 'phone'
  | 'map'
  | 'download'
  | 'megaphone'
  | 'renew'

export type NavItem = {
  page: Page
  label: string
  icon: IconName
  badge?: string
}
