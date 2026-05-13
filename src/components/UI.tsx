import type { ReactNode } from 'react'
import type { IconName } from '../types'
import { Icon } from './Icon'

export function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  )
}

export function StatCard({ label, value, hint, icon, tone = 'neutral' }: { label: string; value: string; hint?: string; icon: IconName; tone?: 'neutral' | 'good' | 'danger' | 'blue' }) {
  return (
    <article className={`stat-card ${tone}`}>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {hint ? <p>{hint}</p> : null}
      </div>
      <Icon name={icon} size={30} />
    </article>
  )
}

export function SearchFilters({ placeholder, tabs = ['All', 'Active', 'Overdue', 'Completed'] }: { placeholder: string; tabs?: string[] }) {
  return (
    <div className="filterbar">
      <label className="search">
        <Icon name="search" />
        <input placeholder={placeholder} aria-label={placeholder} />
      </label>
      <button className="pill active" type="button"><Icon name="filter" />{tabs[0]}</button>
      {tabs.slice(1).map((tab) => <button className="pill" type="button" key={tab}>{tab}</button>)}
    </div>
  )
}

export function EmptyState({ title = 'No records yet', message = 'Connect the PHP backend or add a new record to show data here.' }: { title?: string; message?: string }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  )
}

export function DataTable({ headers, rows, actionIcons = false, emptyMessage }: { headers: string[]; rows: string[][]; actionIcons?: boolean; emptyMessage?: string }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length}>
                <EmptyState message={emptyMessage} />
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`}>
                {row.map((cell, cellIndex) => {
                  const isStatus = ['Active', 'Completed', 'Paid', 'Unpaid', 'admin', 'member'].includes(cell)
                  const isActions = actionIcons && cellIndex === row.length - 1
                  return (
                    <td key={`${cell}-${cellIndex}`}>
                      {isActions ? <ActionCluster label={cell} /> : isStatus ? <span className={`status ${cell.toLowerCase()}`}>{cell}</span> : cell}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

function ActionCluster({ label }: { label: string }) {
  if (!label) return <span className="muted">-</span>
  if (label === 'Return') return <button className="table-action"><Icon name="check" />Return</button>
  if (label === 'Waive') return <button className="table-action"><Icon name="alert" />Waive</button>

  return (
    <div className="icon-actions">
      {(label.includes('view') ? ['profile'] : ['edit', 'copy', 'archive']).map((icon) => (
        <button aria-label={icon} type="button" key={icon}><Icon name={icon as IconName} /></button>
      ))}
      {label.includes('deactivate') && <button className="danger-icon" aria-label="deactivate" type="button"><Icon name="users" /></button>}
    </div>
  )
}

export function ProgressRow({ label, value, count }: { label: string; value: number; count: string }) {
  return (
    <div className="progress-row">
      <strong>{label}</strong>
      <div><span style={{ width: `${value}%` }} /></div>
      <em>{count}</em>
    </div>
  )
}
