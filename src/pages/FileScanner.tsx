import { useState } from 'react';
import { FileUp, Scan, ArrowLeft, File, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ScanResultDisplay from '@/components/features/ScanResultDisplay';
import { analyzeFile } from '@/lib/security-engine';
import type { FileAnalysis } from '@/types';

interface FileScannerProps {
  onBack: () => void;
}

export default function FileScanner({ onBack }: FileScannerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<FileAnalysis | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) return;

    setIsScanning(true);
    
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const analysis = analyzeFile(selectedFile);
    setResult(analysis);
    setIsScanning(false);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">File & APK Malware Scanner</h2>
          <p className="text-sm text-muted-foreground">
            Hash-based malware detection with permission analysis
          </p>
        </div>
      </div>

      {!result ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileUp className="w-5 h-5 text-primary" />
              Upload File for Analysis
            </CardTitle>
            <CardDescription>
              Upload APK, PDF, ZIP, or any suspicious file for security scanning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
                accept=".apk,.pdf,.zip,.exe,.dmg,.deb,.msi"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <FileUp className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Click to upload file</p>
                    <p className="text-sm text-muted-foreground">Supports: APK, PDF, ZIP, EXE, DMG</p>
                  </div>
                </div>
              </label>
            </div>

            {selectedFile && (
              <div className="glass rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <File className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleScan}
                  disabled={isScanning}
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
                      Scan File
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Info Card */}
            <div className="glass rounded-lg p-4 border border-primary/20">
              <h4 className="font-semibold mb-2 text-sm">What We Analyze:</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Multi-engine malware detection (VirusTotal-style)</li>
                <li>• APK dangerous permission scanning</li>
                <li>• File hash reputation lookup</li>
                <li>• Behavioral risk assessment</li>
                <li>• Detection confidence scoring</li>
              </ul>
            </div>

            {/* Privacy Notice */}
            <div className="glass rounded-lg p-4 border border-green-500/20 bg-green-500/5">
              <p className="text-sm text-center">
                <strong>🔒 Privacy Protected:</strong> Files are analyzed locally and not stored permanently.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <ScanResultDisplay result={result} title="File Security Analysis Results" />

          {/* File Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>File Analysis Details</CardTitle>
              <CardDescription>Technical information and metadata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="glass rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-sm">File Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File Name:</span>
                    <span className="font-mono">{result.fileName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File Size:</span>
                    <span>{result.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File Type:</span>
                    <span>{result.fileType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SHA-256 Hash:</span>
                    <span className="font-mono text-xs break-all">{result.hash}</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-sm">Detection Ratio</h4>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Security Engines:</span>
                  <span className={`font-bold text-lg ${
                    result.detectionRatio.detected > 5 ? 'text-red-500' : 
                    result.detectionRatio.detected > 0 ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {result.detectionRatio.detected} / {result.detectionRatio.total}
                  </span>
                </div>
              </div>

              {result.permissions && result.permissions.length > 0 && (
                <div className="glass rounded-lg p-4 border border-yellow-500/20">
                  <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    APK Permissions Detected
                  </h4>
                  <div className="space-y-2">
                    {result.permissions.map((permission, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-500">⚠️</span>
                        <span className="font-mono text-xs">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button onClick={handleReset} variant="outline" size="lg">
              Scan Another File
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
