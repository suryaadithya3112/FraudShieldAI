import { useState, useRef, useEffect } from 'react';
import { Bot, Send, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Message } from '@/types';

interface AIAssistantProps {
  onBack: () => void;
}

export default function AIAssistant({ onBack }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hello! I'm FraudShield AI Assistant. I'm here to help you understand cybersecurity threats and stay safe online. Ask me anything about scams, fraud prevention, or how to verify suspicious messages.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (will be replaced with real OnSpace AI)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = generateResponse(input);
    
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    }]);
    setIsTyping(false);
  };

  const generateResponse = (question: string): string => {
    const q = question.toLowerCase();

    if (q.includes('otp') || q.includes('one time password')) {
      return "🔐 OTP Security:\n\nNever share your OTP with anyone - not even customer support! OTPs are meant only for you to complete actions YOU initiated.\n\n⚠️ Common OTP Scams:\n- Fake delivery calls asking for OTP\n- 'Bank officials' requesting verification OTP\n- Prize/reward schemes needing OTP confirmation\n\n✅ Safe Practice:\nOnly enter OTP on official apps/websites you trust, and only for actions you started yourself.";
    }

    if (q.includes('phishing') || q.includes('fake link')) {
      return "🎣 Phishing Protection:\n\nPhishing attacks trick you into revealing sensitive data by impersonating trusted entities.\n\n🚩 Red Flags:\n- Urgent/threatening language\n- Shortened or suspicious URLs\n- Requests for passwords/OTPs\n- Poor grammar and spelling\n- Too-good-to-be-true offers\n\n✅ Verify by:\n- Checking sender's email/number\n- Hovering over links (don't click!)\n- Contacting company through official channels\n- Using our URL scanner tool";
    }

    if (q.includes('bank') || q.includes('payment')) {
      return "🏦 Banking Security:\n\nBanks will NEVER:\n- Ask for your password, PIN, or OTP\n- Send links to 'verify' your account\n- Call asking for full card numbers\n- Threaten immediate account suspension\n\n✅ What to do:\n- Use official banking apps only\n- Enable transaction alerts\n- Verify suspicious communications by calling bank's official number\n- Report fraudulent messages immediately\n\n🚨 If compromised:\n1. Call bank immediately\n2. Block cards\n3. Change all passwords\n4. File police complaint";
    }

    if (q.includes('scam') || q.includes('fraud')) {
      return "🛡️ Common Scam Types:\n\n1. **OTP Fraud**: Tricking you into sharing OTPs\n2. **Phishing**: Fake websites stealing credentials\n3. **Investment Scams**: Guaranteed high returns\n4. **Job Scams**: Fake job offers requiring payment\n5. **Romance Scams**: Fake relationships asking for money\n6. **Tech Support Scams**: Fake virus alerts\n\n✅ General Rule:\nIf it sounds too good to be true, it probably is. Always verify through official channels.";
    }

    if (q.includes('safe') || q.includes('protect')) {
      return "🔒 Stay Safe Online:\n\n✅ Essential Practices:\n- Use strong, unique passwords\n- Enable 2-factor authentication\n- Keep software updated\n- Don't click suspicious links\n- Verify before sharing information\n- Use secure networks (avoid public WiFi for banking)\n- Regularly monitor bank statements\n\n🛠️ Use FraudShield Tools:\n- SMS Scanner for suspicious messages\n- URL Scanner before clicking links\n- File Scanner for downloads\n- OTP Risk Checker before sharing";
    }

    return `I understand you're asking about: "${question}"\n\nI'm here to help with:\n- Explaining scam tactics\n- Verifying suspicious messages\n- Understanding OTP security\n- Identifying phishing attempts\n- General fraud prevention tips\n\nCould you be more specific about what you'd like to know? Or try using our scanning tools:\n- SMS Scam Analyzer\n- URL Phishing Scanner\n- File Malware Scanner\n- OTP Risk Checker`;
  };

  const quickQuestions = [
    "What is OTP fraud?",
    "How to identify phishing links?",
    "Are investment schemes scams?",
    "What to do if I shared my OTP?"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">FraudShield AI Assistant</h2>
          <p className="text-sm text-muted-foreground">
            Ask anything about scams, fraud prevention, and online safety
          </p>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="relative">
              <Bot className="w-6 h-6 text-primary" />
              <div className="absolute inset-0 blur-md bg-primary/30 animate-pulse" />
            </div>
            AI Security Advisor
          </CardTitle>
          <CardDescription>
            Real-time fraud prevention guidance powered by AI
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'glass border border-border'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <span className="text-xs opacity-50 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="glass border border-border rounded-lg p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        <div className="border-t p-4 space-y-3">
          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInput(question);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              placeholder="Ask about scams, fraud prevention, or online safety..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <AlertTriangle className="w-3 h-3" />
            <span>AI responses are advisory only. Always verify through official channels.</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
