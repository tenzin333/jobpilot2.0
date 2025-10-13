// jobs/jobScraper.js
import cron from 'node-cron';
import Job from '../models/job-schema.js';
import fetch from 'node-fetch';

const POPULAR_SEARCHES = [
  { keyword: 'software engineer', jobType: 'remote', location: 'any' },
  { keyword: 'front end developer', jobType: 'any', location: 'India' },
  { keyword: 'full stack', jobType: 'any', location: 'India' },
  // Add your most common searches
];

async function scheduledScrape() {
  console.log('Running scheduled job scrape...');
  
  for (const search of POPULAR_SEARCHES) {
    const url = `https://api.scrapingdog.com/linkedin/jobs?api_key=${process.env.SCRAPINGDOG_KEY}&query=${encodeURIComponent(
      search.keyword
    )}&location=${encodeURIComponent(search.location)}&jobType=${encodeURIComponent(search.jobType)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) continue;

      const jobs = await response.json();
      if (!Array.isArray(jobs)) continue;

      const bulkOps = jobs.map(job => ({
        updateOne: {
          filter: { title: job.title, company: job.company, location: job.location },
          update: { $set: { ...job, fetchedAt: Date.now(), source: 'LinkedIn' } },
          upsert: true
        }
      }));

      await Job.bulkWrite(bulkOps);
      
      // Rate limiting: wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (err) {
      console.error(`Failed to scrape ${search.keyword}:`, err.message);
    }
  }
}

// Run every 6 hours
export function startJobScraperCron() {
  cron.schedule('0 */6 * * *', scheduledScrape);
  console.log('Job scraper cron started (every 6 hours)');
}