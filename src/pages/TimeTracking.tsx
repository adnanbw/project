import React, { useState } from 'react'
import { Navigation } from '../components/Navigation'
import { Layout } from '../components/Layout'
import { TimeEntryForm } from '../components/TimeTracking/TimeEntryForm'
import { WeeklyTimesheet } from '../components/TimeTracking/WeeklyTimesheet'

export const TimeTracking = () => {
  const [showEntryForm, setShowEntryForm] = useState(false)

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Time Tracking</h1>
          <button
            onClick={() => setShowEntryForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            New Time Entry
          </button>
        </div>

        {/* Modal for New Time Entry */}
        {showEntryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Time Entry</h2>
              <TimeEntryForm
                onSubmit={async (data) => {
                  // Handle submission
                  setShowEntryForm(false)
                }}
                onCancel={() => setShowEntryForm(false)}
              />
            </div>
          </div>
        )}

        {/* Weekly Calendar View */}
        <div className="mt-6">
          <WeeklyTimesheet employeeId="current-user-id" />
        </div>
      </div>
    </Layout>
  )
}