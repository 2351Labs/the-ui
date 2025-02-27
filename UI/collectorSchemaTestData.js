const collectorSchemaTestData = {
  "Entity Type": "Service",
  "Service Name": "User Authentication API",
  Description:
    "Handles user authentication and authorization using OAuth2 and JWT.",
  "Source Repo": "https://github.com/fakeorg/user-auth-api",
  Product: "Customer Portal",
  "Entity Tags": [
    { tag: "OAuth2", description: "Implements OAuth2 authentication" },
    { tag: "JWT", description: "Uses JWT for token-based authentication" },
  ],
  "Programming Language": "Python",
  Version: "1.2.3",
  "Service Aliases": [
    {
      alias: "AuthService",
      description: "Short name for authentication service",
    },
    { alias: "UserAuth", description: "Another reference name" },
  ],
  "Last Updated": "2025-02-20T12:34:56Z",
  Contacts: [
    {
      name: "Jane Doe",
      role: "Tech Lead",
      email: "jane.doe@example.com",
      description: "Responsible for backend services",
    },
    {
      name: "John Smith",
      role: "Product Manager",
      email: "john.smith@example.com",
      description: "Manages feature development",
    },
  ],
  Documentation: [
    {
      title: "API Docs",
      url: "https://docs.google.com/document/d/e/2PACX-1vR-swFZvXz5z1xI-vHUNzJ3HduY-kHGlq3tY-FqXMSUTu_mitM0RCUYN2VRqwy2kJqH6qmp5wRN_ufe/pub",
      description: "Comprehensive API documentation",
    },
  ],
  RelatedRepos: [
    {
      name: "Frontend App",
      url: "https://github.com/fakeorg/frontend-app",
      description: "The front-end application that consumes this API",
    },
  ],
  SupportChannels: [
    {
      type: "Slack",
      name: "Auth Service Support",
      contact: "#auth-support",
      description: "Support channel for authentication issues",
    },
  ],
  MonitoringChannels: [
    {
      type: "Grafana",
      name: "Auth Service Dashboard",
      url: "https://monitoring.amazon.com/grafana/auth-service",
      description: "Monitors authentication service performance",
    },
  ],
  "Infrastructure Components": [
    {
      type: "Database",
      name: "UserDB",
      id: "db-12345",
      description: "Stores user authentication data",
    },
    {
      type: "Cache",
      name: "Redis Cache",
      id: "cache-67890",
      description: "Handles session caching",
    },
  ],
  "Service Maturity Score(s)": [
    {
      metric: "Code Quality",
      score: 85,
      description: "Based on static analysis and linting results",
    },
    {
      metric: "Security",
      score: 90,
      description: "Evaluated on vulnerability scans and best practices",
    },
  ],
};

export default { collectorSchemaTestData };
