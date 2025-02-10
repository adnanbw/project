import { supabase } from '../lib/supabase'
import { TimeEntry, TimeEntryInput } from '../types/timeTracking'

export const timeEntryService = {
  async createTimeEntry(data: TimeEntryInput): Promise<TimeEntry> {
    const { data: timeEntry, error } = await supabase
      .from('time_entries')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return timeEntry
  },

  async updateTimeEntry(id: string, data: Partial<TimeEntryInput>): Promise<TimeEntry> {
    const { data: timeEntry, error } = await supabase
      .from('time_entries')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return timeEntry
  },

  async getTimeEntries(filters: {
    startDate?: string
    endDate?: string
    projectId?: string
    status?: string
  }) {
    let query = supabase
      .from('time_entries')
      .select(`
        *,
        projects (name),
        tasks (name)
      `)

    if (filters.startDate) {
      query = query.gte('date', filters.startDate)
    }
    if (filters.endDate) {
      query = query.lte('date', filters.endDate)
    }
    if (filters.projectId) {
      query = query.eq('project_id', filters.projectId)
    }
    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  },

  async submitTimesheet(employeeId: string, weekStartDate: string): Promise<void> {
    const { error } = await supabase
      .from('time_entries')
      .update({ status: 'submitted' })
      .eq('employee_id', employeeId)
      .gte('date', weekStartDate)
      .lt('date', new Date(new Date(weekStartDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())
      .eq('status', 'draft')

    if (error) throw error
  }
}
