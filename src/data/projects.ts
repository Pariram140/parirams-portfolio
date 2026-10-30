export interface ProjectRecord {
  title: string;
  summary: string;
  technologies: string[];
  repositoryUrl?: string;
}

export const featuredProjects: ProjectRecord[] = [
  {
    title: 'Asynchronous File Processing',
    summary:
      'An event-driven pipeline for handling large compressed and encrypted files, with asynchronous multipart uploads to S3.',
    technologies: ['Java', 'AWS Lambda', 'Amazon SQS', 'Amazon S3'],
  },
  {
    title: 'Secure API Processing',
    summary:
      'API workflows with request validation, AWS API Gateway and WAF, tenant-aware S3 storage, and asynchronous processing.',
    technologies: ['Java', 'AWS API Gateway', 'AWS WAF', 'Amazon S3'],
  },
  {
    title: 'Event-Driven Integration',
    summary:
      'Middleware that transforms third-party API data and routes messages to destination applications with retry handling.',
    technologies: ['Java', 'MuleSoft', 'Amazon SQS', 'ActiveMQ'],
  },
];

export const personalProjects: ProjectRecord[] = [
  {
    title: 'Chess Game',
    summary: 'A chess game with move validation and an interactive board.',
    technologies: ['React', 'JavaScript'],
    repositoryUrl: 'https://github.com/Pariram140/Chess-game',
  },
  {
    title: 'To Do App',
    summary: 'A Flutter task manager for creating, editing, and completing tasks.',
    technologies: ['Flutter'],
    repositoryUrl: 'https://github.com/Pariram140/to-do-app',
  },
];

