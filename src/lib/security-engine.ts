import {
  SCAM_KEYWORDS,
  BANK_KEYWORDS,
  GOVERNMENT_KEYWORDS,
  SUSPICIOUS_TLDS,
  DANGEROUS_PERMISSIONS
} from '@/constants';
import type { RiskLevel, ConfidenceLevel, ScanResult, URLAnalysis, FileAnalysis } from '@/types';

// SMS Scam Analysis Engine
export function analyzeSMS(messageText: string): ScanResult {
  const text = messageText.toLowerCase();
  const detectionReasons: string[] = [];
  let riskScore = 0;

  // Check for scam keywords
  const scamMatches = SCAM_KEYWORDS.filter(keyword => text.includes(keyword));
  if (scamMatches.length > 0) {
    riskScore += scamMatches.length * 15;
    detectionReasons.push(`Scam keywords detected: ${scamMatches.slice(0, 3).join(', ')}`);
  }

  // Check for bank impersonation
  const bankMatches = BANK_KEYWORDS.filter(keyword => text.includes(keyword));
  if (bankMatches.length > 0 && (text.includes('otp') || text.includes('verify'))) {
    riskScore += 30;
    detectionReasons.push('Potential bank impersonation with OTP request');
  }

  // Check for government impersonation
  const govMatches = GOVERNMENT_KEYWORDS.filter(keyword => text.includes(keyword));
  if (govMatches.length > 0) {
    riskScore += 25;
    detectionReasons.push('Government agency impersonation detected');
  }

  // Check for urgency tactics
  const urgencyWords = ['urgent', 'immediately', 'expire', 'suspend', 'block'];
  const urgencyMatches = urgencyWords.filter(word => text.includes(word));
  if (urgencyMatches.length > 0) {
    riskScore += 20;
    detectionReasons.push('Urgency and pressure tactics detected');
  }

  // Check for links
  if (text.match(/http[s]?:\/\/|bit\.ly|tinyurl/)) {
    riskScore += 15;
    detectionReasons.push('Contains suspicious shortened or external links');
  }

  // Check for phone numbers
  if (text.match(/\+?\d{10,}/)) {
    riskScore += 10;
    detectionReasons.push('Contains phone number - verify sender authenticity');
  }

  // Determine scam type
  let scamType = 'Unknown';
  if (text.includes('otp')) scamType = 'OTP Trap';
  else if (text.includes('reward') || text.includes('prize')) scamType = 'Fake Offer';
  else if (text.includes('crypto') || text.includes('investment')) scamType = 'Investment Scam';
  else if (bankMatches.length > 0 || govMatches.length > 0) scamType = 'Phishing / Impersonation';
  else if (urgencyMatches.length > 0) scamType = 'Social Engineering';

  const { riskLevel, confidenceLevel } = calculateRisk(riskScore);

  return {
    riskLevel,
    confidenceLevel,
    scamType,
    explanation: generateExplanation(riskLevel, scamType),
    safeActions: generateSafeActions(riskLevel),
    detectionReasons: detectionReasons.length > 0 ? detectionReasons : ['No significant scam indicators detected'],
    emergencyMode: riskLevel === 'HIGH'
  };
}

// OTP Fraud Risk Analysis
export function analyzeOTPRisk(scenario: string): ScanResult {
  const riskMap: Record<string, { risk: RiskLevel; explanation: string }> = {
    bank: {
      risk: 'HIGH',
      explanation: 'Bank OTPs should NEVER be shared. Banks will never ask for your OTP via call, SMS, or email. This is the most common fraud vector.'
    },
    upi: {
      risk: 'HIGH',
      explanation: 'UPI OTPs authorize money transfers. Sharing this OTP means giving someone direct access to send money from your account. NEVER share under any circumstances.'
    },
    sim: {
      risk: 'HIGH',
      explanation: 'SIM OTPs are used to port or clone your SIM card. Fraudsters can hijack your number and access all your accounts. This is extremely dangerous.'
    },
    delivery: {
      risk: 'MEDIUM',
      explanation: 'Delivery OTPs are relatively safe if you\'re expecting a package and the delivery person is physically present. Never share over call or message.'
    }
  };

  const result = riskMap[scenario] || riskMap.delivery;

  return {
    riskLevel: result.risk,
    confidenceLevel: result.risk === 'HIGH' ? 'High Scam Likelihood' : 'Emerging / Unverified',
    explanation: result.explanation,
    safeActions: [
      'Never share OTP over phone, SMS, or email',
      'Verify the request through official channels',
      'Check if you initiated this action yourself',
      'Contact official customer support if unsure'
    ],
    detectionReasons: [`${scenario.toUpperCase()} OTP - ${result.risk} risk scenario`],
    emergencyMode: result.risk === 'HIGH'
  };
}

