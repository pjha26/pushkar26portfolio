import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  const username = 'pjha26'

  try {
    const res = await fetch(`https://gh-calendar.rschristian.dev/user/${username}`, {
      next: { revalidate: 3600 }
    })

    if (!res.ok) {
      throw new Error(`Proxy Error: ${res.status}`)
    }
    
    const data = await res.json()
    
    // Transform into the Activity array format expected by react-activity-calendar
    // Data format: { total: number, contributions: Array<Array<{ date, intensity: string, count }>> }
    
    const currentYear = new Date().getFullYear()
    const activities = []
    
    for (const week of data.contributions) {
      for (const day of week) {
        // Only include current year
        if (day.date && day.date.startsWith(String(currentYear))) {
          activities.push({
            date: day.date,
            count: day.count,
            level: parseInt(day.intensity, 10) || 0
          })
        }
      }
    }

    // If no current year data, include all
    if (activities.length === 0) {
      for (const week of data.contributions) {
        for (const day of week) {
          activities.push({
            date: day.date,
            count: day.count,
            level: parseInt(day.intensity, 10) || 0
          })
        }
      }
    }

    return NextResponse.json(activities)
  } catch (error) {
    console.error('Calendar Fetch Error:', error)
    return NextResponse.json({ error: "Failed to fetch calendar", details: String(error) }, { status: 500 })
  }
}
