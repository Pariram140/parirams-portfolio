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
      'An event-driven application for processing large encrypted files and transferring them to S3 with asynchronous multipart uploads.',
    technologies: ['Java', 'AWS Lambda', 'Amazon SQS', 'Amazon S3'],
    context:
      'I implemented an application to handle large, compressed and encrypted files arriving over a network. The processed files were moved into different S3 locations.',
    challenge:
      'The application needed to download each file, decrypt it, decompress it, and transfer it to the appropriate S3 location. The original description emphasizes both large files and asynchronous handling.',
    approach:
      'The published project description identifies an event-based approach involving AWS Lambda, Amazon SQS, and Amazon S3. File transfer used an asynchronous multipart approach.',
    flowDescription:
      'A process-level view of the file handling described in the original portfolio. AWS Lambda, Amazon SQS, and Amazon S3 are named as part of the event-based approach; the source does not map each service to a specific step.',
    flowNodes: [
      ['Network file', 'source'],
      ['Download and', 'decrypt'],
      ['Decompress', 'file'],
      ['Multipart transfer', 'to S3'],
    ],
    flowSteps: [
      {
        title: 'Receive the file',
        description: 'A large, compressed and encrypted file arrives from a network source.',
      },
      {
        title: 'Download and decrypt',
        description: 'The application downloads the file and decrypts it before continuing.',
      },
      {
        title: 'Decompress',
        description: 'The compressed file is decompressed as part of the processing sequence.',
      },
      {
        title: 'Transfer to S3',
        description:
          'The file is moved to its S3 location using asynchronous multipart handling. The description notes that files go to different locations.',
      },
    ],
    engineeringDetails: [
      'The event-based solution involved AWS Lambda, Amazon SQS, and Amazon S3.',
      'Multipart handling was used for the asynchronous file transfer.',
      'Files were placed in different S3 locations.',
    ],
  },
  {
    slug: 'secure-api-processing',
    title: 'Secure API Processing',
    summary:
      'A guarded API workflow for requests up to 10 MB, tenant-aware S3 storage, and asynchronous ETL processing.',
    technologies: ['Java', 'AWS API Gateway', 'AWS WAF', 'Amazon S3'],
    context:
      'I worked on an API that handled requests up to 10 MB, stored data in S3 with respect to tenant, and ran ETL logic asynchronously.',
    challenge:
      'The API required strict authentication and format checks. Load also had to be managed so internal legacy systems were not overloaded.',
    approach:
      'The original description names AWS API Gateway, WAF, and a load balancer among the protections around processing. Data was stored by tenant in S3, with ETL performed asynchronously. Dynamic configuration and caching were used without requiring code redeployment.',
    flowDescription:
      'This is a conceptual request path based on the original portfolio description. It names the checks, traffic controls, tenant-aware storage, and asynchronous ETL, but does not specify the exact service-by-service request order.',
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
        description: 'The original project summary states that the API handled requests up to 10 MB.',
      },
      {
        title: 'Check authentication and format',
        description: 'Requests were subject to strict authentication and format checks.',
      },
      {
        title: 'Protect and manage traffic',
        description:
          'AWS API Gateway, WAF, and a load balancer guarded the workflow. Load management was intended to avoid overloading internal legacy systems.',
      },
      {
        title: 'Store data by tenant',
        description: 'Processed data was stored in S3 with respect to tenant.',
      },
      {
        title: 'Run ETL asynchronously',
        description: 'ETL logic ran asynchronously after the data processing flow.',
      },
    ],
    engineeringDetails: [
      'The original description identifies DDoS and SQL injection among the threats addressed by the AWS protections.',
      'Dynamic configuration and caching were used to tune behavior without a code redeployment.',
      'The source describes the intent and components, but does not publish latency, throughput, or availability measurements.',
    ],
  },
  {
    slug: 'event-driven-integration',
    title: 'Event-Driven Integration',
    summary:
      'A configurable MuleSoft integration framework that transforms third-party API data and routes messages with retry handling.',
    technologies: ['Java', 'MuleSoft', 'Amazon SQS', 'ActiveMQ'],
    context:
      'I contributed to integrations that synchronized candidate, job, and application data between applicant tracking systems and Smashfly CRM for multiple clients, including real-time integrations.',
    challenge:
      'Each client could have different third-party APIs and data needs. The integration work needed to transform data into the CRM format and handle failed messages in the processing pipeline.',
    approach:
      'I built an asynchronous, loosely coupled MuleSoft middleware framework described as client generic. It transformed source data into a configurable Smashfly CRM format, processed messages in batches with retries, and used a common processor to route data to standalone applications through Amazon SQS and ActiveMQ.',
    flowDescription:
      'The sequence combines the transformation and routing stages described for the middleware framework. The original source names the example APIs and queue technologies in its written project details.',
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
          'The portfolio names Kenexa, Workday, and SmartRecruiters among the third-party APIs, and Greenhouse and Workday in custom ATS integrations.',
      },
      {
        title: 'Transform the data',
        description:
          'MuleSoft middleware transformed source data into a configurable Smashfly CRM format.',
      },
      {
        title: 'Process messages in batches',
        description:
          'The asynchronous message pipelines processed data batchwise and included a retry mechanism for failed messages.',
      },
      {
        title: 'Route through queues',
        description:
          'A common distribution processor routed data using Amazon SQS and ActiveMQ queues.',
      },
      {
        title: 'Deliver to destination applications',
        description: 'The routing processor distributed data to standalone applications.',
      },
    ],
    engineeringDetails: [
      'The framework was described as client generic, asynchronous, and loosely coupled.',
      'The custom integrations synchronized candidate, job, and application records between ATS platforms and Smashfly CRM.',
      'The source also mentions token authentication between internal APIs as a related security contribution.',
    ],
  },
];
