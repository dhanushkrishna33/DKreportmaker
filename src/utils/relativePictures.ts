// Generates domain-relative diagrams and UI mockups tailored to the project title and domain

export interface GeneratedFigure {
  id: number;
  title: string;
  caption: string;
  description: string;
  imageSrc: string;
  pageNo: number;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getRelativeFiguresForProject(
  projectName: string,
  domainName: string
): Record<number, GeneratedFigure> {
  const isStock = projectName.toLowerCase().includes('stock') ||
    projectName.toLowerCase().includes('invest') ||
    projectName.toLowerCase().includes('portfolio') ||
    projectName.toLowerCase().includes('groww');

  // If it's the InvestFlow stock project, use the extracted official photos
  if (isStock) {
    return {
      1: {
        id: 1,
        title: `System architecture of ${projectName}`,
        caption: `Figure 1: System architecture of ${projectName}`,
        description: 'The UI layer never touches storage directly. The service layer forwards calls to the active provider (Demo provider or Cloud provider).',
        imageSrc: './images/fig1_architecture.png',
        pageNo: 9,
      },
      2: {
        id: 2,
        title: 'Provider selection and fallback flow',
        caption: 'Figure 2: Provider selection and fallback flow',
        description: 'The decision flow executed once when the application starts. Falls back gracefully to Demo provider if configuration is missing.',
        imageSrc: './images/fig2_provider_flow.png',
        pageNo: 11,
      },
      3: {
        id: 3,
        title: 'Entity relationship diagram',
        caption: 'Figure 3: Entity relationship diagram',
        description: 'One user owns many watchlist items, holdings, and transactions, and has exactly one set of preferences.',
        imageSrc: './images/fig3_erd.png',
        pageNo: 12,
      },
      4: {
        id: 4,
        title: 'Sequence of adding a holding',
        caption: 'Figure 4: Sequence of adding a holding',
        description: 'Form submission validates inputs, saves record through databaseService, and emits update to all reactive listeners.',
        imageSrc: './images/fig4_sequence.png',
        pageNo: 14,
      },
      5: {
        id: 5,
        title: 'Login Page',
        caption: 'Figure 5: Login Page',
        description: 'The login screen shows the brand, credentials form, and demo access credentials.',
        imageSrc: './images/fig5_login.jpg',
        pageNo: 21,
      },
      6: {
        id: 6,
        title: 'Signup Page',
        caption: 'Figure 6: Signup Page',
        description: 'The sign-up form collects name, email, and password with boundary validation.',
        imageSrc: './images/fig6_signup.jpg',
        pageNo: 21,
      },
      7: {
        id: 7,
        title: 'Dashboard',
        caption: 'Figure 7: Dashboard',
        description: 'Dashboard displays summary metrics, interactive chart, watchlist, and live ticker strip.',
        imageSrc: './images/fig7_dashboard.jpg',
        pageNo: 22,
      },
      8: {
        id: 8,
        title: 'Price chart with SMA, EMA and RSI',
        caption: 'Figure 8: Price chart with SMA, EMA and RSI',
        description: '3M range chart with SMA, EMA overlays, and 14-period RSI sub-panel.',
        imageSrc: './images/fig8_chart_indicators.jpg',
        pageNo: 23,
      },
      9: {
        id: 9,
        title: 'Watchlist',
        caption: 'Figure 9: Watchlist',
        description: 'Watchlist table displays tracked symbols and real-time daily price performance.',
        imageSrc: './images/fig9_watchlist.jpg',
        pageNo: 23,
      },
      10: {
        id: 10,
        title: 'Adding a Symbol to the Watchlist',
        caption: 'Figure 10: Adding a Symbol to the Watchlist',
        description: 'Adding an asset appends the row with immediate confirmation toast feedback.',
        imageSrc: './images/fig10_add_symbol.jpg',
        pageNo: 24,
      },
      11: {
        id: 11,
        title: 'Duplicate Symbol Validation',
        caption: 'Figure 11: Duplicate Symbol Validation',
        description: 'Duplicate asset addition is safely blocked with validation messaging.',
        imageSrc: './images/fig11_duplicate_val.jpg',
        pageNo: 24,
      },
      12: {
        id: 12,
        title: 'Portfolio',
        caption: 'Figure 12: Portfolio',
        description: 'Portfolio table with invested cost basis, current value, and individual P/L metrics.',
        imageSrc: './images/fig12_portfolio.jpg',
        pageNo: 25,
      },
      13: {
        id: 13,
        title: 'Add Holding Dialog',
        caption: 'Figure 13: Add Holding Dialog',
        description: 'Dialog collects asset symbol, share quantity, and purchase price.',
        imageSrc: './images/fig13_add_holding.jpg',
        pageNo: 25,
      },
      14: {
        id: 14,
        title: 'Input Validation',
        caption: 'Figure 14: Input Validation',
        description: 'Enforces non-negative inputs and prevents corrupt records.',
        imageSrc: './images/fig14_input_val.jpg',
        pageNo: 26,
      },
      15: {
        id: 15,
        title: 'Settings Page',
        caption: 'Figure 15: Settings Page',
        description: 'Controls for visual themes, chart indicators, and data mode options.',
        imageSrc: './images/fig15_settings.jpg',
        pageNo: 26,
      },
      16: {
        id: 16,
        title: 'Light Theme',
        caption: 'Figure 16: Light Theme',
        description: 'The application executing under the light theme palette.',
        imageSrc: './images/fig16_light_theme.jpg',
        pageNo: 27,
      },
      17: {
        id: 17,
        title: 'Reset Demo Data Confirmation',
        caption: 'Figure 17: Reset Demo Data Confirmation',
        description: 'Modal confirming restoration of the clean baseline sample dataset.',
        imageSrc: './images/fig17_reset_confirm.jpg',
        pageNo: 27,
      },
      18: {
        id: 18,
        title: 'Empty State for a New Account',
        caption: 'Figure 18: Empty State for a New Account',
        description: 'New user account initialized with clean empty state notices.',
        imageSrc: './images/fig18_empty_state.jpg',
        pageNo: 28,
      },
    };
  }

  // Otherwise, construct dynamic, high-resolution SVG figures tailored to the project title
  const cleanTitle = escapeXml(projectName);
  const cleanDomain = escapeXml(domainName);

  // Helper to build modern SVG mockup frames
  const createMockupSvg = (headerText: string, contentSvg: string, bg = '#0f172a'): string => `
    <svg xmlns="http://www.w3.org/2000/svg" width="750" height="420" viewBox="0 0 750 420">
      <defs>
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e293b"/>
          <stop offset="100%" stopColor="#334155"/>
        </linearGradient>
      </defs>
      <rect width="750" height="420" rx="10" fill="${bg}" stroke="#334155" stroke-width="2" filter="url(#shadow)"/>
      <!-- Window Title Bar -->
      <path d="M 0,10 Q 0,0 10,0 L 740,0 Q 750,0 750,10 L 750,38 L 0,38 Z" fill="url(#headerGrad)"/>
      <circle cx="20" cy="19" r="5" fill="#ef4444"/>
      <circle cx="36" cy="19" r="5" fill="#f59e0b"/>
      <circle cx="52" cy="19" r="5" fill="#10b981"/>
      <text x="375" y="24" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="600" text-anchor="middle">
        ${escapeXml(headerText)}
      </text>
      <!-- Content -->
      <g transform="translate(0, 38)">
        ${contentSvg}
      </g>
    </svg>
  `;

  // Figure 1: System Architecture Diagram
  const fig1Svg = createMockupSvg(`${cleanTitle} - Architecture Blueprint`, `
    <rect width="750" height="382" fill="#0b1120"/>
    <!-- Presentation Tier -->
    <rect x="50" y="30" width="650" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
    <text x="375" y="55" fill="#c7d2fe" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Presentation Tier (User Interface)</text>
    <text x="375" y="75" fill="#818cf8" font-family="sans-serif" font-size="12" text-anchor="middle">React 19 Components • State Handlers • Responsive Layout Controls</text>

    <!-- Arrow 1 -->
    <line x1="375" y1="90" x2="375" y2="120" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
    <polygon points="375,124 370,116 380,116" fill="#94a3b8"/>

    <!-- Service Tier -->
    <rect x="100" y="125" width="550" height="60" rx="8" fill="#0f2b38" stroke="#0ea5e9" stroke-width="2"/>
    <text x="375" y="150" fill="#bae6fd" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Application &amp; Service Logic Tier</text>
    <text x="375" y="170" fill="#38bdf8" font-family="sans-serif" font-size="12" text-anchor="middle">Business Validation • Processing Engine • Event Broadcaster</text>

    <!-- Arrow 2 -->
    <line x1="375" y1="185" x2="375" y2="215" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
    <polygon points="375,219 370,211 380,211" fill="#94a3b8"/>

    <!-- Data Provider Tier -->
    <rect x="150" y="220" width="450" height="50" rx="8" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="375" y="250" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">DataProvider Contract Abstraction</text>

    <!-- Divergence Arrows -->
    <line x1="260" y1="270" x2="200" y2="300" stroke="#10b981" stroke-width="2"/>
    <line x1="490" y1="270" x2="550" y2="300" stroke="#3b82f6" stroke-width="2"/>

    <!-- Storage 1 -->
    <rect x="70" y="300" width="260" height="55" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
    <text x="200" y="325" fill="#a7f3d0" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Local Provider (IndexedDB)</text>
    <text x="200" y="343" fill="#6ee7b7" font-family="sans-serif" font-size="11" text-anchor="middle">Offline-First • Local Session Store</text>

    <!-- Storage 2 -->
    <rect x="420" y="300" width="260" height="55" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="550" y="325" fill="#bfdbfe" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Cloud Data Engine</text>
    <text x="550" y="343" fill="#93c5fd" font-family="sans-serif" font-size="11" text-anchor="middle">Remote Database • Synchronized State</text>
  `);

  // Figure 2: Workflow Flowchart
  const fig2Svg = createMockupSvg(`${cleanTitle} - Execution Flow`, `
    <rect width="750" height="382" fill="#0b1120"/>
    <circle cx="100" cy="191" r="30" fill="#2563eb"/>
    <text x="100" y="196" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Start</text>

    <line x1="130" y1="191" x2="190" y2="191" stroke="#64748b" stroke-width="2"/>
    <polygon points="194,191 186,186 186,196" fill="#64748b"/>

    <rect x="195" y="161" width="130" height="60" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
    <text x="260" y="186" fill="#e0f2fe" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Input Data</text>
    <text x="260" y="204" fill="#7dd3fc" font-family="sans-serif" font-size="10" text-anchor="middle">Validation Check</text>

    <line x1="325" y1="191" x2="385" y2="191" stroke="#64748b" stroke-width="2"/>
    <polygon points="389,191 381,186 381,196" fill="#64748b"/>

    <polygon points="450,150 510,191 450,232 390,191" fill="#431407" stroke="#ea580c" stroke-width="2"/>
    <text x="450" y="195" fill="#ffedd5" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Valid?</text>

    <!-- Yes Path -->
    <line x1="510" y1="191" x2="570" y2="191" stroke="#10b981" stroke-width="2"/>
    <polygon points="574,191 566,186 566,196" fill="#10b981"/>
    <text x="540" y="180" fill="#34d399" font-family="sans-serif" font-size="11" font-weight="bold">Yes</text>

    <rect x="575" y="161" width="135" height="60" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
    <text x="642" y="186" fill="#d1fae5" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Process Record</text>
    <text x="642" y="204" fill="#a7f3d0" font-family="sans-serif" font-size="10" text-anchor="middle">State Updated</text>

    <!-- No Path -->
    <line x1="450" y1="232" x2="450" y2="300" stroke="#ef4444" stroke-width="2"/>
    <line x1="450" y1="300" x2="260" y2="300" stroke="#ef4444" stroke-width="2"/>
    <line x1="260" y1="300" x2="260" y2="225" stroke="#ef4444" stroke-width="2"/>
    <polygon points="260,221 255,229 265,229" fill="#ef4444"/>
    <text x="460" y="260" fill="#f87171" font-family="sans-serif" font-size="11" font-weight="bold">No (Alert Error)</text>
  `);

  // Figure 3: ERD Diagram
  const fig3Svg = createMockupSvg(`${cleanTitle} - Entity Relationship Blueprint`, `
    <rect width="750" height="382" fill="#0b1120"/>
    <!-- Entity 1: User -->
    <rect x="60" y="40" width="180" height="130" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <path d="M 60,40 L 240,40 L 240,65 L 60,65 Z" fill="#1d4ed8"/>
    <text x="150" y="57" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">APP_USER (1)</text>
    <text x="75" y="85" fill="#cbd5e1" font-family="monospace" font-size="11">PK: uid (string)</text>
    <text x="75" y="105" fill="#94a3b8" font-family="monospace" font-size="11">email (string)</text>
    <text x="75" y="125" fill="#94a3b8" font-family="monospace" font-size="11">name (string)</text>
    <text x="75" y="145" fill="#94a3b8" font-family="monospace" font-size="11">created (int)</text>

    <!-- Connection Line -->
    <line x1="240" y1="105" x2="350" y2="105" stroke="#94a3b8" stroke-width="2"/>
    <text x="295" y="95" fill="#cbd5e1" font-family="sans-serif" font-size="10" text-anchor="middle">has many</text>

    <!-- Entity 2: Core Record -->
    <rect x="350" y="40" width="190" height="130" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <path d="M 350,40 L 540,40 L 540,65 L 350,65 Z" fill="#047857"/>
    <text x="445" y="57" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">OPERATIONAL_ITEM (M)</text>
    <text x="365" y="85" fill="#cbd5e1" font-family="monospace" font-size="11">PK: itemId (string)</text>
    <text x="365" y="105" fill="#94a3b8" font-family="monospace" font-size="11">FK: userId (string)</text>
    <text x="365" y="125" fill="#94a3b8" font-family="monospace" font-size="11">dataValue (float)</text>
    <text x="365" y="145" fill="#94a3b8" font-family="monospace" font-size="11">timestamp (int)</text>

    <!-- Entity 3: Audit Log -->
    <rect x="350" y="210" width="190" height="120" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <path d="M 350,210 L 540,210 L 540,235 L 350,235 Z" fill="#b45309"/>
    <text x="445" y="227" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">ACTION_LEDGER (M)</text>
    <text x="365" y="255" fill="#cbd5e1" font-family="monospace" font-size="11">PK: logId (string)</text>
    <text x="365" y="275" fill="#94a3b8" font-family="monospace" font-size="11">actionType (string)</text>
    <text x="365" y="295" fill="#94a3b8" font-family="monospace" font-size="11">status (string)</text>

    <!-- Connection Line 2 -->
    <line x1="150" y1="170" x2="150" y2="270" stroke="#94a3b8" stroke-width="2"/>
    <line x1="150" y1="270" x2="350" y2="270" stroke="#94a3b8" stroke-width="2"/>
  `);

  // Figure 4: Sequence Diagram
  const fig4Svg = createMockupSvg(`${cleanTitle} - Interaction Sequence`, `
    <rect width="750" height="382" fill="#0b1120"/>
    <!-- Lifelines -->
    <rect x="60" y="20" width="120" height="35" rx="4" fill="#3b82f6"/>
    <text x="120" y="42" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Client (UI)</text>
    <line x1="120" y1="55" x2="120" y2="350" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,4"/>

    <rect x="315" y="20" width="120" height="35" rx="4" fill="#0ea5e9"/>
    <text x="375" y="42" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Service API</text>
    <line x1="375" y1="55" x2="375" y2="350" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,4"/>

    <rect x="570" y="20" width="120" height="35" rx="4" fill="#10b981"/>
    <text x="630" y="42" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Data Store</text>
    <line x1="630" y1="55" x2="630" y2="350" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,4"/>

    <!-- Messages -->
    <line x1="120" y1="90" x2="375" y2="90" stroke="#38bdf8" stroke-width="2"/>
    <polygon points="375,90 367,85 367,95" fill="#38bdf8"/>
    <text x="245" y="82" fill="#bae6fd" font-family="sans-serif" font-size="11" text-anchor="middle">1. submitRecord(payload)</text>

    <line x1="375" y1="130" x2="630" y2="130" stroke="#34d399" stroke-width="2"/>
    <polygon points="630,130 622,125 622,135" fill="#34d399"/>
    <text x="500" y="122" fill="#a7f3d0" font-family="sans-serif" font-size="11" text-anchor="middle">2. persist(record)</text>

    <line x1="630" y1="170" x2="375" y2="170" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3,3"/>
    <polygon points="375,170 383,165 383,175" fill="#94a3b8"/>
    <text x="500" y="162" fill="#cbd5e1" font-family="sans-serif" font-size="11" text-anchor="middle">3. ackSuccess(id)</text>

    <line x1="375" y1="210" x2="120" y2="210" stroke="#38bdf8" stroke-width="2"/>
    <polygon points="120,210 128,205 128,215" fill="#38bdf8"/>
    <text x="245" y="202" fill="#bae6fd" font-family="sans-serif" font-size="11" text-anchor="middle">4. notifyStateChange()</text>
  `);

  // Figure 7: Main Dashboard Mockup
  const fig7Svg = createMockupSvg(`${cleanTitle} - Main Operational Dashboard`, `
    <rect width="750" height="382" fill="#0f172a"/>
    <!-- Metric Cards -->
    <rect x="30" y="20" width="155" height="75" rx="8" fill="#1e293b" stroke="#334155"/>
    <text x="45" y="42" fill="#94a3b8" font-family="sans-serif" font-size="11">Total Records</text>
    <text x="45" y="72" fill="#38bdf8" font-family="sans-serif" font-size="22" font-weight="bold">1,428</text>

    <rect x="205" y="20" width="155" height="75" rx="8" fill="#1e293b" stroke="#334155"/>
    <text x="220" y="42" fill="#94a3b8" font-family="sans-serif" font-size="11">System Accuracy</text>
    <text x="220" y="72" fill="#34d399" font-family="sans-serif" font-size="22" font-weight="bold">98.4%</text>

    <rect x="380" y="20" width="155" height="75" rx="8" fill="#1e293b" stroke="#334155"/>
    <text x="395" y="42" fill="#94a3b8" font-family="sans-serif" font-size="11">Throughput</text>
    <text x="395" y="72" fill="#f59e0b" font-family="sans-serif" font-size="22" font-weight="bold">42 ms</text>

    <rect x="555" y="20" width="165" height="75" rx="8" fill="#1e293b" stroke="#334155"/>
    <text x="570" y="42" fill="#94a3b8" font-family="sans-serif" font-size="11">Active Nodes</text>
    <text x="570" y="72" fill="#a855f7" font-family="sans-serif" font-size="22" font-weight="bold">Operational</text>

    <!-- Main Chart Panel -->
    <rect x="30" y="115" width="690" height="235" rx="8" fill="#1e293b" stroke="#334155"/>
    <text x="50" y="145" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="bold">${cleanTitle} - Performance Telemetry</text>
    <path d="M 60,300 Q 180,240 280,270 T 480,190 T 680,210" fill="none" stroke="#38bdf8" stroke-width="3"/>
    <path d="M 60,300 Q 180,260 280,285 T 480,220 T 680,235" fill="none" stroke="#34d399" stroke-width="2" stroke-dasharray="5,5"/>
    <line x1="60" y1="320" x2="680" y2="320" stroke="#475569" stroke-width="1"/>
  `);

  // Figure 8: Analytics & Accuracy Curve
  const fig8Svg = createMockupSvg(`${cleanTitle} - Analytical Trends & Validation`, `
    <rect width="750" height="382" fill="#0f172a"/>
    <text x="50" y="35" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="bold">Convergence and Validation Analysis</text>
    <rect x="40" y="60" width="670" height="290" rx="8" fill="#1e293b" stroke="#334155"/>
    <path d="M 70,300 Q 150,150 250,120 T 450,95 T 670,85" fill="none" stroke="#22c55e" stroke-width="3"/>
    <path d="M 70,100 Q 150,220 250,250 T 450,280 T 670,290" fill="none" stroke="#ef4444" stroke-width="2"/>
    <text x="100" y="90" fill="#22c55e" font-family="sans-serif" font-size="12" font-weight="bold">Validation Accuracy (98.4%)</text>
    <text x="100" y="270" fill="#ef4444" font-family="sans-serif" font-size="12" font-weight="bold">Loss Curve (0.012)</text>
  `);

  return {
    1: {
      id: 1,
      title: `System architecture of ${projectName}`,
      caption: `Figure 1: System architecture of ${projectName}`,
      description: `Layered architecture depicting presentation tier, ${cleanDomain} service pipeline, and data isolation abstraction.`,
      imageSrc: svgToDataUrl(fig1Svg),
      pageNo: 9,
    },
    2: {
      id: 2,
      title: 'Provider selection and fallback flow',
      caption: 'Figure 2: Operational execution and validation flow',
      description: 'The decision flow executed during runtime processing with automatic fallback and error boundary trapping.',
      imageSrc: svgToDataUrl(fig2Svg),
      pageNo: 11,
    },
    3: {
      id: 3,
      title: 'Entity relationship diagram',
      caption: `Figure 3: Entity relationship diagram for ${projectName}`,
      description: 'Relational data modeling linking authenticated users, domain records, and transactional audit ledgers.',
      imageSrc: svgToDataUrl(fig3Svg),
      pageNo: 12,
    },
    4: {
      id: 4,
      title: 'Sequence flow of primary operation',
      caption: 'Figure 4: Sequence flow of record processing and broadcast',
      description: 'Step-by-step communication between UI components, business logic engine, and persistent storage layers.',
      imageSrc: svgToDataUrl(fig4Svg),
      pageNo: 14,
    },
    5: {
      id: 5,
      title: 'Login Page',
      caption: 'Figure 5: Authentication & Login Interface',
      description: 'The authentication gateway providing identity verification and role-based access control.',
      imageSrc: './images/fig5_login.jpg',
      pageNo: 21,
    },
    6: {
      id: 6,
      title: 'Signup Page',
      caption: 'Figure 6: User Registration & Onboarding',
      description: 'New operator onboarding form featuring input constraint verification and password strength rules.',
      imageSrc: './images/fig6_signup.jpg',
      pageNo: 21,
    },
    7: {
      id: 7,
      title: 'Dashboard',
      caption: `Figure 7: ${cleanTitle} - Main Operational Dashboard`,
      description: 'Primary centralized dashboard presenting real-time operational metrics, throughput, and status indicators.',
      imageSrc: svgToDataUrl(fig7Svg),
      pageNo: 22,
    },
    8: {
      id: 8,
      title: 'Analytical trends and metrics',
      caption: 'Figure 8: Analytical Performance and Trend Visualizations',
      description: 'Comprehensive historical evaluation curves depicting accuracy benchmarks, loss convergence, and thresholds.',
      imageSrc: svgToDataUrl(fig8Svg),
      pageNo: 23,
    },
    9: {
      id: 9,
      title: 'Monitored Records List',
      caption: `Figure 9: ${cleanTitle} - Primary Record Ledger`,
      description: 'Tabular overview of active parameters, registered assets, and operational logs.',
      imageSrc: './images/fig9_watchlist.jpg',
      pageNo: 23,
    },
    10: {
      id: 10,
      title: 'Record Addition & Ingestion',
      caption: 'Figure 10: Ingestion Dialog and Data Submission',
      description: 'Interactive submission modal validating incoming data parameters before persisting to storage.',
      imageSrc: './images/fig10_add_symbol.jpg',
      pageNo: 24,
    },
    11: {
      id: 11,
      title: 'Validation & Duplicate Prevention',
      caption: 'Figure 11: Duplicate Detection and Error Callouts',
      description: 'Defensive validation logic flagging duplicate records and notifying users via contextual alerts.',
      imageSrc: './images/fig11_duplicate_val.jpg',
      pageNo: 24,
    },
    12: {
      id: 12,
      title: 'Evaluation View',
      caption: `Figure 12: ${cleanTitle} - Analytical Evaluation Panel`,
      description: 'Quantitative inspection view computing derived aggregates, valuations, and status indicators.',
      imageSrc: './images/fig12_portfolio.jpg',
      pageNo: 25,
    },
    13: {
      id: 13,
      title: 'Record Editing Dialog',
      caption: 'Figure 13: Entry Mutation & Configuration Modal',
      description: 'Modal permitting operators to fine-tune record parameters and adjust operational weights.',
      imageSrc: './images/fig13_add_holding.jpg',
      pageNo: 25,
    },
    14: {
      id: 14,
      title: 'Input Range Sanitization',
      caption: 'Figure 14: Input Boundary Sanitization in Action',
      description: 'Browser-level and programmatic checks enforcing non-negative numeric constraints and boundary checks.',
      imageSrc: './images/fig14_input_val.jpg',
      pageNo: 26,
    },
    15: {
      id: 15,
      title: 'Settings Page',
      caption: 'Figure 15: System Preferences & Configuration',
      description: 'Preferences panel managing thematic modes, panel visibility toggles, and data providers.',
      imageSrc: './images/fig15_settings.jpg',
      pageNo: 26,
    },
    16: {
      id: 16,
      title: 'Light Theme',
      caption: 'Figure 16: High-Contrast Light Theme Palette',
      description: 'The application executing under the light theme appearance for daylight academic environments.',
      imageSrc: './images/fig16_light_theme.jpg',
      pageNo: 27,
    },
    17: {
      id: 17,
      title: 'Reset Demo Data Confirmation',
      caption: 'Figure 17: Cache Purge and State Restoration Dialog',
      description: 'Security confirmation dialog alerting operators prior to restoring baseline sample datasets.',
      imageSrc: './images/fig17_reset_confirm.jpg',
      pageNo: 27,
    },
    18: {
      id: 18,
      title: 'Empty State for a New Account',
      caption: 'Figure 18: Initialized Empty State for New Operators',
      description: 'Clean user experience for newly provisioned accounts guiding operators through first-time setup.',
      imageSrc: './images/fig18_empty_state.jpg',
      pageNo: 28,
    },
  };
}
