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
    // Fetch user details for public repo count
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    })

    if (!userRes.ok) {
      throw new Error(`GitHub API returned ${userRes.status}`)
    }

    const userData = await userRes.json()
    const repos = userData.public_repos || 15

    // To get total commits, we search the search/commits API for author:pjha26
    // Note: Search API has strict rate limits (30/min), so caching is crucial.
    const searchRes = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.cloak-preview+json',
      },
      next: { revalidate: 3600 }
    })
    
    let commits = 150
    if (searchRes.ok) {
      const searchData = await searchRes.json()
      commits = searchData.total_count || 150
    }

    return NextResponse.json({ repos, commits, live: true })
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    return NextResponse.json({ repos: 15, commits: 150, live: false })
  }
}
