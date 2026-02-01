import { MessageSquare, Link, FileUp, Shield, Bot, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import heroShield from '@/assets/hero-shield.jpg';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const FEATURES = [
  {
    id: 'sms',
    icon: MessageSquare,
    title: 'SMS Scam Analyzer',
    description: 'Paste SMS text for intelligent scam pattern detection',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    gradient: 'from-blue-500/20 to-transparent'
  },
  {
    id: 'otp',
    icon: Shield,
    title: 'OTP Fraud Protection',
    description: 'Check OTP sharing risk before it\'s too late',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    gradient: 'from-red-500/20 to-transparent'
  },
  {
    id: 'url',
    icon: Link,
    title: 'URL Phishing Scanner',
    description: '5-layer security analysis for suspicious links',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    gradient: 'from-yellow-500/20 to-transparent'
  },
  {
    id: 'file',
    icon: FileUp,
    title: 'File & APK Scanner',
    description: 'Malware detection with permission analysis',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    gradient: 'from-purple-500/20 to-transparent'
  },
  {
    id: 'telegram',
    icon: Send,
    title: 'Telegram Bot',
    description: 'Scan on-the-go via Telegram integration',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    gradient: 'from-cyan-500/20 to-transparent'
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'AI Security Assistant',
    description: 'Chat with AI for fraud prevention guidance',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    gradient: 'from-green-500/20 to-transparent'
  }
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0">
          <img
            src={heroShield}
            alt="Cybersecurity Shield"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>
        
        <div className="relative glass border border-border/40 p-12 md:p-16">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary">Privacy-First Security Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Advanced Digital Fraud Prevention
              <span className="block gradient-text mt-2">Powered by AI</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Protect yourself from SMS scams, phishing URLs, OTP fraud, and malware with multi-layer security analysis. 
              Real-time threat detection. No data collection.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="glass rounded-lg px-4 py-2 border border-green-500/20">
                <p className="text-sm"><span className="text-green-500 font-bold">✓</span> No Login Required</p>
              </div>
              <div className="glass rounded-lg px-4 py-2 border border-green-500/20">
                <p className="text-sm"><span className="text-green-500 font-bold">✓</span> Zero Data Collection</p>
              </div>
              <div className="glass rounded-lg px-4 py-2 border border-green-500/20">
                <p className="text-sm"><span className="text-green-500 font-bold">✓</span> Advisory Only</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-primary/20">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">5-Layer</div>
            <p className="text-sm text-muted-foreground">Security Analysis Engine</p>
          </CardContent>
        </Card>
        <Card className="glass border-primary/20">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">Real-time</div>
            <p className="text-sm text-muted-foreground">AI-Powered Threat Detection</p>
          </CardContent>
        </Card>
        <Card className="glass border-primary/20">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-sm text-muted-foreground">Privacy Protected</p>
          </CardContent>
        </Card>
      </section>

      {/* Features Grid */}
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3">Security Tools</h2>
          <p className="text-muted-foreground">
            Comprehensive fraud prevention suite to protect you from emerging cyber threats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className="glass group hover:scale-105 transition-all duration-300 cursor-pointer border-border/40 hover:border-primary/40"
                onClick={() => onNavigate(feature.id)}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`h-1 w-full bg-gradient-to-r ${feature.gradient} rounded-full`} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="glass rounded-2xl border border-border/40 p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center">How FraudShield AI Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="font-semibold mb-2">Input Data</h3>
            <p className="text-sm text-muted-foreground">Paste message, URL, or upload file</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="font-semibold mb-2">Multi-Layer Scan</h3>
            <p className="text-sm text-muted-foreground">5-layer security engine analyzes threats</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="font-semibold mb-2">Risk Assessment</h3>
            <p className="text-sm text-muted-foreground">Confidence-based risk classification</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">4</span>
            </div>
            <h3 className="font-semibold mb-2">Take Action</h3>
            <p className="text-sm text-muted-foreground">Follow safety recommendations</p>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="glass rounded-2xl border border-red-500/20 bg-red-500/5 p-8 md:p-12">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Emergency Fraud Response</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              If you've already shared sensitive information or suspect you're a victim of fraud, 
              our Emergency Response Mode automatically activates with immediate action steps and helpline contacts.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="glass rounded-lg px-4 py-2 border border-red-500/20">
                <span className="text-sm font-semibold">India: 1930</span>
              </div>
              <div className="glass rounded-lg px-4 py-2 border border-red-500/20">
                <span className="text-sm font-semibold">cybercrime.gov.in</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
