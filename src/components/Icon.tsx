import type { IconName } from '../types'

const iconPaths: Record<IconName, string> = {
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5a1.5 1.5 0 0 1-1.5 1.5H7a3 3 0 0 0-3 3V5.5Zm0 0V21a3 3 0 0 1 3-3h11',
  dashboard: 'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  transaction: 'M7 7h11l-3-3M17 17H6l3 3M5 12h14',
  fine: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6',
  report: 'M6 2h9l5 5v15H6V2Zm8 0v6h6M9 13h6M9 17h8',
  history: 'M3 12a9 9 0 1 0 3-6.7M3 4v6h6M12 7v6l4 2',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
  profile: 'M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  search: 'm21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z',
  check: 'M20 6 9 17l-5-5',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 16.2A2 2 0 0 0 3.6 23h16.8a2 2 0 0 0 1.8-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z',
  plus: 'M12 5v14M5 12h14',
  filter: 'M3 5h18l-7 8v6l-4 2v-8L3 5Z',
  login: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3',
  moon: 'M21 12.8A8.5 8.5 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  chart: 'M4 19V5M8 17v-6M12 17V7M16 17v-3M20 17V9',
  box: 'M21 8 12 3 3 8l9 5 9-5ZM3 8v8l9 5 9-5V8M12 13v8',
  edit: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z',
  copy: 'M8 8h12v12H8V8ZM4 16H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1',
  archive: 'M3 7h18M5 7v13h14V7M8 3h8l2 4H6l2-4ZM10 12h4',
  mail: 'M4 4h16v16H4V4Zm0 3 8 6 8-6',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2.1Z',
  map: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0ZM12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  download: 'M12 3v12M7 10l5 5 5-5M5 21h14',
  megaphone: 'M3 11v3a2 2 0 0 0 2 2h3l7 4V5L8 9H5a2 2 0 0 0-2 2Zm15-1 3-2M18 15l3 2',
  renew: 'M21 12a9 9 0 0 1-15.5 6.3M3 12A9 9 0 0 1 18.5 5.7M18 2v4h-4M6 22v-4h4',
}

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  )
}
