import type { IconName } from '../types'

export const books = [
  {
    title: 'ABNKKBSNPLAko?!',
    author: 'Bob Ong',
    category: 'Filipino Literature',
    isbn: '978-971-08-6106-3',
    year: 2001,
    available: 0,
    total: 6,
    borrows: 6,
    cover: 'cover-one',
    description: 'A humorous take on the Filipino high school experience, written with wit and nostalgia.',
  },
  {
    title: 'America Is in the Heart',
    author: 'Carlos Bulosan',
    category: 'Biography',
    isbn: '978-0-295-95366-8',
    year: 1946,
    available: 2,
    total: 2,
    borrows: 1,
    cover: 'cover-two',
    description: 'An autobiography chronicling the Filipino immigrant experience in America.',
  },
  {
    title: "Bata, Bata... Pa'no Ka Ginawa?",
    author: 'Lualhati Bautista',
    category: 'Filipino Literature',
    isbn: '978-971-23-5678-2',
    year: 1984,
    available: 0,
    total: 3,
    borrows: 3,
    cover: 'cover-three',
    description: 'A novel about motherhood, feminism, and changing Filipino family life.',
  },
  {
    title: "Dekada '70",
    author: 'Lualhati Bautista',
    category: 'Filipino Literature',
    isbn: '978-971-508-134-0',
    year: 1983,
    available: 1,
    total: 4,
    borrows: 3,
    cover: 'cover-four',
    description: 'A family story set during martial law in the Philippines.',
  },
  {
    title: 'Noli Me Tangere',
    author: 'Jose Rizal',
    category: 'Filipino Literature',
    isbn: '978-971-8845-30-0',
    year: 1887,
    available: 2,
    total: 5,
    borrows: 2,
    cover: 'cover-five',
    description: 'A landmark novel exposing social injustices during Spanish colonial rule.',
  },
  {
    title: 'Dwellers',
    author: 'Eliza Victoria',
    category: 'Fiction',
    isbn: '978-971-27-2876-3',
    year: 2014,
    available: 1,
    total: 3,
    borrows: 1,
    cover: 'cover-six',
    description: 'A speculative fiction story about identity, memory, and survival.',
  },
]

export const members = [
  { name: 'Ana Reyes', email: 'ana.reyes@email.com', role: 'member', phone: '+63 918 345 6789', joined: '2/15/2024', status: 'Active' },
  { name: 'Elena Torres', email: 'elena.torres@email.com', role: 'member', phone: '+63 920 567 8901', joined: '4/25/2024', status: 'Active' },
  { name: 'Juan Cruz', email: 'juan.cruz@email.com', role: 'member', phone: '+63 917 234 5678', joined: '1/10/2024', status: 'Active' },
  { name: 'Maria Santos', email: 'admin@balingasag.gov.ph', role: 'admin', phone: '+63 912 345 6789', joined: '6/1/2023', status: 'Active' },
  { name: 'Pedro Garcia', email: 'pedro.garcia@email.com', role: 'member', phone: '+63 919 456 7890', joined: '3/20/2024', status: 'Active' },
]

export const transactions = [
  { id: 't13', user: 'Elena Torres', book: "Bata, Bata... Pa'no Ka Ginawa?", borrow: '5/5/2026', due: '5/19/2026', returnDate: '-', status: 'Active' },
  { id: 't12', user: 'Pedro Garcia', book: "Bata, Bata... Pa'no Ka Ginawa?", borrow: '5/4/2026', due: '5/18/2026', returnDate: '-', status: 'Active' },
  { id: 't5', user: 'Pedro Garcia', book: 'ABNKKBSNPLAko?!', borrow: '5/3/2026', due: '5/17/2026', returnDate: '-', status: 'Active' },
  { id: 't19', user: 'Ana Reyes', book: "Dekada '70", borrow: '5/3/2026', due: '5/17/2026', returnDate: '-', status: 'Active' },
  { id: 't4', user: 'Pedro Garcia', book: 'ABNKKBSNPLAko?!', borrow: '5/2/2026', due: '5/16/2026', returnDate: '-', status: 'Active' },
  { id: 't18', user: 'Elena Torres', book: "Dekada '70", borrow: '5/2/2026', due: '5/16/2026', returnDate: '-', status: 'Active' },
  { id: 't11', user: 'Ana Reyes', book: "Bata, Bata... Pa'no Ka Ginawa?", borrow: '5/1/2026', due: '5/15/2026', returnDate: '-', status: 'Active' },
]

export const fines = [
  { id: 'f1', user: 'Ana Reyes', amount: '₱30.00', reason: 'Book overdue by 6 days (₱5/day)', created: '5/1/2026', paid: '-', method: '-', status: 'Unpaid' },
  { id: 'f2', user: 'Elena Torres', amount: '₱55.00', reason: 'Book overdue by 11 days (₱5/day)', created: '4/26/2026', paid: '-', method: '-', status: 'Unpaid' },
  { id: 'f3', user: 'Juan Cruz', amount: '₱0.00', reason: 'Book returned on time', created: '4/19/2026', paid: '4/19/2026', method: '-', status: 'Paid' },
]

export const memberNav = [
  { page: 'member-dashboard', label: 'Dashboard', icon: 'dashboard' },
  { page: 'catalog', label: 'Book Catalog', icon: 'book' },
  { page: 'my-books', label: 'My Books', icon: 'book' },
  { page: 'history', label: 'History', icon: 'history' },
  { page: 'notifications', label: 'Notifications', icon: 'bell', badge: '2' },
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
