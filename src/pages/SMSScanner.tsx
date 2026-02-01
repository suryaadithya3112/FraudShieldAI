import { useState } from 'react';
import { MessageSquare, Scan, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ScanResultDisplay from '@/components/features/ScanResultDisplay';
import { analyzeSMS } from '@/lib/security-engine';
import type { ScanResult } from '@/types';

interface SMSScannerProps {
  onBack: () => void;
}

export default function SMSScanner({ onBack }: SMSScannerProps) {
  const [smsText, setSmsText] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!smsText.trim()) return;

    setIsScanning(true);
    
    // Simulate scanning delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysis = analyzeSMS(smsText);
    setResult(analysis);
    setIsScanning(false);
  };

  const handleReset = () => {
    setSmsText('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">SMS Scam Analyzer</h2>
          <p className="text-sm text-muted-foreground">
            Paste your SMS message text for multi-layer scam detection
          </p>
        </div>
      </div>

      {!result ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Paste SMS Message
            </CardTitle>
            <CardDescription>
              This analysis works similar to scam-detection logic used by caller ID apps, without accessing your messages.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your SMS message here...

Example:
URGENT: Your bank account will be suspended. Verify OTP 123456 immediately at: bit.ly/verify-acc"
              value={smsText}
              onChange={(e) => setSmsText(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />

            <div className="flex gap-3">
              <Button
                onClick={handleScan}
                disabled={!smsText.trim() || isScanning}
                className="flex-1"
                size="lg"
              >
                {isScanning ? (
                  <>
                    <Scan className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5 mr-2" />
                    Analyze SMS
                  </>
                )}
              </Button>
            </div>

            {/* Info Card */}
            <div className="glass rounded-lg p-4 border border-primary/20">
              <h4 className="font-semibold mb-2 text-sm">What We Analyze:</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Scam keywords and urgency tactics</li>
                <li>• Bank/government impersonation patterns</li>
                <li>• Fake offers and investment traps</li>
                <li>• Phishing links and social engineering</li>
                <li>• OTP fraud attempts</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <ScanResultDisplay result={result} title="SMS Scam Analysis Results" />
          
          <div className="flex justify-center">
            <Button onClick={handleReset} variant="outline" size="lg">
              Analyze Another Message
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
