import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Generate realistic dummy emails
const generateDummyEmails = (count: number): Array<{
  email: string
  discoverySource: string
  userAgent: string
  source: string
  createdAt: Date
}> => {
  const firstNames = [
    'Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Jessica', 'John', 'Ashley', 
    'Chris', 'Amanda', 'Matt', 'Jennifer', 'Ryan', 'Lisa', 'Kevin', 'Michelle',
    'Daniel', 'Lauren', 'Andrew', 'Nicole', 'Jason', 'Stephanie', 'Brian', 'Rachel',
    'Tyler', 'Amy', 'Nathan', 'Heather', 'Justin', 'Melissa', 'Brandon', 'Angela',
    'Aaron', 'Kimberly', 'Adam', 'Rebecca', 'James', 'Anna', 'Robert', 'Samantha'
  ]
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
    'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
  ]
  
  const domains = [
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'protonmail.com',
    'icloud.com', 'aol.com', 'company.com', 'tech.io', 'startup.co'
  ]
  
  const discoverySources = [
    'Google Search', 'Social Media', 'Friend Referral', 'LinkedIn', 'Twitter',
    'Product Hunt', 'Reddit', 'Newsletter', 'Blog Post', 'YouTube', 'Podcast',
    'Conference', 'Other'
  ]
  
  const sources = [
    'dummy-waitlist-form', 'dummy-landing-page', 'dummy-social-media', 'dummy-referral', 'dummy-blog',
    'dummy-newsletter', 'dummy-search', 'dummy-direct'
  ]
  
  const userAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  ]
  
  const emails: Array<{
    email: string
    discoverySource: string
    userAgent: string
    source: string
    createdAt: Date
  }> = []
  
  const usedEmails = new Set<string>()
  
  for (let i = 0; i < count; i++) {
    let email: string
    let attempts = 0
    
    // Generate unique email
    do {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const domain = domains[Math.floor(Math.random() * domains.length)]
      const randomNum = Math.floor(Math.random() * 9999)
      
      // Various email formats
      const formats = [
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
        `${firstName.toLowerCase()}${lastName.toLowerCase()}@${domain}`,
        `${firstName.toLowerCase()}${randomNum}@${domain}`,
        `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}@${domain}`,
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@${domain}`
      ]
      
      email = formats[Math.floor(Math.random() * formats.length)]
      attempts++
    } while (usedEmails.has(email) && attempts < 10)
    
    usedEmails.add(email)
    
    // Generate random date within last 60 days
    const daysAgo = Math.floor(Math.random() * 60)
    const hoursAgo = Math.floor(Math.random() * 24)
    const minutesAgo = Math.floor(Math.random() * 60)
    const createdAt = new Date(Date.now() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000))
    
    emails.push({
      email,
      discoverySource: discoverySources[Math.floor(Math.random() * discoverySources.length)],
      userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      createdAt
    })
  }
  
  return emails
}

async function main() {
  console.log('Starting to seed the database with dummy email data...')
  
  // Check current count
  const currentCount = await prisma.emailSubmission.count({
    where: { status: 'ACTIVE' }
  })
  
  console.log(`Current active emails in database: ${currentCount}`)
  
  // Calculate how many emails to add to reach ~162
  const targetCount = 162
  const emailsToAdd = Math.max(0, targetCount - currentCount)
  
  if (emailsToAdd === 0) {
    console.log(`Database already has ${currentCount} emails, which meets or exceeds target of ${targetCount}`)
    return
  }
  
  console.log(`Adding ${emailsToAdd} dummy emails to reach target of ${targetCount}...`)
  
  const dummyEmails = generateDummyEmails(emailsToAdd)
  
  // Insert emails in batches to avoid potential issues
  const batchSize = 10
  let inserted = 0
  
  for (let i = 0; i < dummyEmails.length; i += batchSize) {
    const batch = dummyEmails.slice(i, i + batchSize)
    
    try {
      await prisma.emailSubmission.createMany({
        data: batch.map(emailData => ({
          email: emailData.email,
          discoverySource: emailData.discoverySource,
          userAgent: emailData.userAgent,
          source: emailData.source,
          createdAt: emailData.createdAt,
          status: 'ACTIVE'
        })),
        skipDuplicates: true
      })
      
      inserted += batch.length
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(dummyEmails.length / batchSize)} (${inserted}/${dummyEmails.length} total)`)
    } catch (error) {
      console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error)
    }
  }
  
  const finalCount = await prisma.emailSubmission.count({
    where: { status: 'ACTIVE' }
  })
  
  console.log(`✅ Seeding completed! Total active emails: ${finalCount}`)
  console.log(`📈 Added ${finalCount - currentCount} new emails`)
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })