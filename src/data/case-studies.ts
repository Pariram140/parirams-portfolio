export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  technologies: string[];
  overview: string;
  flowDescription: string;
  flowNodes: string[][];
  sourceFacts: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'asynchronous-file-processing',
    title: 'Asynchronous File Processing',
    summary:
      'An event-driven process for downloading, unpacking, and moving large files to S3 with asynchronous multipart uploads.',
    technologies: ['Java', 'AWS Lambda', 'Amazon SQS', 'Amazon S3'],
    overview:
      'The existing portfolio description covers compressed and encrypted files downloaded from a network source, decrypted and decompressed, then moved to different S3 locations.',
    flowDescription:
      'The sequence below follows the steps stated in the public project description. Lambda, SQS, and S3 are the services named there.',
    flowNodes: [
      ['Encrypted file', 'source'],
      ['Download and', 'decrypt'],
      ['Decompress and', 'prepare multipart upload'],
      ['S3', 'destination'],
    ],
    sourceFacts: [
      'File handling includes downloading, decryption, and decompression.',
      'Files are moved to different S3 locations using an asynchronous multipart approach.',
      'The source names AWS Lambda, Amazon SQS, and Amazon S3 in the event-based approach.',
    ],
  },
  {
    slug: 'secure-api-processing',
    title: 'Secure API Processing',
    summary:
      'API workflows with authentication and format checks, tenant-aware S3 storage, and asynchronous ETL processing.',
    technologies: ['Java', 'AWS API Gateway', 'AWS WAF', 'Amazon S3'],
    overview:
      'The existing portfolio description names authentication and format checks, AWS API Gateway, WAF, a load balancer, tenant-aware S3 storage, and asynchronous ETL processing.',
    flowDescription:
      'The flow reflects only the request checks, processing, storage, and asynchronous ETL steps described in the public source.',
    flowNodes: [
      ['API', 'request'],
      ['Authentication and', 'format checks'],
      ['API Gateway, WAF,', 'load balancer'],
      ['Tenant-aware', 'S3 storage'],
      ['Asynchronous', 'ETL'],
    ],
    sourceFacts: [
      'Authentication and request-format checks are part of the API workflow.',
      'AWS API Gateway, WAF, and a load balancer are named as security and traffic controls.',
      'Data is stored in S3 with respect to tenant, and ETL processing is asynchronous.',
    ],
  },
  {
    slug: 'event-driven-integration',
    title: 'Event-Driven Integration',
    summary:
      'Middleware that transforms third-party API data and routes messages to destination applications with retry handling.',
    technologies: ['Java', 'MuleSoft', 'Amazon SQS', 'ActiveMQ'],
    overview:
      'The existing portfolio describes MuleSoft middleware that transforms third-party API data into a CRM format, processes message pipelines in batches with retries, and routes data to standalone applications.',
    flowDescription:
      'This diagram follows the transformation, message-pipeline, and routing stages named in the public project description.',
    flowNodes: [
      ['Third-party', 'APIs'],
      ['MuleSoft', 'data transform'],
      ['Batch message', 'pipeline + retries'],
      ['SQS / ActiveMQ', 'routing'],
      ['Destination', 'applications'],
    ],
    sourceFacts: [
      'MuleSoft middleware transforms third-party API data into a CRM format.',
      'Message pipelines process batches and include retry handling for failed messages.',
      'A common processor routes data using Amazon SQS and ActiveMQ queues.',
    ],
  },
];

