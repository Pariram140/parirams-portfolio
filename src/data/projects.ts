export interface ProjectRecord {
  title: string;
  summary: string;
  technologies: string[];
  caseStudySlug?: string;
  repositoryUrl?: string;
}

export const featuredProjects: ProjectRecord[] = [
  {
    title: 'Asynchronous File Processing',
    summary:
      'Near-real-time delivery of large, compressed, encrypted files to S3.',
    technologies: ['Java', 'AWS Lambda', 'Amazon SQS', 'Amazon S3'],
    caseStudySlug: 'asynchronous-file-processing',
  },
  {
    title: 'Secure API Processing',
    summary:
      'Tenant-aware API processing with request validation and asynchronous ETL.',
    technologies: ['Java', 'AWS API Gateway', 'AWS WAF', 'Amazon S3'],
    caseStudySlug: 'secure-api-processing',
  },
  {
    title: 'Event-Driven Integration',
    summary:
      'Configurable routing for third-party data, with retries for failed messages.',
    technologies: ['Java', 'MuleSoft', 'Amazon SQS', 'ActiveMQ'],
    caseStudySlug: 'event-driven-integration',
  },
];

export const personalProjects: ProjectRecord[] = [
  {
    title: 'Chess Game',
    summary: 'React chess with legal-move validation.',
    technologies: ['React', 'JavaScript'],
    repositoryUrl: 'https://github.com/Pariram140/Chess-game',
  },
  {
    title: 'To Do App',
    summary: 'Flutter task manager with priorities, due dates, and completion tracking.',
    technologies: ['Flutter'],
    repositoryUrl: 'https://github.com/Pariram140/to-do-app',
  },
];

