import { ArrowLeft, Send, Bot, CheckCircle2, ExternalLink, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface TelegramBotProps {
  onBack: () => void;
}

const TELEGRAM_BOT_USERNAME = 'FraudShieldAI_Bot';
const TELEGRAM_DEEP_LINK = `https://t.me/${TELEGRAM_BOT_USERNAME}`;

export default function TelegramBot({ onBack }: TelegramBotProps) {
  const [botToken, setBotToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    if (botToken.trim()) {
      // Simulate connection
      setTimeout(() => {
        setIsConnected(true);
      }, 1000);
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(TELEGRAM_BOT_USERNAME);
  };

  const handleOpenTelegram = () => {
    window.open(TELEGRAM_DEEP_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Telegram Bot Integration</h2>
          <p className="text-sm text-muted-foreground">
            Connect FraudShield AI to Telegram for on-the-go scanning
          </p>
        </div>
      </div>

      {!isConnected ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Setup Telegram Bot
              </CardTitle>
              <CardDescription>
                Create and connect your Telegram bot to use FraudShield AI features via messaging
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step-by-step Guide */}
              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Create Bot with BotFather</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Open Telegram and search for <code className="px-2 py-1 bg-muted rounded">@BotFather</code>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Send <code className="px-2 py-1 bg-muted rounded">/newbot</code> and follow instructions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Copy Bot Token</h4>
                      <p className="text-sm text-muted-foreground">
                        After creating the bot, BotFather will provide an API token. Copy it.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Connect to FraudShield AI</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Paste your bot token below to connect
                      </p>
                      <div className="flex gap-2">
                        <Input
                          type="password"
                          placeholder="Enter Bot Token (e.g., 123456:ABC-DEF...)"
                          value={botToken}
                          onChange={(e) => setBotToken(e.target.value)}
                          className="font-mono text-sm"
                        />
                        <Button onClick={handleConnect} disabled={!botToken.trim()}>
                          <Send className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Info */}
              <div className="glass rounded-lg p-4 border border-primary/20">
                <h4 className="font-semibold mb-3 text-sm">Bot Capabilities:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Send SMS text for scam analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Share URLs for phishing detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Upload files for malware scanning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Get instant security analysis results</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="pt-6">
              <p className="text-sm text-center">
                <strong>🔒 Privacy Notice:</strong> Bot communication is encrypted by Telegram. 
                Scans are powered by public threat intelligence and behavioral analysis.
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <CheckCircle2 className="w-6 h-6" />
              Bot Connected Successfully!
            </CardTitle>
            <CardDescription>
              Your Telegram bot is now connected to FraudShield AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="glass rounded-lg p-6 text-center">
              <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Start Using Your Bot</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Open Telegram and start chatting with your bot
              </p>
              <Button onClick={handleOpenTelegram} size="lg" className="gap-2">
                Open in Telegram
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="glass rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2 text-center">Bot Username</p>
                <div className="flex items-center gap-2 justify-center">
                  <code className="text-primary font-mono text-lg">@{TELEGRAM_BOT_USERNAME}</code>
                  <Button variant="ghost" size="icon" onClick={handleCopyToken}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="glass rounded-lg p-4 text-left text-sm text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">Available Bot Commands:</p>
                <ul className="space-y-1 ml-4">
                  <li>• <code className="text-primary">/scan_url [URL]</code> - Scan a URL for phishing</li>
                  <li>• <code className="text-primary">/scan_sms [message]</code> - Analyze SMS text</li>
                  <li>• <code className="text-primary">/scan_file</code> - Send file to scan APK/PDF/ZIP</li>
                  <li>• <code className="text-primary">/otp_check [type]</code> - Check OTP risk</li>
                  <li>• <code className="text-primary">/help</code> - Show all commands</li>
                </ul>
              </div>

              <div className="glass rounded-lg p-4 border border-yellow-500/20">
                <p className="text-xs text-center text-yellow-500">
                  ℹ️ This is a demonstration interface. The actual bot needs to be created via @BotFather on Telegram.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => setIsConnected(false)} variant="outline">
                Disconnect Bot
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
