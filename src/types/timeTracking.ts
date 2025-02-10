export interface TimeEntry {
  id: string
  employee_id: string
  project_id: string
  task_id?: string
  date: string
  hours: number
  description: string
  billable: boolean
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  billing_rate?: number
  start_time?: string
  end_time?: string
  created_at: string
  updated_at: string
}

export interface TimeEntryInput {
  employee_id: string
  project_id: string
  task_id?: string
  date: string
  hours: number
  description: string
  billable: boolean
  billing_rate?: number
  start_time?: string
  end_time?: string
}
