import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RiskIndicator from './RiskIndicator';
import EmergencyMode from './EmergencyMode';
import type { ScanResult } from '@/types';

interface ScanResultDisplayProps {
  result: ScanResult;
  title: string;
}

export default function ScanResultDisplay({ result, title }: ScanResultDisplayProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Emergency Mode */}
      {result.emergencyMode && (
        <EmergencyMode />
      )}

      {/* Main Result Card */}
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Multi-layer security analysis completed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Indicator */}
          <RiskIndicator
            riskLevel={result.riskLevel}
            confidenceLevel={result.confidenceLevel}
            size="lg"
          />

          {/* Scam Type */}
          {result.scamType && (
            <div className="glass rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Detected Threat Type
              </h3>
              <p className="text-lg font-medium text-primary">{result.scamType}</p>
            </div>
          )}

          {/* Explanation */}
          <div className="glass rounded-lg p-4">
            <h3 className="font-semibold mb-2">Analysis Explanation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>
          </div>

          {/* Detection Reasons */}
          <div className="glass rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Why Flagged?
            </h3>
            <ul className="space-y-2">
              {result.detectionReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safe Actions */}
          <div className="glass rounded-lg p-4 border border-green-500/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-500">
              <CheckCircle2 className="w-5 h-5" />
              Recommended Safe Actions
            </h3>
            <ul className="space-y-2">
              {result.safeActions.map((action, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
