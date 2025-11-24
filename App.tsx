
import React, { useState, createContext } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { BikeCategory, MaintenanceTask, BikeStats, AIAnalysis, Language, LanguageContextType, AuthContextType } from './types';
import { translations } from './translations';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { BikeSelector } from './components/BikeSelector';
import { Dashboard } from './components/Dashboard';
import { GuideView } from './components/GuideView';
import { ChecklistsView } from './components/ChecklistsView';
import { ServiceLogView } from './components/ServiceLogView';
import { Onboarding } from './components/Onboarding';
import { GlobalChat } from './components/GlobalChat';
import { GlobalFeedback } from './components/GlobalFeedback';

// Create Contexts
export const LanguageContext = createContext<LanguageContextType>({
    language: 'fi',
    setLanguage: () => {},
    t: () => ''
});

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: async () => {},
    isLoading: false
});

// Main App Component wrapper for Router
const AppContent: React.FC = () => {
  const [selectedBike, setSelectedBike] = useState<BikeCategory | null>(null);
  const [currentTask, setCurrentTask] = useState<MaintenanceTask | null>(null);
  const [bikeStats, setBikeStats] = useState<BikeStats | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleBikeSelect = (bike: BikeCategory) => {
    setSelectedBike(bike);
    // If we haven't set stats yet, show onboarding
    if (!bikeStats) {
        setShowOnboarding(true);
    } else {
        navigate('/dashboard');
    }
  };

  const handleOnboardingComplete = (stats: BikeStats, analysis: AIAnalysis) => {
      setBikeStats(stats);
      setAiAnalysis(analysis);
      setShowOnboarding(false);
      navigate('/dashboard');
  };

  const handleOnboardingSkip = () => {
      setShowOnboarding(false);
      navigate('/dashboard');
  };

  const handleTaskSelect = (task: MaintenanceTask) => {
    setCurrentTask(task);
    navigate('/guide');
  };

  const handleBack = () => {
    const path = location.pathname;
    
    if (path.includes('guide')) {
      setCurrentTask(null);
      navigate('/dashboard');
    } else if (path.includes('dashboard')) {
      setSelectedBike(null);
      navigate('/select-bike');
    } else if (path.includes('select-bike')) {
      navigate('/');
    } else if (path.includes('service-log') || path.includes('checklists')) {
      navigate('/dashboard');
    }
  };

  const handleComplete = () => {
    setCurrentTask(null);
    navigate('/dashboard');
  };

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header 
        showBack={!isHome} 
        onBack={handleBack} 
        title={currentTask ? currentTask.title : (selectedBike ? selectedBike.name : "Velho")}
      />
      
      {showOnboarding && selectedBike && (
          <Onboarding 
            bike={selectedBike} 
            onComplete={handleOnboardingComplete}
            onSkip={handleOnboardingSkip}
          />
      )}
      
      <main className="h-full">
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage />} 
          />
          <Route 
            path="/select-bike" 
            element={<BikeSelector onSelect={handleBikeSelect} />} 
          />
          <Route 
            path="/dashboard" 
            element={
              selectedBike ? (
                <Dashboard 
                  selectedBike={selectedBike} 
                  onSelectTask={handleTaskSelect}
                  aiAnalysis={aiAnalysis}
                  bikeStats={bikeStats}
                />
              ) : (
                <Navigate to="/select-bike" replace />
              )
            } 
          />
          <Route 
            path="/guide" 
            element={
              selectedBike && currentTask ? (
                <GuideView 
                  bike={selectedBike} 
                  task={currentTask} 
                  onComplete={handleComplete}
                  bikeStats={bikeStats || undefined}
                />
              ) : (
                <Navigate to="/select-bike" replace />
              )
            } 
          />
          <Route 
             path="/service-log" 
             element={selectedBike ? <ServiceLogView bikeStats={bikeStats || undefined} /> : <Navigate to="/select-bike" replace />} 
          />
          <Route 
             path="/checklists" 
             element={selectedBike ? <ChecklistsView /> : <Navigate to="/select-bike" replace />} 
          />
        </Routes>
      </main>

      {/* Global Elements */}
      <GlobalChat />
      <GlobalFeedback />
    </div>
  );
};

function App() {
  const [language, setLanguageState] = useState<Language>('fi');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const t = (key: string): string => {
      return translations[language][key] || key;
  };

  const login = async (provider: 'google' | 'apple' | 'email') => {
    setIsLoading(true);
    // Mock login
    await new Promise(resolve => setTimeout(resolve, 800));
    setUser({ id: 'demo_user', name: 'Demo User' });
    setIsLoading(false);
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageState, t }}>
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            <HashRouter>
                <AppContent />
            </HashRouter>
        </AuthContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
