import { Shield, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">FraudShield AI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced digital fraud prevention and early-warning system protecting users from scams, phishing, and cyber threats.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>SMS Scam Analysis</li>
              <li>OTP Fraud Protection</li>
              <li>URL Phishing Scanner</li>
              <li>Malware Detection</li>
              <li>AI Security Assistant</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Important Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This application provides risk-based cybersecurity guidance only. It does not read messages, block calls, or verify OTPs. No personal or banking data is collected.
            </p>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 FraudShield AI. Privacy-first fraud prevention platform.</p>
          <p className="mt-2">All security decisions are advisory-only. Always verify through official channels.</p>
        </div>
      </div>
    </footer>
  );
}
