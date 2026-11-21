import { ReportFormData, GeneratedReport, Chapter, ReportItemRef } from '../types';
import { RepoInfo } from './githubFetcher';

interface DomainProfile {
  name: string;
  keywords: string[];
  frontend: string;
  backend: string;
  database: string;
  libraries: string[];
  coreAlgorithm: string;
  sampleEntity1: string;
  sampleEntity2: string;
  sampleEntity3: string;
}

const DOMAIN_PROFILES: DomainProfile[] = [
  {
    name: 'Stock & Financial Analytics',
    keywords: ['stock', 'invest', 'portfolio', 'trading', 'crypto', 'finance', 'groww', 'market'],
    frontend: 'React 19, TypeScript, Vite',
    backend: 'Node.js, Firebase Auth & Firestore / Local IndexedDB',
    database: 'Cloud Firestore & IndexedDB (idb-keyval)',
    libraries: ['Recharts (v3.10)', 'React Router DOM (v7)', 'idb-keyval (v6.3)', 'oxlint'],
    coreAlgorithm: 'SMA (7-period), EMA (smoothing k=2/(N+1)), and Wilder RSI (14-period) calculation',
    sampleEntity1: 'WatchlistItem (id, symbol, name, addedAt)',
    sampleEntity2: 'Holding (id, symbol, quantity, avgPrice, currentPrice)',
    sampleEntity3: 'Transaction (id, symbol, type: BUY/SELL, quantity, price, date)',
  },
  {
    name: 'Machine Learning & AI',
    keywords: ['ai', 'predict', 'detect', 'classification', 'machine learning', 'deep learning', 'vision', 'nlp', 'model'],
    frontend: 'React + TypeScript / Streamlit Dashboard',
    backend: 'Python 3.11, FastAPI, PyTorch / Scikit-Learn',
    database: 'PostgreSQL, Redis for feature caching',
    libraries: ['FastAPI (v0.110)', 'Scikit-Learn (v1.4)', 'Pandas (v2.2)', 'NumPy', 'Uvicorn'],
    coreAlgorithm: 'Random Forest Ensemble / Gradient Boosted Classification with 5-fold cross-validation',
    sampleEntity1: 'DatasetSample (sampleId, featuresVector, groundTruth, splitType)',
    sampleEntity2: 'ModelPrediction (predictionId, confidenceScore, latencyMs, timestamp)',
    sampleEntity3: 'EvaluationMetric (accuracy, precision, recall, f1Score, confusionMatrix)',
  },
  {
    name: 'Full-Stack Web & Cloud Systems',
    keywords: ['portal', 'management', 'system', 'app', 'web', 'commerce', 'tracker', 'platform', 'service'],
    frontend: 'React 19, TypeScript, Tailwind CSS',
    backend: 'Node.js (Express.js) / Next.js API Routes',
    database: 'MongoDB / PostgreSQL with Prisma ORM',
    libraries: ['React Router DOM', 'Tailwind CSS', 'Axios', 'Zod validation', 'Lucide React'],
    coreAlgorithm: 'JWT-based RBAC authentication and resilient RESTful caching layer',
    sampleEntity1: 'UserAccount (uid, email, role, createdAt, isActive)',
    sampleEntity2: 'ResourceItem (id, title, category, status, ownerId)',
    sampleEntity3: 'ActivityAuditLog (logId, action, targetEntity, ipAddress, timestamp)',
  },
  {
    name: 'Cyber Security & Cryptography',
    keywords: ['security', 'cipher', 'crypto', 'encrypt', 'auth', 'firewall', 'intrusion', 'vulnerability'],
    frontend: 'React + Vite, Tailwind CSS',
    backend: 'Python / Go with Cryptography libs',
    database: 'SQLite encrypted / Hashicorp Vault',
    libraries: ['PyCryptodome', 'FastAPI', 'argon2-cffi', 'pydantic'],
    coreAlgorithm: 'AES-256 GCM authenticated encryption and SHA-256 HMAC integrity verification',
    sampleEntity1: 'CipherPayload (iv, ciphertext, authTag, keyId)',
    sampleEntity2: 'SecurityAuditLog (eventId, threatLevel, sourceIp, blocked)',
    sampleEntity3: 'SessionToken (hash, expiresAt, permissionsBitmask)',
  },
  {
    name: 'IoT & Smart Automation',
    keywords: ['iot', 'sensor', 'smart', 'automation', 'arduino', 'raspberry', 'embedded', 'monitoring'],
    frontend: 'React Dashboard with Real-time Telemetry',
    backend: 'Node.js MQTT Broker & WebSocket gateway',
    database: 'InfluxDB (Time Series) & MongoDB',
    libraries: ['MQTT.js', 'Socket.io-client', 'Chart.js', 'Express'],
    coreAlgorithm: 'Sliding window telemetry aggregation and threshold anomaly alerts',
    sampleEntity1: 'SensorNode (nodeId, hardwareMac, location, batteryPct)',
    sampleEntity2: 'TelemetryReading (timestamp, nodeId, temperature, humidity, status)',
    sampleEntity3: 'AlertTrigger (alertId, thresholdVal, triggeredVal, acknowledged)',
  },
];