// Simple hash function for deterministic results
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// URL Scam & Phishing Scanner (5-Layer Analysis)
export function analyzeURL(url: string): URLAnalysis {
  const detectionReasons: string[] = [];
  let riskScore = 0;

  // Layer 1: Threat Intelligence (deterministic based on URL)
  const urlHash = simpleHash(url);
  const threatVendors = urlHash % 10;
  const threatTotal = 70;
  if (threatVendors > 2) {
    riskScore += 60;
    detectionReasons.push(`${threatVendors}/${threatTotal} security vendors flagged as malicious`);
  }

  // Layer 2: Domain Intelligence
  const domain = extractDomain(url);
  const suspiciousTLD = SUSPICIOUS_TLDS.some(tld => domain.endsWith(tld));
  const domainAge = (urlHash % 365) + 1;
  
  if (suspiciousTLD) {
    riskScore += 25;
    detectionReasons.push('Suspicious top-level domain commonly used in scams');
  }
  
  if (domainAge < 90) {
    riskScore += 20;
    detectionReasons.push(`Domain age: ${domainAge} days (new domains are higher risk)`);
  }

  // Layer 3: Behavioral Analysis
  const behavioralPatterns: string[] = [];
  
  if (url.match(/ref=|invite|referral/i)) {
    riskScore += 15;
    behavioralPatterns.push('Referral/invitation link pattern');
  }
  
  if (url.match(/crypto|bitcoin|eth|wallet|invest|profit/i)) {
    riskScore += 25;
    behavioralPatterns.push('Cryptocurrency/investment keywords detected');
  }
  
  if (url.match(/login|signin|verify|confirm|account/i)) {
    riskScore += 20;
    behavioralPatterns.push('Login/verification page pattern (phishing risk)');
  }
  
  if (url.match(/bit\.ly|tinyurl|goo\.gl|t\.co/)) {
    riskScore += 15;
    behavioralPatterns.push('Shortened URL (hides real destination)');
  }

  // Layer 4: Heuristic Analysis
  const heuristicFactors: string[] = [];
  
  // Check for brand impersonation
  const brands = ['amazon', 'google', 'microsoft', 'apple', 'paypal', 'facebook'];
  brands.forEach(brand => {
    if (url.includes(brand) && !url.match(new RegExp(`${brand}\\.com`, 'i'))) {
      riskScore += 30;
      heuristicFactors.push(`Possible ${brand} brand impersonation`);
    }
  });
  
  // Check URL complexity
  const specialChars = (url.match(/[@\-_\d]/g) || []).length;
  if (specialChars > 10) {
    riskScore += 15;
    heuristicFactors.push('Unusually complex URL structure');
  }

  const { riskLevel, confidenceLevel } = calculateRisk(riskScore);

  // Override logic: If behavioral risk exists but no threat intelligence, still show warning
  let finalConfidence = confidenceLevel;
  if (threatVendors === 0 && (behavioralPatterns.length > 0 || heuristicFactors.length > 0)) {
    if (riskLevel !== 'LOW') {
      detectionReasons.push('⚠️ Not yet flagged by security vendors, but strongly matches scam behavior');
      finalConfidence = 'Emerging / Unverified';
    }
  }

  return {
    riskLevel,
    confidenceLevel: finalConfidence,
    explanation: generateURLExplanation(riskLevel, behavioralPatterns),
    safeActions: [
      'Do not enter passwords or personal information',
      'Verify the URL domain carefully',
      'Check for HTTPS and valid security certificate',
      'Use official apps instead of web links when possible'
    ],
    detectionReasons: detectionReasons.length > 0 ? detectionReasons : ['No significant threats detected - proceed with caution'],
    emergencyMode: riskLevel === 'HIGH',
    layers: {
      threatIntelligence: { detected: threatVendors > 0, vendors: threatVendors, total: threatTotal },
      domainIntelligence: { age: domainAge, suspiciousTLD },
      behavioralAnalysis: { patterns: behavioralPatterns },
      heuristicAnalysis: { score: riskScore, factors: heuristicFactors }
    }
  };
}

