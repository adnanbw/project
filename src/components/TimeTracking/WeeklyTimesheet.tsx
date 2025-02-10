import React, { useEffect, useState } from 'react'
import { TimeEntry } from '../../types/timeTracking'
import { timeEntryService } from '../../services/timeEntryService'

interface WeeklyTimesheetProps {
  employeeId: string
  projectId?: string
}

export const WeeklyTimesheet: React.FC<WeeklyTimesheetProps> = ({ employeeId, projectId }) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [weekStart, setWeekStart] = useState(getStartOfWeek(new Date()))
  
  useEffect(() => {
    loadTimeEntries()
  }, [weekStart, projectId])

  const loadTimeEntries = async () => {
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)
    
    const entries = await timeEntryService.getTimeEntries({
      startDate: weekStart.toISOString(),
      endDate: weekEnd.toISOString(),
      projectId
    })
    setTimeEntries(entries)
  }

  const handleEntrySubmit = async (entry: TimeEntry) => {
    try {
      if (entry.id) {
        await timeEntryService.updateTimeEntry(entry.id, entry)
      } else {
        await timeEntryService.createTimeEntry(entry)
      }
      await loadTimeEntries()
    } catch (error) {
      console.error('Error saving time entry:', error)
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Weekly Timesheet</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setWeekStart(getPreviousWeek(weekStart))}
            className="px-3 py-1 bg-gray-100 rounded"
          >
            Previous Week
          </button>
          <button 
            onClick={() => setWeekStart(getNextWeek(weekStart))}
            className="px-3 py-1 bg-gray-100 rounded"
          >
            Next Week
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-4">
        {getDaysOfWeek(weekStart).map((date) => (
          <DayColumn 
            key={date.toISOString()}
            date={date}
            entries={timeEntries.filter(entry => 
              new Date(entry.date).toDateString() === date.toDateString()
            )}
            onEntrySubmit={handleEntrySubmit}
            employeeId={employeeId}
          />
        ))}
      </div>
    </div>
  )
}

// Helper Components and Functions
const DayColumn: React.FC<{
  date: Date
  entries: TimeEntry[]
  onEntrySubmit: (entry: TimeEntry) => Promise<void>
  employeeId: string
}> = ({ date, entries, onEntrySubmit, employeeId }) => {
  const handleAddEntry = async () => {
    const newEntry = {
      employee_id: employeeId,
      date: date.toISOString().split('T')[0],
      hours: 0,
      description: '',
      billable: true,
      status: 'draft'
    } as TimeEntry

    await onEntrySubmit(newEntry)
  }

  return (
    <div className="border rounded p-2">
      <div className="font-semibold mb-2">
        {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      </div>
      {entries.map(entry => (
        <TimeEntryCard key={entry.id} entry={entry} onUpdate={onEntrySubmit} />
      ))}
      <button 
        onClick={handleAddEntry}
        className="mt-2 w-full px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
      >
        + Add Entry
      </button>
    </div>
  )
}
const TimeEntryCard: React.FC<{
  entry: TimeEntry
  onUpdate: (entry: TimeEntry) => Promise<void>
}> = ({ entry, onUpdate }) => {
  return (
    <div className="bg-white p-2 mb-2 rounded shadow-sm">
      <div className="text-sm font-medium">{entry.hours} hours</div>
      <div className="text-xs text-gray-600">{entry.description}</div>
    </div>
  )
}

// Utility functions
function getStartOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - day)
  return d
}

function getPreviousWeek(date: Date): Date {
  const d = new Date(date)
  d.setDate(d.getDate() - 7)
  return d
}

function getNextWeek(date: Date): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + 7)
  return d
}

function getDaysOfWeek(startDate: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    return d
  })
}