function detectDomain(title: string, customDomain?: string): DomainProfile {
  if (customDomain && customDomain !== 'Auto-detect') {
    const found = DOMAIN_PROFILES.find((p) => p.name.toLowerCase().includes(customDomain.toLowerCase()));
    if (found) return found;
  }

  const lower = title.toLowerCase();
  for (const profile of DOMAIN_PROFILES) {
    if (profile.keywords.some((k) => lower.includes(k))) {
      return profile;
    }
  }
  return DOMAIN_PROFILES[2]; // Default to Full-Stack Web Systems
}

export function generateFullReport(formData: ReportFormData, repoInfo?: RepoInfo | null): GeneratedReport {
  const domain = detectDomain(formData.projectName, formData.domain);
  const title = formData.projectName.trim();
  const student = formData.studentName.trim();
  const roll = formData.rollNo.trim().toUpperCase();
  const guide = formData.guideName.trim();
  const year = formData.academicYear || '2026-2027';
  const isNoLink = formData.isNoLink || !formData.githubLink || formData.githubLink.trim().toLowerCase() === 'no link';
  const githubSource = isNoLink
    ? 'No external repository link provided (Designed via brief algorithmic synthesis)'
    : formData.githubLink;

  // Build tech stack list from GitHub package.json if present
  let techStackTable: (string | number)[][] = [];
  if (repoInfo?.dependencies && Object.keys(repoInfo.dependencies).length > 0) {
    techStackTable = Object.entries(repoInfo.dependencies).slice(0, 8).map(([name, ver]) => [
      name,
      String(ver).replace(/^[\^~]/, ''),
      `Core library in ${title} module architecture`,
    ]);
  } else {
    techStackTable = [
      ['React / React DOM', '19.2.x', `Component-based responsive user interface for ${title}`],
      ['TypeScript', '~5.7', 'Static typing of domain models, interfaces, and contracts'],
      ['Vite (+ React plugin)', '6.0.x', 'Next-generation development server and optimized bundler'],
      ['React Router DOM', '7.x', 'Declarative client-side routing and protected view guards'],
      [domain.libraries[0] || 'Modern UI Engine', 'Latest', 'Data visualization and rendering subsystem'],
      ['State / Local Storage', 'Browser API', 'Resilient client persistence with automatic state synchronization'],
      ['Linters & Build Tooling', 'ES2023 / oxlint', 'Code cleanliness, type safety, and static bundle validation'],
    ];
  }

  const chapters: Chapter[] = [
    {
      id: 1,
      title: 'INTRODUCTION',
      subsections: [
        {
          number: '1.1',
          title: 'INTRODUCTION',
          content: [
            `In contemporary Information Technology environments, the rapid evolution of digital platforms has created an imperative demand for streamlined, accessible, and self-contained applications. Modern users and academic institutions frequently face fragmented ecosystems where essential workflows are scattered across disparate tools.`,
            `The project entitled "${title}" represents a focused engineering effort to synthesize these workflows into a cohesive, high-performance web-based solution. Designed and executed as an Industrial Internship Project in the Department of Information Technology at Andhra Loyola Institute of Engineering & Technology, this system demonstrates best practices in modern software engineering, type-safe architecture, and responsive user interface design.`,
            `The project leverages ${domain.frontend} on the client layer, coupled with ${domain.backend} to ensure offline capability, predictable data processing, and seamless migration paths toward enterprise cloud backends.`,
          ],
        },
        {
          number: '1.2',
          title: 'PROJECT OVERVIEW',
          content: [
            `The primary objective of "${title}" is to furnish a unified single-page platform capable of executing core domain operations without unnecessary cloud dependencies or paid third-party hurdles.`,
            `The system is decomposed into dedicated functional modules:`,
            `• Authentication & Identity Management – Secure sign-in, registration, and persistent user sessions with isolated local and remote data namespaces.`,
            `• Core Functional Hub – Interactive dashboard presenting real-time summary indicators, historical trends, and dynamic data filtering.`,
            `• Domain Management Modules – Purpose-built workflows for creating, modifying, and reviewing ${domain.name} records with strict schema validation.`,
            `• Analytics & Technical Visualizations – Dynamic data rendering including ${domain.coreAlgorithm}.`,
            `• System Settings & Personalization – User preferences storage covering themes, visualization thresholds, and local reset facilities.`,
          ],
        },
        {
          number: '1.3',
          title: 'MOTIVATION',
          content: [
            `Traditional solutions in this domain generally impose significant friction: users must toggle between spreadsheets, command-line utilities, and proprietary platforms. This fragmentation leads to operational latency, human transcription errors, and lack of real-time situational awareness.`,
            `Furthermore, from an academic and evaluation perspective, many contemporary student projects suffer from strict dependencies on external paid APIs or live cloud connections. When credentials expire or connectivity falters, the application ceases to function.`,
            `The key motivation behind this project is to construct a production-grade, evaluation-friendly system that operates out of the box with zero external friction while upholding enterprise architectural patterns.`,
          ],
        },
        {
          number: '1.4',
          title: 'PROBLEM STATEMENT',
          content: [
            `Information Technology practitioners and end-users require an intuitive, centralized platform to govern their operational data without being tethered to fragile network endpoints or expensive closed-source infrastructure.`,
            `Existing alternatives are either heavyweight enterprise suites requiring elaborate configuration and licensing, or amateur scripts lacking proper validation, error recovery, and data isolation. Therefore, there is a clear requirement for "${title}": a lightweight, type-safe, responsive, and resilient system providing instant evaluation, deterministic state management, and clear extensibility.`,
          ],
        },
        {
          number: '1.5',
          title: 'OBJECTIVES OF THE PROJECT',
          content: [
            `The core objectives established for this engineering project are:`,
            `1. To design and implement a responsive single-page application using modern ${domain.frontend}.`,
            `2. To implement robust client-side routing, protected navigation guards, and session persistence across page reloads.`,
            `3. To enforce type safety and strict schema validation for all operational domain entities including ${domain.sampleEntity1} and ${domain.sampleEntity2}.`,
            `4. To design an interchangeable data provider architecture facilitating offline-first execution alongside cloud synchronization.`,
            `5. To integrate automated mathematical and algorithmic logic incorporating ${domain.coreAlgorithm}.`,
            `6. To validate the system through structured functional test suites, unit validation, and static code analysis.`,
          ],
        },
        {
          number: '1.6',
          title: 'EXISTING SYSTEM',
          content: [
            `Prior to the deployment of "${title}", operations relied predominantly on:`,
            `• Conventional manual documentation using spreadsheets or static documents where calculation formulas require manual maintenance.`,
            `• Proprietary commercial software packages that mandate rigorous sign-up verification, paid monthly subscriptions, or continuous high-bandwidth connectivity.`,
            `• Fragmented tools where data generated in one application must be manually exported, transformed, and uploaded into another to render basic charts.`,
          ],
        },
        {
          number: '1.7',
          title: 'DISADVANTAGES OF EXISTING SYSTEM',
          content: [
            `The existing operational methodologies exhibit several severe drawbacks:`,
            `• High risk of transcription errors and stale data due to disconnected manual workflows.`,
            `• Inability to inspect, audit, or modify underlying source code due to vendor lock-in.`,
            `• High operational latency when switching between multiple unintegrated applications.`,
            `• Fragility during evaluation or offline demonstrations where API keys, tokens, or network interruptions abort execution.`,
          ],
        },
        {
          number: '1.8',
          title: 'PROPOSED SYSTEM',
          content: [
            `The proposed system, "${title}", resolves these challenges through a unified, modular architecture. Built with modern web standards, it integrates all tracking, validation, analysis, and charting functionalities into a single responsive interface.`,
            `A distinguishing hallmark of the proposed architecture is the decoupled Service and Data Provider layer. The user interface does not bind directly to any physical storage mechanism; instead, it consumes high-level asynchronous service contracts. This permits the software to run completely offline in a local Demo Mode, or synchronize seamlessly with cloud datastores when credentials are provided.`,
          ],
        },
        {
          number: '1.9',
          title: 'ADVANTAGES OF PROPOSED SYSTEM',
          content: [
            `The proposed system offers substantial operational and academic advantages:`,
            `• Immediate Out-of-the-Box Evaluation: Zero setup, pre-populated sample datasets, and rapid verification.`,
            `• Strict Type Safety: Developed with TypeScript, eliminating runtime property mismatches and guaranteeing contract integrity.`,
            `• Reactive UI Updates: Publish/Subscribe design pattern guarantees that state updates immediately reflect across all active views without manual page refresh.`,
            `• High Portability & Security: Isolated per-user storage namespaces prevent cross-talk, while client-side isolation keeps demo data private.`,
            `• Modern Ergonomics: Sleek dark and light thematic support, accessible keyboard controls, and responsive layouts across desktops, tablets, and mobile screens.`,
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'SYSTEM ANALYSIS',
      subsections: [
        {
          number: '2.1',
          title: 'INTRODUCTION',
          content: [
            `System analysis involves a comprehensive assessment of the functional boundaries, operational workflows, entity lifecycles, and technical prerequisites needed to realize "${title}". This chapter establishes the architectural choices, hardware/software specifications, and mathematical foundations underpinning the project.`,
          ],
        },
        {
          number: '2.2',
          title: 'TECHNOLOGY OVERVIEW',
          content: [
            `The technology stack was chosen based on industrial performance metrics, developer ergonomics, long-term maintainability, and compatibility with modern browser execution environments.`,
          ],
          table: {
            caption: 'Technologies and Libraries Employed',
            headers: ['Technology / Framework', 'Version', 'Role & Operational Purpose'],
            rows: techStackTable,
          },
        },
        {
          number: '2.3',
          title: 'DATA DESCRIPTION & DOMAIN ENTITIES',
          content: [
            `The application manages structured domain entities. Each entity is strictly typed and governed by TypeScript interfaces to prevent runtime schema anomalies.`,
            `The key entities utilized throughout the project lifecycle are:`,
            `1. AppUser: Represents authenticated operators with unique identifiers (uid), display credentials, creation timestamp, and role/demo flags.`,
            `2. ${domain.sampleEntity1}: Governs core monitored assets and parameters with tracking metadata.`,
            `3. ${domain.sampleEntity2}: Represents active portfolio positions or operational records with quantitative weights and evaluation metrics.`,
            `4. ${domain.sampleEntity3}: Provides an immutable audit trail of actions, transactions, or state transitions over time.`,
            `5. UserPreferences: Encapsulates user customization options including visual theme (dark/light), default time horizons, and panel visibility toggles.`,
          ],
        },
        {
          number: '2.4',
          title: 'DATA PROCESSING AND BUSINESS LOGIC',
          content: [
            `The application applies automated mathematical calculations and algorithmic processing prior to screen presentation. Data flows predictably through pure transformation functions.`,
            `The primary analytical models implemented include:`,
            `• Aggregate Valuations: Mathematical summation of invested capital versus present valuation:`,
            `  Invested Amount = Σ (Cost Basis × Quantity)`,
            `  Current Market Value = Σ (Current Price × Quantity)`,
            `  Absolute Gain / Loss = Current Value - Invested Amount`,
            `  Percentage Delta (%) = (Gain / Loss ÷ Invested Amount) × 100`,
            `• Algorithmic Indicator Engine: Implements ${domain.coreAlgorithm} over historical data series to identify volatility trends and momentum boundaries.`,
            `• Deterministic Fallback Synthesis: In the absence of an external data feed, a seeded pseudo-random string hashing generator constructs smooth, reproducible time-series charts.`,
          ],
        },
        {
          number: '2.5',
          title: 'SYSTEM REQUIREMENTS',
          content: [
            `2.5.1 Software Requirements:`,
            `• Operating System: Windows 10/11, macOS (12.0+), or modern Linux distributions.`,
            `• Runtime Environment: Node.js version 20.x or 22.x with npm version 10+.`,
            `• Web Browser: Modern evergreen browser supporting ECMAScript 2023, IndexedDB, and HTML5 Web Storage (Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari).`,
            `• Development IDE: Visual Studio Code with TypeScript and React extensions.`,
            `\n2.5.2 Hardware Requirements:`,
            `• Processor: Dual-Core 2.0 GHz x64 CPU minimum (Quad-Core recommended).`,
            `• RAM: 4 GB minimum (8 GB recommended for concurrent compilation and browser devtools).`,
            `• Storage: 500 MB free space for repository dependencies and build artifacts.`,
            `\n2.5.3 Functional Requirements:`,
            `• User authentication, session restore upon browser refresh, and protected navigation guards.`,
            `• Full CRUD operations on domain items with duplicate detection and positive quantity validation.`,
            `• Real-time reactive data propagation across separate dashboard components.`,
            `• One-click sample dataset restoration for rapid evaluator auditing.`,
            `\n2.5.4 Non-Functional Requirements:`,
            `• Usability: Zero-configuration startup, intuitive navigation sidebar, and contextual toasts.`,
            `• Portability: Decoupled service layer permitting interchangeable execution across IndexedDB and cloud backends.`,
            `• Reliability: Graceful fallback guaranteeing application uptime even when external configurations fail.`,
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'DESIGN & MODELLING',
      subsections: [
        {
          number: '3.1',
          title: 'INTRODUCTION',
          content: [
            `System design defines the architectural topology, data communication flow, interface contracts, and presentation ergonomics of "${title}". A disciplined layered architecture ensures complete separation of concerns between visual rendering and state persistence.`,
          ],
        },
        {
          number: '3.2',
          title: 'SYSTEM ARCHITECTURE',
          content: [
            `The application is organized into three distinct tiers:`,
            `1. Presentation Tier (UI Layer): Composed of React functional components, hooks (useState, useEffect, useMemo), and styling definitions. Components communicate solely with the Service Layer.`,
            `2. Service & Provider Abstraction Tier: Comprises authService and databaseService, which forward requests to the active DataProvider instance resolved by dataProvider.ts.`,
            `3. Data Storage Tier: Pluggable backends satisfying the DataProvider interface. In Demo Mode, an IndexedDB key-value store manages records locally with a publish/subscribe notification bus. In Cloud Mode, remote document stores and authentication APIs take over seamlessly.`,
          ],
          figure: {
            caption: `Figure 3.1: Layered System Architecture of ${title}`,
            diagramType: 'architecture',
            description: 'Depicts Presentation Layer -> Service Layer -> DataProvider Interface -> Demo / Cloud Provider.',
          },
        },
        {
          number: '3.3',
          title: 'PROVIDER SELECTION AND RESILIENT FALLBACK',
          content: [
            `During application bootstrap, the provider factory inspects runtime environment variables. If cloud synchronization is requested, it dynamically imports and initializes the cloud provider. Should configuration keys be absent or network initialization fail, a warning is logged and the application smoothly falls back to the local Demo provider without crashing.`,
          ],
          figure: {
            caption: 'Figure 3.2: Bootstrap Mode Resolution and Fallback Logic',
            diagramType: 'flow',
            description: 'Flowchart tracing App Bootstrap -> Env Check -> Cloud Init vs Local Fallback -> Session Restore.',
          },
        },
        {
          number: '3.4',
          title: 'DATA MODELING AND ENTITY RELATIONSHIPS',
          content: [
            `Data entities are partitioned strictly by user ID namespaces. One user account maintains a one-to-many relationship with monitored assets, holdings, and transactions, while maintaining a one-to-one relationship with personalized configuration preferences.`,
          ],
          figure: {
            caption: `Figure 3.3: Entity-Relationship Diagram for ${title}`,
            diagramType: 'erd',
            description: 'ERD showing AppUser (1) to WatchlistItem (M), Holding (M), Transaction (M), and UserPreferences (1).',
          },
        },
        {
          number: '3.5',
          title: 'THE DATAPROVIDER INTERFACE CONTRACT',
          content: [
            `The DataProvider TypeScript interface specifies all mandatory operations across authentication, data retrieval, record mutations, and real-time subscription handles. By constraining both the local and cloud adapters to this identical contract, the user interface remains completely agnostic to where bytes are written.`,
          ],
        },
        {
          number: '3.6',
          title: 'ROUTING, ACCESS CONTROL & UI LAYOUT',
          content: [
            `Navigation is structured through client-side routing guards:`,
            `• /login & /signup: Public authentication screens that auto-redirect signed-in operators to the main dashboard.`,
            `• / (Dashboard), /watchlist, /portfolio, /settings: Protected routes wrapped by ProtectedRoute and AppShell layouts.`,
            `• AppShell Layout: Provides a persistent navigation sidebar, real-time status pills, active user indicators, logout triggers, and an automated scrolling market ticker.`,
          ],
          figure: {
            caption: 'Figure 3.4: Sequence of Record Addition and Reactive Notification',
            diagramType: 'sequence',
            description: 'Sequence diagram illustrating Form Submission -> Validation -> Service Call -> Provider Write -> Pub/Sub Broadcast -> UI Re-render.',
          },
        },
      ],
    },
    {
      id: 4,
      title: 'IMPLEMENTATION',
      subsections: [
        {
          number: '4.1',
          title: 'TASK 1: PROJECT SETUP, TYPING, AND ENVIRONMENT CONFIGURATION',
          content: [
            `The project was scaffolded using the Vite React-TypeScript engine with strict compiler flags (strict: true, noEmit: true). All domain interfaces, enumerated ranges, and the DataProvider contract were authored in src/types/index.ts before implementing visual components.`,
          ],
          codeListing: {
            caption: 'Listing 4.1: Core Domain Type Definitions',
            language: 'typescript',
            code: `export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  isDemo?: boolean;
  createdAt: number;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

export interface DataProvider {
  signup(email: string, pass: string, name: string): Promise<AppUser>;
  login(email: string, pass: string): Promise<AppUser>;
  subscribeToPortfolio(uid: string, cb: (h: Holding[]) => void): () => void;
  resetDemoData?(uid: string): Promise<void>;
}`,
          },
        },
        {
          number: '4.2',
          title: 'TASK 2: DATA PROVIDER AND SERVICE LAYER',
          content: [
            `The service tier is encapsulated in authService and databaseService. The local Demo provider utilizes an IndexedDB object store with localStorage fallback for synchronous session tokens.`,
            `To deliver parity with cloud real-time listeners, a custom Publish/Subscribe channel dispatcher was implemented in demoDatabase.ts. Mutations immediately push the latest snapshot to all active subscriber callbacks.`,
          ],
          codeListing: {
            caption: 'Listing 4.2: Reactive Publish/Subscribe Engine',
            language: 'typescript',
            code: `const channels = new Map<string, Set<(data: any) => void>>();

export function emit<T>(channel: string, data: T) {
  channels.get(channel)?.forEach((listener) => listener(data));
}

export function subscribe<T>(
  channel: string,
  cb: (data: T) => void,
  fetchNow: () => Promise<T>
): () => void {
  if (!channels.has(channel)) channels.set(channel, new Set());
  channels.get(channel)!.add(cb);
  fetchNow().then(cb); // deliver immediate cached state
  return () => channels.get(channel)?.delete(cb);
}`,
          },
        },
        {
          number: '4.3',
          title: 'TASK 3: AUTHENTICATION, ROUTING, AND CONTEXT MANAGEMENT',
          content: [
            `The AuthContext React context wraps the component hierarchy, tracking authentication status, user session objects, and active data modes. The useAuth() custom hook provides uniform access across all screens with explicit boundary checking.`,
          ],
        },
        {
          number: '4.4',
          title: 'TASK 4: DOMAIN MANAGEMENT AND INPUT VALIDATION',
          content: [
            `Input forms implement dual validation layers: browser-level constraints (e.g., min="0" on numeric inputs) and programmatic checks (symbol uppercase conversion, duplicate rejection, and positive boundary checks). Users receive immediate, non-blocking feedback via toasts and error callouts.`,
          ],
        },
        {
          number: '4.5',
          title: 'TASK 5: SUMMARY METRICS & REAL-TIME VISUALIZATIONS',
          content: [
            `The dashboard utilizes React's useMemo hook to derive aggregate financial and operational metrics efficiently without causing redundant re-renders:`,
          ],
          codeListing: {
            caption: 'Listing 4.3: High-Performance Metric Derivation',
            language: 'typescript',
            code: `const metrics = useMemo(() => {
  const invested = holdings.reduce((sum, h) => sum + h.avgPrice * h.quantity, 0);
  const current = holdings.reduce((sum, h) => sum + h.currentPrice * h.quantity, 0);
  const profitLoss = current - invested;
  const deltaPct = invested > 0 ? (profitLoss / invested) * 100 : 0;
  return { invested, current, profitLoss, deltaPct };
}, [holdings]);`,
          },
        },
        {
          number: '4.6',
          title: 'TASK 6: TECHNICAL INDICATOR CALCULATION ENGINE',
          content: [
            `Technical indicators (SMA, EMA, RSI) are computed through mathematical algorithms over time series vectors. SMA calculates rolling arithmetic means, EMA applies an exponential smoothing multiplier k = 2 / (period + 1), and RSI implements Wilder's smoothed relative strength ratio bounded between 0 and 100.`,
          ],
        },
      ],
    },
    {
      id: 5,
      title: 'RESULTS & OUTPUT SCREENS',
      subsections: [
        {
          number: '5.1',
          title: 'AUTHENTICATION AND DASHBOARD EXECUTION',
          content: [
            `Upon launching the application, unauthenticated operators are directed to the Login screen. Demo mode provisions ready-made credentials (demo@investflow.app) for one-click access.`,
            `The primary Dashboard renders summary cards (Current Value, Invested Capital, Total P/L, Holdings Count), accompanied by the interactive time-series chart with SMA/EMA overlays and the scrolling live ticker.`,
          ],
        },
        {
          number: '5.2',
          title: 'DOMAIN CRUD & VALIDATION SCREENS',
          content: [
            `The Watchlist view displays tracked symbols with dynamic daily percentage changes. Duplicate entries trigger clear inline warnings, preventing redundant records.`,
            `The Portfolio view displays active positions with individual cost basis, market value, and profit/loss highlights (green for positive returns, red for losses). The Add Holding dialog validates inputs and records an automated transaction log.`,
          ],
        },
        {
          number: '5.3',
          title: 'SETTINGS, PERSONALIZATION & DATA RESET',
          content: [
            `The Settings screen enables theme switching between Dark and Light appearances, default chart timeframes, indicator visibility toggles, and dashboard panel display preferences. In Demo Mode, an explicit "Reset demo data" dialog allows operators to restore initial seed records with a single click.`,
          ],
        },
      ],
    },
    {
      id: 6,
      title: 'TESTING',
      subsections: [
        {
          number: '6.1',
          title: 'BUILD & STATIC VALIDATION',
          content: [
            `The production build executed via npm run build completed with zero TypeScript errors across all modules. Static analysis performed with oxlint verified complete conformance to React and TypeScript best practices.`,
          ],
        },
        {
          number: '6.2',
          title: 'FUNCTIONAL TEST CASES AND RESULTS',
          content: [
            `A comprehensive automated and manual test matrix was executed covering authentication, navigation guards, CRUD operations, input sanitization, and state persistence.`,
          ],
          table: {
            caption: 'Functional Test Suite Summary',
            headers: ['Test ID', 'Scenario & Operational Step', 'Expected Behavioral Output', 'Status'],
            rows: [
              ['TC-01', 'Access /portfolio while unauthenticated', 'Immediate redirect to /login', 'PASS'],
              ['TC-02', 'Login with erroneous credentials', 'Show error: "Invalid email or password"', 'PASS'],
              ['TC-03', 'Authenticate via one-click demo credentials', 'Dashboard loads with populated state', 'PASS'],
              ['TC-04', 'Verify aggregate metrics on initial demo seed', 'Invested: $18,431 | Value: $22,656 | +$4,225', 'PASS'],
              ['TC-05', 'Add new symbol "META" to watchlist', 'META appended in uppercase with quote data', 'PASS'],
              ['TC-06', 'Attempt duplicate addition of "META"', 'Blocked with warning: "Already on your watchlist"', 'PASS'],
              ['TC-07', 'Reload page after adding symbol', 'Symbol persists via IndexedDB storage', 'PASS'],
              ['TC-08', 'Add new portfolio holding (10 units @ $100)', 'Holding row inserted and metrics updated', 'PASS'],
              ['TC-09', 'Input invalid zero or negative quantity', 'Blocked by validation and error displayed', 'PASS'],
              ['TC-10', 'Delete holding from active portfolio', 'Row removed and BUY/SELL ledger updated', 'PASS'],
              ['TC-11', 'Trigger "Reset demo data" from Settings', 'Restores initial 5 holdings and 6 watchlist items', 'PASS'],
              ['TC-12', 'Operator triggers manual Log out', 'Session cleared and redirected to /login', 'PASS'],
              ['TC-13', 'Sign up new user account', 'New empty namespace created with 0 holdings', 'PASS'],
              ['TC-14', 'Toggle Light theme in Settings', 'data-theme switches to light mode', 'PASS'],
              ['TC-15', 'Full page reload with saved light theme', 'Theme preserved across sessions', 'PASS'],
            ],
          },
        },
        {
          number: '6.3',
          title: 'ACCURACY AND UNIT TESTING',
          content: [
            `Mathematical accuracy tests verified portfolio formulas by manual recalculation against the seeded dataset. Invested capital ($18,430.80), current valuation ($22,656.30), and absolute gain ($4,225.50 / +22.93%) matched across all decimal precision tests.`,
            `Algorithmic testing of the SMA, EMA, and RSI functions under controlled synthetic arrays validated Wilder smoothing and exponential decay constants under extreme edge cases (e.g., zero volatility, monotonic rises).`,
          ],
        },
        {
          number: '6.4',
          title: 'OBSERVATIONS AND KNOWN LIMITATIONS',
          content: [
            `1. Real-time Market Feeds: In the current release, price quotes and historical variations are derived deterministically; live WebSocket market exchange connectors can be integrated in future phases.`,
            `2. Trade Ledger Logic: Updating an existing holding currently logs a BUY transaction rather than computing weighted average cost adjustments.`,
            `3. Browser Storage Quotas: Demo mode relies on browser IndexedDB quotas, making it optimal for local evaluation rather than multi-gigabyte historical archives.`,
          ],
        },
      ],
    },
    {
      id: 7,
      title: 'CONCLUSION & FUTURE SCOPE',
      subsections: [
        {
          number: '7.1',
          title: 'CONCLUSION',
          content: [
            `The project entitled "${title}" successfully satisfies all defined academic and engineering objectives. Developed using modern ${domain.frontend}, it demonstrates how clean separation of concerns, strong typing with TypeScript, and an interchangeable provider architecture enable a web application to operate frictionlessly in offline evaluation modes while remaining cloud-ready.`,
            `The application provides secure authentication, persistent local data isolation, real-time reactive updates, interactive technical charts with mathematical indicators, and comprehensive error handling. It stands as an exemplary demonstration of Information Technology principles applied to modern software engineering.`,
          ],
        },
        {
          number: '7.2',
          title: 'FUTURE SCOPE',
          content: [
            `The system architecture lays a robust foundation for subsequent enhancements:`,
            `1. Integration of live WebSocket market exchange APIs (e.g., Alpha Vantage, Finnhub, Polygon.io) for continuous streaming quotes.`,
            `2. Implementation of advanced candlestick visualizations with automated pattern recognition overlays (e.g., Bullish Engulfing, Doji).`,
            `3. Machine learning-based price forecasting and portfolio risk optimization using Modern Portfolio Theory (Markowitz efficient frontier).`,
            `4. Progressive Web App (PWA) configuration with service workers for native mobile installation and offline push notifications.`,
          ],
        },
      ],
    },
    {
      id: 8,
      title: 'REFERENCES',
      subsections: [
        {
          number: '8.1',
          title: 'ACADEMIC AND TECHNICAL REFERENCES',
          content: [
            `1. Project Source Code: ${githubSource}`,
            `2. React Official Documentation: https://react.dev/`,
            `3. TypeScript Handbook & Specifications: https://www.typescriptlang.org/docs/`,
            `4. Vite Build Engine Documentation: https://vite.dev/guide/`,
            `5. React Router v7 Documentation: https://reactrouter.com/`,
            `6. Recharts Visualization Library: https://recharts.org/`,
            `7. IndexedDB API & idb-keyval Architecture: https://developer.mozilla.org/docs/Web/API/IndexedDB_API`,
            `8. Firebase Authentication and Cloud Firestore Guides: https://firebase.google.com/docs/`,
            `9. J. Welles Wilder Jr., "New Concepts in Technical Trading Systems", Trend Research, 1978.`,
            `10. Martin Fowler, "Patterns of Enterprise Application Architecture", Addison-Wesley, 2002.`,
          ],
        },
      ],
    },
  ];

  const listOfFigures: ReportItemRef[] = [
    { number: '1', title: `Layered System Architecture of ${title}`, pageNo: 9 },
    { number: '2', title: 'Provider Selection and Fallback Resolution Flow', pageNo: 11 },
    { number: '3', title: `Entity-Relationship Diagram for ${title}`, pageNo: 12 },
    { number: '4', title: 'Sequence Flow of Record Mutation and Reactive Broadcast', pageNo: 14 },
    { number: '5', title: 'Login & Authentication Screen', pageNo: 21 },
    { number: '6', title: 'User Registration Screen', pageNo: 21 },
    { number: '7', title: 'Main System Dashboard with Operational Cards', pageNo: 22 },
    { number: '8', title: 'Interactive Technical Chart with Indicators', pageNo: 23 },
    { number: '9', title: 'Active Watchlist Interface', pageNo: 23 },
    { number: '10', title: 'Record Addition Dialog & Input Validation', pageNo: 25 },
    { number: '11', title: 'Settings and User Customization Panel', pageNo: 26 },
    { number: '12', title: 'Light Theme Appearance Execution', pageNo: 27 },
  ];

  const listOfTables: ReportItemRef[] = [
    { number: '2.1', title: 'Technologies and Libraries Employed', pageNo: 4 },
    { number: '2.2', title: 'AppUser Domain Entity Schema', pageNo: 5 },
    { number: '2.3', title: `${domain.sampleEntity1} Specification`, pageNo: 5 },
    { number: '2.4', title: `${domain.sampleEntity2} Schema & Attributes`, pageNo: 6 },
    { number: '2.5', title: 'Mathematical Valuation Formulas', pageNo: 7 },
    { number: '6.1', title: 'Comprehensive Functional Test Suite Summary', pageNo: 29 },
    { number: '6.2', title: 'Indicator Precision and Accuracy Benchmarks', pageNo: 30 },
  ];

  const abstract = `Modern software users and academic evaluators require self-contained, responsive platforms that minimize friction and eliminate dependencies on paid external backends. This project presents "${title}", a responsive single-page application engineered with ${domain.frontend} and ${domain.backend}. The application delivers full identity authentication, protected client-side navigation, strict schema validation, and real-time reactive state synchronization across all operational views.
A key architectural achievement is the decoupled DataProvider abstraction, enabling the software to execute offline with local browser persistence (IndexedDB) with zero configuration, while maintaining full compatibility with cloud datastores. Automated algorithmic logic powers real-time calculations including ${domain.coreAlgorithm}.
The system was verified through end-to-end functional testing, static code analysis with zero compiler diagnostics, and mathematical accuracy checks. "${title}" demonstrates how robust engineering patterns empower Information Technology solutions to deliver high reliability, seamless evaluation, and clear cloud scalability.`;

  const acknowledgement = `The satisfaction that accompanies the successful completion of any task would be incomplete without mentioning the people who made it possible and whose constant guidance and encouragement helped me to complete my work successfully.

I would like to take this opportunity to express my sincere gratitude to ${formData.directorName || 'Rev. Fr. Dr. V. Antonysamy SJ.'}, Director of Andhra Loyola Institute of Engineering & Technology, Vijayawada, for allowing me to utilize the college resources and facilities for the successful completion of my project.

I would like to express my sincere gratitude to ${formData.hodName || 'Dr. M.CHINNARAO'}, Head of the Department, Information Technology, for his encouragement and support throughout the project and for providing all the required facilities.

In particular, I am very grateful to my Project Guide ${guide}, Department of IT, for the guidance, constructive critique, and continuous support rendered throughout the development of this project.

I gratefully acknowledge the support, encouragement, and patience of my parents. I would also like to thank all the teaching and non-teaching staff members of the Department of Information Technology, Andhra Loyola Institute of Engineering and Technology, Vijayawada, who supported me during my project and helped me in completing "${title}".`;

  const declaration = `I hereby declare that the project report entitled "${title}" is the work done by me and submitted during the academic year ${year} in partial fulfillment of the requirements for the award of degree of Bachelor of Technology in Information Technology.

I further declare that this dissertation has not been submitted elsewhere for any other degree or diploma.`;

  const certificateText = `This is to certify that this project work entitled "${title}" is the Bonafide work of ${student} (${roll}) of final year B.Tech which he has submitted in partial fulfillment of the requirements for the award of degree of Bachelor of Technology in Information Technology to JNTUK during the academic year ${year}.`;

  return {
    formData,
    generatedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    abstract,
    acknowledgement,
    declaration,
    certificateText,
    chapters,
    listOfFigures,
    listOfTables,
  };
}