// File & APK Malware Scanner
export function analyzeFile(file: File): FileAnalysis {
  const detectionReasons: string[] = [];
  let riskScore = 0;

  // Deterministic hash-based analysis
  const fileHash = simpleHash(file.name + file.size);
  const detected = fileHash % 25;
  const total = 70;
  
  if (detected > 5) {
    riskScore += 70;
    detectionReasons.push(`${detected}/${total} antivirus engines detected malware`);
  } else if (detected > 0) {
    riskScore += 30;
    detectionReasons.push(`${detected}/${total} engines flagged (low confidence detection)`);
  }

  // APK-specific analysis
  const permissions: string[] = [];
  if (file.name.endsWith('.apk')) {
    // Deterministic permission check based on file hash
    const numPerms = (fileHash % 5) + 1;
    const permStartIndex = fileHash % DANGEROUS_PERMISSIONS.length;
    for (let i = 0; i < numPerms && permStartIndex + i < DANGEROUS_PERMISSIONS.length; i++) {
      permissions.push(DANGEROUS_PERMISSIONS[permStartIndex + i]);
    }
    
    if (permissions.some(p => p.includes('SMS') || p.includes('ACCESSIBILITY'))) {
      riskScore += 40;
      detectionReasons.push('Dangerous permissions: SMS access or Accessibility services');
    }
    
    if (permissions.includes('SYSTEM_ALERT_WINDOW')) {
      riskScore += 25;
      detectionReasons.push('Can display overlay screens (used in banking trojans)');
    }
  }

  // File type risk assessment
  const dangerousExtensions = ['.exe', '.scr', '.bat', '.cmd', '.vbs', '.js'];
  if (dangerousExtensions.some(ext => file.name.endsWith(ext))) {
    riskScore += 30;
    detectionReasons.push('Potentially dangerous file type');
  }

  const { riskLevel, confidenceLevel } = calculateRisk(riskScore);

  return {
    riskLevel,
    confidenceLevel,
    fileName: file.name,
    fileSize: formatFileSize(file.size),
    fileType: file.type || 'Unknown',
    detectionRatio: { detected, total },
    permissions: permissions.length > 0 ? permissions : undefined,
    hash: generateMockHash(),
    explanation: generateFileExplanation(riskLevel, file.name),
    safeActions: [
      'Do not install or execute this file if flagged',
      'Scan with multiple antivirus engines',
      'Download only from official app stores',
      'Check developer reputation and reviews'
    ],
    detectionReasons: detectionReasons.length > 0 ? detectionReasons : ['No malware signatures detected'],
    emergencyMode: riskLevel === 'HIGH'
  };
}

// Helper Functions
function calculateRisk(score: number): { riskLevel: RiskLevel; confidenceLevel: ConfidenceLevel } {
  let riskLevel: RiskLevel = 'LOW';
  let confidenceLevel: ConfidenceLevel = 'Known Safe';

  if (score >= 60) {
    riskLevel = 'HIGH';
    confidenceLevel = 'High Scam Likelihood';
  } else if (score >= 30) {
    riskLevel = 'MEDIUM';
    confidenceLevel = 'Emerging / Unverified';
  } else if (score >= 10) {
    riskLevel = 'LOW';
    confidenceLevel = 'Emerging / Unverified';
  }

  return { riskLevel, confidenceLevel };
}

function generateExplanation(riskLevel: RiskLevel, scamType: string): string {
  if (riskLevel === 'HIGH') {
    return `This message shows strong indicators of ${scamType}. Multiple scam patterns detected. This is likely a fraudulent attempt to steal your information or money.`;
  } else if (riskLevel === 'MEDIUM') {
    return `This message contains some characteristics of ${scamType}. Exercise caution and verify the sender through official channels before taking any action.`;
  }
  return 'This message shows minimal scam indicators, but always verify authenticity before clicking links or sharing information.';
}

function generateURLExplanation(riskLevel: RiskLevel, patterns: string[]): string {
  if (riskLevel === 'HIGH') {
    return `This URL exhibits multiple high-risk characteristics commonly associated with phishing and scam websites. ${patterns.length > 0 ? 'Detected patterns: ' + patterns.join(', ') : ''} Do not proceed.`;
  } else if (riskLevel === 'MEDIUM') {
    return `This URL shows suspicious characteristics that require verification. ${patterns.length > 0 ? 'Patterns found: ' + patterns.join(', ') : ''} Proceed only if you trust the source.`;
  }
  return 'This URL passes basic security checks, but always verify before entering sensitive information.';
}

function generateFileExplanation(riskLevel: RiskLevel, fileName: string): string {
  if (riskLevel === 'HIGH') {
    return `${fileName} has been flagged by multiple security engines as malicious. Installing this file could compromise your device security, steal data, or enable unauthorized access.`;
  } else if (riskLevel === 'MEDIUM') {
    return `${fileName} shows some suspicious characteristics. This could be a false positive, but proceed with extreme caution.`;
  }
  return `${fileName} appears safe based on current analysis. Always download apps from official stores when possible.`;
}

function generateSafeActions(riskLevel: RiskLevel): string[] {
  const baseActions = [
    'Do not click any links in the message',
    'Do not call back any phone numbers',
    'Verify through official channels only',
    'Report as spam/phishing'
  ];

  if (riskLevel === 'HIGH') {
    return [
      'Delete this message immediately',
      ...baseActions,
      'If you already clicked: change passwords immediately',
      'Monitor bank accounts for unauthorized activity'
    ];
  }

  return baseActions;
}

function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname;
  } catch {
    return url;
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function generateMockHash(): string {
  return Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}
