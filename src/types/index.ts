export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type ConfidenceLevel = 'Known Safe' | 'Emerging / Unverified' | 'High Scam Likelihood';

export interface ScanResult {
  riskLevel: RiskLevel;
  confidenceLevel: ConfidenceLevel;
  scamType?: string;
  explanation: string;
  safeActions: string[];
  detectionReasons: string[];
  emergencyMode?: boolean;
}

export interface URLAnalysis extends ScanResult {
  layers: {
    threatIntelligence: { detected: boolean; vendors: number; total: number };
    domainIntelligence: { age: number; suspiciousTLD: boolean };
    behavioralAnalysis: { patterns: string[] };
    heuristicAnalysis: { score: number; factors: string[] };
  };
}

export interface FileAnalysis extends ScanResult {
  fileName: string;
  fileSize: string;
  fileType: string;
  detectionRatio: { detected: number; total: number };
  permissions?: string[];
  hash: string;
}

export interface OTPScenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  risk: RiskLevel;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
