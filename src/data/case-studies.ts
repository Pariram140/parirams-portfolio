export interface CaseStudyStep {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  technologies: string[];
  context: string;
  challenge: string;
  approach: string;
  flowDescription: string;
  flowNodes: string[][];
  flowSteps: CaseStudyStep[];
  engineeringDetails: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'asynchronous-file-processing',
    title: 'Asynchronous File Processing',
    summary:
      'An event-driven pipeline that changed compressed, encrypted file access from scheduled delivery to near-real-time S3 transfer.',
    technologies: ['Java', 'AWS Lambda', 'Amazon SQS', 'Amazon S3'],
    context:
      'I modernized a legacy scheduled pipeline that handled large, compressed, encrypted files arriving over a network and moved the processed files to their S3 destinations.',
    challenge:
      'Files could remain unavailable for up to 24 hours while the scheduled process waited to run. I needed to make them available much sooner while preserving the required download, decrypt, decompress, and transfer stages.',
    approach:
      'I changed the scheduled workflow to event-driven processing with AWS Lambda, Amazon SQS, and Amazon S3. After arrival, the pipeline downloads, decrypts, and decompresses each file, then transfers it with asynchronous multipart uploads.',
    flowDescription:
      'Conceptual process flow from file arrival through processing to S3 transfer. It shows the file journey rather than a detailed deployment topology.',
    flowNodes: [
      ['Network file', 'source'],
      ['Download and', 'decrypt'],
      ['Decompress', 'file'],
      ['Multipart transfer', 'to S3'],
    ],
    flowSteps: [
      {
        title: 'Receive the file',
        description: 'A large, compressed, encrypted file arrives over the network.',
      },
      {
        title: 'Download and decrypt',
        description: 'I download each file and decrypt it before continuing.',
      },
      {
        title: 'Decompress',
        description: 'I decompress each file before transferring it.',
      },
      {
        title: 'Transfer to S3',
        description:
          'I transfer the processed file to its S3 destination using asynchronous multipart handling; different files can go to different S3 locations.',
      },
    ],
    engineeringDetails: [
      'I used AWS Lambda, Amazon SQS, and Amazon S3 for event-driven processing.',
      'I used asynchronous multipart uploads for file transfer.',
      'I routed processed files to different S3 locations.',
      'The change reduced file-access delays from up to 24 hours to near-instant access.',
    ],
  },
  {
    slug: 'secure-api-processing',
    title: 'Secure API Processing',
    summary:
      'A secure API for tenant-aware data storage, dynamic mapping, and asynchronous ETL processing.',
    technologies: ['Java', 'AWS API Gateway', 'AWS WAF', 'Amazon S3'],
    context:
      'I developed a scalable API that stored tenant data in S3 and ran ETL asynchronously while returning synchronous responses to clients.',
    challenge:
      'I designed the workflow to validate and authenticate requests, protect internal legacy systems from excess load, and keep long-running ETL work off the synchronous client path.',
    approach:
      'I used AWS API Gateway, WAF, and load balancing to protect and manage traffic. The API stored data by tenant in S3 and ran ETL asynchronously. Dynamic mapping, configuration, and caching let me adjust behavior without redeploying code.',
    flowDescription:
      'Conceptual API workflow showing request validation, traffic protection, tenant-aware storage, and asynchronous ETL. It is a process view rather than a detailed deployment topology.',
    flowNodes: [
      ['API request', 'up to 10 MB'],
      ['Authentication', 'and format checks'],
      ['API Gateway, WAF', 'and load balancer'],
      ['Tenant-aware', 'S3 storage'],
      ['Asynchronous', 'ETL'],
    ],
    flowSteps: [
      {
        title: 'Accept an API request',
        description: 'I designed this API flow to handle request payloads up to 10 MB.',
      },
      {
        title: 'Check authentication and format',
        description: 'I validate requests for authentication and format.',
      },
      {
        title: 'Protect and manage traffic',
        description:
          'I used AWS API Gateway, WAF, and load balancing to control traffic and protect internal legacy systems from overload.',
      },
      {
        title: 'Store data by tenant',
        description: 'I organized processed data in S3 by tenant.',
      },
      {
        title: 'Run ETL asynchronously',
        description: 'I ran ETL asynchronously after request processing.',
      },
    ],
    engineeringDetails: [
      'I used AWS protections to address DDoS and SQL injection threats.',
      'I used dynamic configuration and caching so behavior could be tuned without a code redeployment.',
      'The API handled millions of requests, with job-status and failure reporting to support operational monitoring. I also helped reduce client market-to-live time from months to days.',
    ],
  },
  {
    slug: 'event-driven-integration',
    title: 'Event-Driven Integration',
    summary:
      'A configurable MuleSoft integration framework that transforms third-party API data and routes messages with retry handling.',
    technologies: ['Java', 'MuleSoft', 'Amazon SQS', 'ActiveMQ'],
    context:
      'I built integrations that synchronized candidate, job, and application data in real time between applicant tracking systems and Smashfly CRM for multiple clients.',
    challenge:
      'Each client used different third-party APIs and data formats. I needed to map that data to the CRM format and handle failed messages without tightly coupling each integration.',
    approach:
      'I built a client-generic, loosely coupled MuleSoft middleware framework. It transformed source data into a configurable Smashfly CRM format, processed messages asynchronously in batches with retries, and routed them through a common processor using Amazon SQS and ActiveMQ.',
    flowDescription:
      'Conceptual integration flow from third-party APIs through data transformation and queued routing to destination applications. It shows the process rather than a detailed deployment topology.',
    flowNodes: [
      ['Third-party', 'APIs'],
      ['MuleSoft', 'data transform'],
      ['Batch pipeline', 'with retries'],
      ['SQS / ActiveMQ', 'routing'],
      ['Destination', 'applications'],
    ],
    flowSteps: [
      {
        title: 'Read from external APIs',
        description:
          'I connected to third-party APIs including Kenexa, Workday, and SmartRecruiters, and delivered custom ATS integrations for platforms including Greenhouse and Workday.',
      },
      {
        title: 'Transform the data',
        description:
          'I used MuleSoft to transform source data into a configurable Smashfly CRM format.',
      },
      {
        title: 'Process messages in batches',
        description:
          'I processed messages asynchronously in batches and retried failed messages.',
      },
      {
        title: 'Route through queues',
        description:
          'I routed data through a common distribution processor using Amazon SQS and ActiveMQ.',
      },
      {
        title: 'Deliver to destination applications',
        description: 'I delivered the routed data to standalone applications.',
      },
    ],
    engineeringDetails: [
      'I designed the framework to be client-generic, asynchronous, and loosely coupled.',
      'I synchronized candidate, job, and application records between ATS platforms and Smashfly CRM.',
      'I also implemented token authentication between internal APIs used by integration services.',
      'In related FastConnect ingestion work, I consolidated API calls and reduced HTTP overhead; candidate ingestion increased 50% and application ingestion increased 300%.',
      'I added integration logging and monitoring, and reduced client market-to-live time from months to days.',
    ],
  },
];
