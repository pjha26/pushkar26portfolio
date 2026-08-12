import { NextResponse } from 'next/server'

// Revalidate every hour
export const revalidate = 3600

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const username = 'pjha26'
  
  if (!token) {
    console.warn("GITHUB_TOKEN is missing. Returning default stats.")
    return NextResponse.json({ repos: 15, commits: 150, live: false })
  }

  try {
    const query = `
      query($login: String!) {
        user(login: $login) {
          repositories(privacy: PUBLIC) {
            totalCount
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { login: username }
      }),
      next: { revalidate: 3600 }
    })

    if (!res.ok) {
      throw new Error(`GitHub GraphQL API returned ${res.status}`)
    }

    const { data } = await res.json()
    
    const repos = data.user.repositories.totalCount || 15
    const commits = data.user.contributionsCollection.contributionCalendar.totalContributions || 150

    return NextResponse.json({ repos, commits, live: true })
  } catch (error) {
    console.error('Error fetching GitHub stats via GraphQL:', error)
    return NextResponse.json({ repos: 15, commits: 150, live: false })
  }
}
