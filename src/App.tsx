import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Dashboard from '@/pages/Dashboard';
import SMSScanner from '@/pages/SMSScanner';
import OTPChecker from '@/pages/OTPChecker';
import URLScanner from '@/pages/URLScanner';
import FileScanner from '@/pages/FileScanner';
import TelegramBot from '@/pages/TelegramBot';
import AIAssistant from '@/pages/AIAssistant';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  const renderPage = () => {
    const handleBack = () => setCurrentPage('dashboard');

    switch (currentPage) {
      case 'sms':
        return <SMSScanner onBack={handleBack} />;
      case 'otp':
        return <OTPChecker onBack={handleBack} />;
      case 'url':
        return <URLScanner onBack={handleBack} />;
      case 'file':
        return <FileScanner onBack={handleBack} />;
      case 'telegram':
        return <TelegramBot onBack={handleBack} />;
      case 'ai':
        return <AIAssistant onBack={handleBack} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
