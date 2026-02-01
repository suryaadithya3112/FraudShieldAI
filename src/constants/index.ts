export const SCAM_KEYWORDS = [
  'otp', 'verify', 'urgent', 'suspend', 'expire', 'confirm', 'reward', 'congratulations',
  'winner', 'prize', 'claim', 'click here', 'limited time', 'act now', 'free',
  'bonus', 'cashback', 'refund', 'kyc', 'account blocked', 'unauthorized',
  'crypto', 'bitcoin', 'investment', 'profit', 'guaranteed', 'roi'
];

export const BANK_KEYWORDS = [
  'bank', 'sbi', 'hdfc', 'icici', 'axis', 'kotak', 'pnb', 'canara',
  'debit card', 'credit card', 'atm', 'upi', 'account'
];

export const GOVERNMENT_KEYWORDS = [
  'aadhaar', 'pan card', 'passport', 'government', 'tax', 'refund',
  'irdai', 'epfo', 'uidai', 'ministry'
];

export const SUSPICIOUS_TLDS = [
  '.vip', '.xyz', '.top', '.club', '.site', '.online', '.win', '.loan',
  '.gq', '.ml', '.cf', '.tk', '.ga', '.work', '.download'
];

export const DANGEROUS_PERMISSIONS = [
  'READ_SMS',
  'SEND_SMS',
  'RECEIVE_SMS',
  'READ_CONTACTS',
  'WRITE_CONTACTS',
  'CALL_PHONE',
  'READ_CALL_LOG',
  'SYSTEM_ALERT_WINDOW',
  'BIND_ACCESSIBILITY_SERVICE',
  'REQUEST_INSTALL_PACKAGES',
  'PACKAGE_USAGE_STATS'
];

export const EMERGENCY_HELPLINES = [
  { name: 'India Cybercrime Helpline', number: '1930', url: 'tel:1930' },
  { name: 'National Cyber Crime Reporting Portal', url: 'https://cybercrime.gov.in', external: true },
  { name: 'Women Helpline (India)', number: '181', url: 'tel:181' },
  { name: 'Senior Citizen Helpline (India)', number: '14567', url: 'tel:14567' },
  { name: 'Banking Fraud Helpline (India)', number: '155260', url: 'tel:155260' },
  { name: 'FTC Scam Reporting (US)', url: 'https://reportfraud.ftc.gov', external: true },
  { name: 'Action Fraud (UK)', url: 'https://www.actionfraud.police.uk', external: true },
  { name: 'ACCC Scamwatch (Australia)', url: 'https://www.scamwatch.gov.au', external: true }
];

export const EMERGENCY_ACTIONS = [
  'Freeze bank account immediately',
  'Change UPI PIN and all passwords',
  'Report incident to cybercrime portal',
  'Do NOT share any OTP or password',
  'Do NOT click on any more links',
  'Contact your bank fraud department',
  'Take screenshots of all communications'
];
