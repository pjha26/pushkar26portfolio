import assert from 'node:assert/strict'

const origin = process.argv[2] || 'http://localhost:3000'
const projects = ['arth-ai', 'mockmind', 'expertbook', 'promptwatch']
const repositories = ['arth.ai', 'mock-mind', 'real-time', 'promptwatch']
const canonicalOrigin = 'https://pushkar26portfolio.vercel.app'

async function get(path) {
  const response = await fetch(new URL(path, origin))
  assert.equal(response.status, 200, `${path} must load successfully`)
  return response
}

const home = await (await get('/')).text()
assert.ok(
  home.includes('data-scroll-behavior="smooth"'),
  'Next.js must know about native smooth scrolling'
)
const mainTag = home.match(/<main\b[^>]*>/)?.[0]
assert.ok(mainTag?.includes('cinematic-experience'), 'The homepage must retain its cinematic shell')
assert.ok(
  !/\bhidden\b|opacity:\s*0(?:;|["\s])/.test(mainTag),
  'Server-rendered content must be visible before JavaScript'
)
assert.equal((home.match(/<h1[\s>]/g) || []).length, 1, 'Home must have one primary heading')
assert.ok(
  home.includes('mailto:pjha2608@gmail.com'),
  'Visitors must have the correct direct contact link'
)
assert.ok(!home.includes('pushkarraj88313@gmail.com'), 'The old email must not be displayed')
assert.ok(home.includes('href="https://github.com/pjha26"'), 'The GitHub profile must be correct')
assert.ok(
  home.includes('href="https://leetcode.com/u/pjha2608/"'),
  'The LeetCode profile must be correct'
)
assert.ok(home.includes('href="#main-content"'), 'A keyboard skip link must be present')
assert.ok(home.includes('pushkar-3d-portrait.png'), 'The homepage must show the custom portrait')
assert.ok(home.includes('Enable ambient soundtrack'), 'The soundtrack must be visitor initiated')
assert.ok(home.includes('class="hero-sound"'), 'Sound must be discoverable in the homepage hero')
assert.ok(home.includes('aria-label="Project chapters"'), 'Projects must have a chapter navigator')
for (const id of projects) {
  assert.ok(home.includes(`href="#work-${id}"`), `${id} must have a working chapter link`)
  assert.ok(home.includes(`id="work-${id}"`), `${id} must have a server-rendered chapter target`)
}
assert.ok(!/<iframe[\s>]/.test(home), 'The homepage must not contain an embedded music player')
assert.ok(!home.includes('open.spotify.com/embed'), 'The old Spotify popup must be removed')

const titles = new Set()
for (const id of projects) {
  const path = `/projects/${id}`
  assert.ok(home.includes(`href="${path}"`), `${id} must be reachable from the homepage`)
  const html = await (await get(path)).text()
  const repository = repositories[projects.indexOf(id)]
  assert.ok(
    html.includes(`href="https://github.com/pjha26/${repository}"`),
    `${id} must link directly to its source repository`
  )
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${id} must have one primary heading`)
  assert.ok(
    html.includes(`rel="canonical" href="${canonicalOrigin}${path}"`),
    `${id} must have its own canonical URL`
  )
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  assert.ok(title, `${id} must have a page title`)
  titles.add(title)
  assert.ok(html.includes('class="case-cover"'), `${id} must show a product preview`)
}
assert.equal(titles.size, projects.length, 'Every case study must have a unique title')

for (const path of [
  '/resume.pdf',
  '/icon.svg',
  '/manifest.json',
  '/fonts/syne-latin.woff2',
  '/fonts/manrope-latin.woff2',
  '/pushkar-3d-portrait.png',
  '/arthai.png',
  '/interviewai.png',
  '/ai-concierge.png',
  '/promptwatch.png',
  '/PRF1.jpeg',
]) {
  await get(path)
}

const imagePath = home.match(/src="([^\"]*\/_next\/image[^\"]*)"/)?.[1]?.replaceAll('&amp;', '&')
assert.ok(imagePath, 'Homepage must use optimized images')
const image = await get(imagePath)
assert.ok(
  image.headers.get('content-type')?.startsWith('image/'),
  'Image optimization must return an image'
)

const og = await get('/opengraph-image')
assert.equal(og.headers.get('content-type'), 'image/png', 'The social preview must render')
const sitemap = await (await get('/sitemap.xml')).text()
for (const id of projects)
  assert.ok(sitemap.includes(`/projects/${id}`), `${id} must be in the sitemap`)

const missing = await fetch(new URL('/projects/not-a-real-project', origin))
assert.equal(missing.status, 404, 'An unknown project must return a proper 404')
console.log(
  'Portfolio smoke checks passed: homepage, four case studies, contact, assets, optimized images, social preview, sitemap, and 404.'
)
