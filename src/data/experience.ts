export interface ExperienceRecord {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  highlights: string[];
}

export const experience: ExperienceRecord[] = [
  {
    role: 'SDE 2',
    company: 'PayPal',
    period: 'Nov 2025 – Present',
    location: 'Chennai, India',
    current: true,
    highlights: [],
  },
  {
    role: 'Software Developer M2',
    company: 'Symphony Talent',
    period: 'May 2023 – Nov 2025',
    location: 'Bangalore, India',
    highlights: [
      'Implemented asynchronous processing for compressed, encrypted large files, moving results to S3 with Lambda, SQS, and multipart uploads.',
      'Built secure API workflows with request validation, API Gateway and WAF, tenant-aware S3 storage, and asynchronous processing.',
    ],
  },
  {
    role: 'Software Developer M1',
    company: 'Symphony Talent',
    period: 'May 2021 – May 2023',
    location: 'Bangalore, India',
    highlights: [
      'Integrated third-party APIs to synchronize candidate, job, and application data between ATS platforms and Smashfly CRM.',
      'Built asynchronous MuleSoft middleware for data transformation, message routing, and retry handling, with SQS and ActiveMQ.',
      'Added token authentication between internal APIs.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Symphony Talent',
    period: 'Mar 2021 – May 2021',
    location: 'Bangalore, India',
    highlights: [
      'Built Gmail API data ingestion and an analytics dashboard.',
    ],
  },
];

