import { useState } from 'react';
import { Link, Scan, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ScanResultDisplay from '@/components/features/ScanResultDisplay';
import { analyzeURL } from '@/lib/security-engine';
import type { URLAnalysis } from '@/types';

interface URLScannerProps {
  onBack: () => void;
}

export default function URLScanner({ onBack }: URLScannerProps) {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<URLAnalysis | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!url.trim()) return;

    setIsScanning(true);
    
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysis = analyzeURL(url);
    setResult(analysis);
    setIsScanning(false);
  };

  const handleReset = () => {
    setUrl('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">URL Scam & Phishing Scanner</h2>
          <p className="text-sm text-muted-foreground">
            5-layer security analysis for suspicious links
          </p>
        </div>
      </div>

      {!result ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="w-5 h-5 text-primary" />
              Enter URL to Scan
            </CardTitle>
            <CardDescription>
              Paste any suspicious URL or link to analyze for phishing and scam indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input
                type="url"
                placeholder="https://example.com or bit.ly/suspicious-link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 font-mono text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              />
              <Button
                onClick={handleScan}
                disabled={!url.trim() || isScanning}
                size="lg"
              >
                {isScanning ? (
                  <>
                    <Scan className="w-5 h-5 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5 mr-2" />
                    Scan URL
                  </>
                )}
              </Button>
            </div>

            {/* 5-Layer Analysis Info */}
            <div className="glass rounded-lg p-4 border border-primary/20">
              <h4 className="font-semibold mb-3 text-sm">5-Layer Security Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-primary">1.</span>
                  <span>Threat Intelligence (VirusTotal-style)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">2.</span>
                  <span>Domain Age & Reputation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">3.</span>
                  <span>Behavioral Pattern Analysis</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">4.</span>
                  <span>Heuristic Risk Scoring</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">5.</span>
                  <span>Confidence Classification</span>
                </div>
              </div>
            </div>

            {/* Example Links */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Try scanning these examples:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUrl('https://bit.ly/crypto-reward-claim')}
                >
                  Shortened URL
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUrl('https://amaz0n-verify.xyz/login')}
                >
                  Brand Impersonation
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUrl('https://bank-verify-otp.site/confirm')}
                >
                  Banking Phish
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <ScanResultDisplay result={result} title="URL Security Analysis Results" />

          {/* Detailed Layer Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Layer Analysis</CardTitle>
              <CardDescription>Complete breakdown of 5-layer security scan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Layer 1: Threat Intelligence */}
              <div className="glass rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm">Layer 1: Threat Intelligence</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Vendor Detection:</span>
                  <span className={`font-bold ${result.layers.threatIntelligence.detected ? 'text-red-500' : 'text-green-500'}`}>
                    {result.layers.threatIntelligence.vendors} / {result.layers.threatIntelligence.total} engines
                  </span>
                </div>
              </div>

              {/* Layer 2: Domain Intelligence */}
              <div className="glass rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm">Layer 2: Domain Intelligence</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domain Age:</span>
                    <span className={result.layers.domainIntelligence.age < 90 ? 'text-yellow-500' : 'text-green-500'}>
                      {result.layers.domainIntelligence.age} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Suspicious TLD:</span>
                    <span className={result.layers.domainIntelligence.suspiciousTLD ? 'text-red-500' : 'text-green-500'}>
                      {result.layers.domainIntelligence.suspiciousTLD ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Layer 3: Behavioral Analysis */}
              {result.layers.behavioralAnalysis.patterns.length > 0 && (
                <div className="glass rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-sm">Layer 3: Behavioral Patterns</h4>
                  <ul className="space-y-1">
                    {result.layers.behavioralAnalysis.patterns.map((pattern, index) => (
                      <li key={index} className="text-sm text-yellow-500 flex items-start gap-2">
                        <span>⚠️</span>
                        <span>{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Layer 4: Heuristic Analysis */}
              {result.layers.heuristicAnalysis.factors.length > 0 && (
                <div className="glass rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-sm">Layer 4: Heuristic Factors</h4>
                  <ul className="space-y-1">
                    {result.layers.heuristicAnalysis.factors.map((factor, index) => (
                      <li key={index} className="text-sm text-red-500 flex items-start gap-2">
                        <span>🚨</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button onClick={handleReset} variant="outline" size="lg">
              Scan Another URL
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
