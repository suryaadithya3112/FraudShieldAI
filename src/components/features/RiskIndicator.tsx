import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';
import type { RiskLevel, ConfidenceLevel } from '@/types';

interface RiskIndicatorProps {
  riskLevel: RiskLevel;
  confidenceLevel: ConfidenceLevel;
  size?: 'sm' | 'md' | 'lg';
}

export default function RiskIndicator({ riskLevel, confidenceLevel, size = 'md' }: RiskIndicatorProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const getRiskConfig = () => {
    switch (riskLevel) {
      case 'HIGH':
        return {
          icon: AlertCircle,
          color: 'risk-high',
          bgColor: 'risk-bg-high',
          label: 'HIGH RISK'
        };
      case 'MEDIUM':
        return {
          icon: AlertTriangle,
          color: 'risk-medium',
          bgColor: 'risk-bg-medium',
          label: 'MEDIUM RISK'
        };
      default:
        return {
          icon: Shield,
          color: 'risk-low',
          bgColor: 'risk-bg-low',
          label: 'LOW RISK'
        };
    }
  };

  const config = getRiskConfig();
  const Icon = config.icon;

  return (
    <div className="space-y-3">
      <div className={`glass rounded-lg p-4 border ${config.bgColor}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className={`${iconSize[size]} ${config.color}`} />
            <span className={`font-bold ${sizeClasses[size]} ${config.color}`}>
              {config.label}
            </span>
          </div>
          <div className={`px-3 py-1 rounded-full border ${config.bgColor} ${sizeClasses.sm}`}>
            <span className={`font-medium ${config.color}`}>
              {confidenceLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
