import { AlertTriangle, Phone, ExternalLink, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EMERGENCY_HELPLINES, EMERGENCY_ACTIONS } from '@/constants';

export default function EmergencyMode() {
  return (
    <Card className="border-red-500 bg-red-500/5 animate-pulse-slow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <CardTitle className="text-red-500">🚨 Emergency Fraud Response Mode Activated</CardTitle>
            <CardDescription>Take immediate action to protect yourself</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Emergency Helplines */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Phone className="w-5 h-5 text-red-500" />
            Emergency Helplines
          </h3>
          <div className="space-y-2">
            {EMERGENCY_HELPLINES.map((helpline, index) => (
              <a
                key={index}
                href={helpline.url}
                target={helpline.external ? "_blank" : undefined}
                rel={helpline.external ? "noopener noreferrer" : undefined}
                className="glass rounded-lg p-3 flex items-center justify-between hover:bg-red-500/5 transition-colors cursor-pointer group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">
                  {helpline.name}
                </span>
                {helpline.number ? (
                  <span className="text-red-500 font-bold text-lg group-hover:underline">
                    {helpline.number}
                  </span>
                ) : (
                  <div className="text-primary flex items-center gap-1 group-hover:underline">
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Emergency Actions */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            Immediate Actions Required
          </h3>
          <div className="space-y-2">
            {EMERGENCY_ACTIONS.map((action, index) => (
              <div
                key={index}
                className="glass rounded-lg p-3 flex items-start gap-3 hover:bg-red-500/5 transition-colors"
              >
                <div className="w-6 h-6 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-500 font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-sm">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Warning */}
        <div className="glass rounded-lg p-4 border border-red-500/20">
          <p className="text-sm text-center font-medium">
            ⚠️ If you have already shared sensitive information, act NOW. Time is critical in fraud prevention.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
