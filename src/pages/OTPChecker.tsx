import { useState } from 'react';
import { Shield, CreditCard, Smartphone, Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ScanResultDisplay from '@/components/features/ScanResultDisplay';
import { analyzeOTPRisk } from '@/lib/security-engine';
import type { ScanResult, OTPScenario } from '@/types';

interface OTPCheckerProps {
  onBack: () => void;
}

const OTP_SCENARIOS: OTPScenario[] = [
  {
    id: 'bank',
    name: 'Bank Account OTP',
    description: 'Account verification, transaction confirmation',
    icon: '🏦',
    risk: 'HIGH'
  },
  {
    id: 'upi',
    name: 'UPI Payment OTP',
    description: 'Money transfer, payment authorization',
    icon: '💳',
    risk: 'HIGH'
  },
  {
    id: 'sim',
    name: 'SIM Card OTP',
    description: 'SIM activation, port request',
    icon: '📱',
    risk: 'HIGH'
  },
  {
    id: 'delivery',
    name: 'Delivery OTP',
    description: 'Package confirmation, food delivery',
    icon: '📦',
    risk: 'MEDIUM'
  }
];

export default function OTPChecker({ onBack }: OTPCheckerProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScenarioSelect = (scenarioId: string) => {
    const analysis = analyzeOTPRisk(scenarioId);
    setSelectedScenario(scenarioId);
    setResult(analysis);
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">OTP Fraud Risk Protection</h2>
          <p className="text-sm text-muted-foreground">
            Select your OTP scenario to understand fraud risks
          </p>
        </div>
      </div>

      {!result ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Select OTP Type
            </CardTitle>
            <CardDescription>
              Choose the type of OTP you received to check fraud risk level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OTP_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioSelect(scenario.id)}
                  className={`glass rounded-lg p-6 text-left transition-all hover:scale-105 border-2 ${
                    scenario.risk === 'HIGH' 
                      ? 'border-red-500/20 hover:border-red-500/40' 
                      : 'border-yellow-500/20 hover:border-yellow-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{scenario.icon}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      scenario.risk === 'HIGH' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {scenario.risk} RISK
                    </span>
                  </div>
                  <h3 className="font-bold mb-1">{scenario.name}</h3>
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                </button>
              ))}
            </div>

            {/* Warning Box */}
            <div className="mt-6 glass rounded-lg p-4 border border-red-500/20 bg-red-500/5">
              <h4 className="font-semibold text-red-500 mb-2">⚠️ Critical Warning</h4>
              <p className="text-sm text-muted-foreground">
                <strong>NEVER SHARE OTP</strong> with anyone over phone, SMS, email, or chat. 
                Legitimate companies will NEVER ask for your OTP. If someone is pressuring you, it's a scam.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <ScanResultDisplay result={result} title="OTP Fraud Risk Analysis" />
          
          <div className="flex justify-center">
            <Button onClick={handleReset} variant="outline" size="lg">
              Check Another OTP Type
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
