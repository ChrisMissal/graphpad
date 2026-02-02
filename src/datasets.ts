export interface DatasetNode {
  id: string;
  label: string;
}

export interface DatasetEdge {
  from: string;
  to: string;
  relation: string;
}

export interface Dataset {
  name: string;
  nodes: DatasetNode[];
  edges: DatasetEdge[];
}

export const datasets: Record<string, Dataset> = {
  taxonomy: {
    name: 'Animal Taxonomy',
    nodes: [
      { id: 'Animal', label: 'Animal' },
      { id: 'Mammal', label: 'Mammal' },
      { id: 'Dog', label: 'Dog' },
      { id: 'Cat', label: 'Cat' },
      { id: 'Person', label: 'Person' },
      { id: 'Child', label: 'Child' }
    ],
    edges: [
      { from: 'Mammal', to: 'Animal', relation: 'is-a' },
      { from: 'Dog', to: 'Mammal', relation: 'is-a' },
      { from: 'Cat', to: 'Mammal', relation: 'is-a' },
      { from: 'Person', to: 'Mammal', relation: 'is-a' },
      { from: 'Child', to: 'Person', relation: 'is-a' }
    ]
  },
  
  family: {
    name: 'Family Tree',
    nodes: [
      { id: 'Grandparent1', label: 'Grandparent' },
      { id: 'Parent1', label: 'Parent 1' },
      { id: 'Parent2', label: 'Parent 2' },
      { id: 'Child1', label: 'Child 1' },
      { id: 'Child2', label: 'Child 2' },
      { id: 'Child3', label: 'Child 3' }
    ],
    edges: [
      { from: 'Grandparent1', to: 'Parent1', relation: 'parent-of' },
      { from: 'Grandparent1', to: 'Parent2', relation: 'parent-of' },
      { from: 'Parent1', to: 'Child1', relation: 'parent-of' },
      { from: 'Parent1', to: 'Child2', relation: 'parent-of' },
      { from: 'Parent2', to: 'Child3', relation: 'parent-of' }
    ]
  },
  
  organization: {
    name: 'Organization',
    nodes: [
      { id: 'CEO', label: 'CEO' },
      { id: 'CTO', label: 'CTO' },
      { id: 'CFO', label: 'CFO' },
      { id: 'DevManager', label: 'Dev Manager' },
      { id: 'Dev1', label: 'Developer 1' },
      { id: 'Dev2', label: 'Developer 2' }
    ],
    edges: [
      { from: 'CEO', to: 'CTO', relation: 'manages' },
      { from: 'CEO', to: 'CFO', relation: 'manages' },
      { from: 'CTO', to: 'DevManager', relation: 'manages' },
      { from: 'DevManager', to: 'Dev1', relation: 'manages' },
      { from: 'DevManager', to: 'Dev2', relation: 'manages' },
      { from: 'Dev1', to: 'Dev2', relation: 'works-with' }
    ]
  },

  softwareEvolution: {
    name: 'Software Methodologies, Languages, and Web Evolution',
    nodes: [
      { id: 'StaticHTTP', label: 'Static HTTP File Servers (1990s)' },
      { id: 'CGI', label: 'CGI Scripts' },
      { id: 'ServerSideRendering', label: 'Server-Side Rendering' },
      { id: 'LAMP', label: 'LAMP Stack' },
      { id: 'MVC', label: 'MVC Frameworks' },
      { id: 'AJAX', label: 'AJAX' },
      { id: 'REST', label: 'REST APIs' },
      { id: 'SPA', label: 'Single Page Apps' },
      { id: 'NodeJS', label: 'Node.js Runtime' },
      { id: 'Microservices', label: 'Microservices' },
      { id: 'Containers', label: 'Containers (Docker)' },
      { id: 'Kubernetes', label: 'Kubernetes' },
      { id: 'Serverless', label: 'Serverless Functions' },
      { id: 'HTTP', label: 'HTTP Protocol' },
      { id: 'Browsers', label: 'Modern Browsers' },
      { id: 'C', label: 'C' },
      { id: 'Java', label: 'Java' },
      { id: 'PHP', label: 'PHP' },
      { id: 'JavaScript', label: 'JavaScript' },
      { id: 'TypeScript', label: 'TypeScript' },
      { id: 'Python', label: 'Python' },
      { id: 'Ruby', label: 'Ruby' },
      { id: 'Go', label: 'Go' },
      { id: 'Spring', label: 'Spring' },
      { id: 'Rails', label: 'Ruby on Rails' },
      { id: 'Django', label: 'Django' },
      { id: 'Express', label: 'Express' },
      { id: 'React', label: 'React' },
      { id: 'Angular', label: 'Angular' },
      { id: 'Vue', label: 'Vue' },
      { id: 'Next', label: 'Next.js' },
      { id: 'Waterfall', label: 'Waterfall' },
      { id: 'Agile', label: 'Agile' },
      { id: 'Scrum', label: 'Scrum' },
      { id: 'DevOps', label: 'DevOps' },
      { id: 'CICD', label: 'CI/CD' },
      { id: 'SQL', label: 'SQL Databases' },
      { id: 'PostgreSQL', label: 'PostgreSQL' },
      { id: 'MySQL', label: 'MySQL' },
      { id: 'MongoDB', label: 'MongoDB' },
      { id: 'Redis', label: 'Redis' },
      { id: 'Cloud', label: 'Cloud Services' },
      { id: 'AWS', label: 'AWS' },
      { id: 'Azure', label: 'Microsoft Azure' },
      { id: 'GCP', label: 'Google Cloud' },
      { id: 'Heroku', label: 'Heroku' },
      { id: 'Libraries', label: 'Software Libraries' },
      { id: 'jQuery', label: 'jQuery' },
      { id: 'Lodash', label: 'Lodash' },
      { id: 'NumPy', label: 'NumPy' },
      { id: 'Pandas', label: 'Pandas' },
      { id: 'Requests', label: 'Requests' },
      { id: 'ExpressMiddleware', label: 'Express Middleware' },
      { id: 'ReactEcosystem', label: 'React Component Libraries' },
      { id: 'Boost', label: 'Boost (C++)' },
      { id: 'ApacheCommons', label: 'Apache Commons' },
      { id: 'SpringBootStarters', label: 'Spring Boot Starters' },
      { id: 'RailsGems', label: 'Rails Gems' }
    ],
    edges: [
      { from: 'StaticHTTP', to: 'CGI', relation: 'evolves-into' },
      { from: 'CGI', to: 'ServerSideRendering', relation: 'evolves-into' },
      { from: 'ServerSideRendering', to: 'MVC', relation: 'evolves-into' },
      { from: 'MVC', to: 'SPA', relation: 'evolves-into' },
      { from: 'AJAX', to: 'SPA', relation: 'enables' },
      { from: 'REST', to: 'SPA', relation: 'enables' },
      { from: 'NodeJS', to: 'SPA', relation: 'enables' },
      { from: 'REST', to: 'Microservices', relation: 'enables' },
      { from: 'Containers', to: 'Microservices', relation: 'enables' },
      { from: 'Microservices', to: 'Kubernetes', relation: 'enables' },
      { from: 'Kubernetes', to: 'Serverless', relation: 'enables' },
      { from: 'HTTP', to: 'StaticHTTP', relation: 'enables' },
      { from: 'Browsers', to: 'AJAX', relation: 'enables' },
      { from: 'JavaScript', to: 'AJAX', relation: 'enables' },
      { from: 'JavaScript', to: 'NodeJS', relation: 'built-with' },
      { from: 'TypeScript', to: 'JavaScript', relation: 'evolves-into' },
      { from: 'PHP', to: 'LAMP', relation: 'built-with' },
      { from: 'C', to: 'HTTP', relation: 'influenced' },
      { from: 'Java', to: 'Spring', relation: 'built-with' },
      { from: 'Ruby', to: 'Rails', relation: 'built-with' },
      { from: 'Python', to: 'Django', relation: 'built-with' },
      { from: 'JavaScript', to: 'Express', relation: 'built-with' },
      { from: 'JavaScript', to: 'React', relation: 'built-with' },
      { from: 'JavaScript', to: 'Angular', relation: 'built-with' },
      { from: 'JavaScript', to: 'Vue', relation: 'built-with' },
      { from: 'React', to: 'Next', relation: 'enables' },
      { from: 'Agile', to: 'Scrum', relation: 'enables' },
      { from: 'Waterfall', to: 'Agile', relation: 'evolves-into' },
      { from: 'Agile', to: 'DevOps', relation: 'influenced' },
      { from: 'DevOps', to: 'CICD', relation: 'enables' },
      { from: 'CICD', to: 'Containers', relation: 'enables' },
      { from: 'LAMP', to: 'ServerSideRendering', relation: 'influenced' },
      { from: 'ServerSideRendering', to: 'REST', relation: 'influenced' },
      { from: 'Go', to: 'Microservices', relation: 'built-with' },
      { from: 'SQL', to: 'PostgreSQL', relation: 'enables' },
      { from: 'SQL', to: 'MySQL', relation: 'enables' },
      { from: 'ServerSideRendering', to: 'SQL', relation: 'enables' },
      { from: 'REST', to: 'MongoDB', relation: 'enables' },
      { from: 'Microservices', to: 'Redis', relation: 'enables' },
      { from: 'Cloud', to: 'AWS', relation: 'enables' },
      { from: 'Cloud', to: 'Azure', relation: 'enables' },
      { from: 'Cloud', to: 'GCP', relation: 'enables' },
      { from: 'Cloud', to: 'Heroku', relation: 'enables' },
      { from: 'CICD', to: 'Cloud', relation: 'enables' },
      { from: 'Containers', to: 'Cloud', relation: 'enables' },
      { from: 'Kubernetes', to: 'Cloud', relation: 'enables' },
      { from: 'JavaScript', to: 'Libraries', relation: 'enables' },
      { from: 'Python', to: 'Libraries', relation: 'enables' },
      { from: 'Java', to: 'Libraries', relation: 'enables' },
      { from: 'C', to: 'Libraries', relation: 'enables' },
      { from: 'Libraries', to: 'jQuery', relation: 'enables' },
      { from: 'Libraries', to: 'Lodash', relation: 'enables' },
      { from: 'Libraries', to: 'NumPy', relation: 'enables' },
      { from: 'Libraries', to: 'Pandas', relation: 'enables' },
      { from: 'Libraries', to: 'Requests', relation: 'enables' },
      { from: 'Libraries', to: 'ExpressMiddleware', relation: 'enables' },
      { from: 'Libraries', to: 'ReactEcosystem', relation: 'enables' },
      { from: 'Libraries', to: 'Boost', relation: 'enables' },
      { from: 'Libraries', to: 'ApacheCommons', relation: 'enables' },
      { from: 'Libraries', to: 'SpringBootStarters', relation: 'enables' },
      { from: 'Libraries', to: 'RailsGems', relation: 'enables' },
      { from: 'jQuery', to: 'AJAX', relation: 'influenced' },
      { from: 'React', to: 'ReactEcosystem', relation: 'enables' },
      { from: 'Express', to: 'ExpressMiddleware', relation: 'enables' },
      { from: 'Spring', to: 'SpringBootStarters', relation: 'enables' },
      { from: 'Rails', to: 'RailsGems', relation: 'enables' },
      { from: 'Python', to: 'NumPy', relation: 'built-with' },
      { from: 'Python', to: 'Pandas', relation: 'built-with' },
      { from: 'Python', to: 'Requests', relation: 'built-with' },
      { from: 'Java', to: 'ApacheCommons', relation: 'built-with' },
      { from: 'C', to: 'Boost', relation: 'built-with' }
    ]
  },
  
  empty: {
    name: 'Empty Graph',
    nodes: [],
    edges: []
  }
};
