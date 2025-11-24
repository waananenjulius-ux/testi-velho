
import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import { AuthContext } from '../App';
import { Mail, Chrome, Apple, ChevronRight, Bike } from 'lucide-react';

interface LoginViewProps {
    onDismiss?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onDismiss }) => {
    const { t } = useContext(LanguageContext);
    const { login, isLoading } = useContext(AuthContext);

    const handleLogin = async (provider: 'google' | 'apple' | 'email') => {
        await login(provider);
        // In a real app, navigation happens via state change
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
                {/* Hero Image */}
                <div className="h-40 bg-blue-50 relative flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 bg-blue-500 opacity-10 pattern-grid-lg"></div>
                     <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 z-10">
                        <Bike size={40} />
                     </div>
                </div>

                <div className="p-8 pt-6">
                    <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2">{t('login_title')}</h2>
                    <p className="text-center text-gray-500 font-medium mb-8">{t('login_desc')}</p>

                    <div className="space-y-3">
                        {/* Google */}
                        <button 
                            onClick={() => handleLogin('google')}
                            disabled={isLoading}
                            className="w-full bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200 text-gray-900 font-bold py-3.5 px-4 rounded-xl flex items-center gap-3 transition-all relative group"
                        >
                            <div className="w-6 h-6 flex items-center justify-center">
                                {/* Google SVG Icon */}
                                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                            </div>
                            <span className="flex-1 text-left">{t('login_google')}</span>
                            {isLoading && <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>}
                        </button>

                        {/* Apple */}
                        <button 
                             onClick={() => handleLogin('apple')}
                             disabled={isLoading}
                             className="w-full bg-black text-white font-bold py-3.5 px-4 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition-colors"
                        >
                            <Apple size={24} fill="currentColor" />
                            <span className="flex-1 text-left">{t('login_apple')}</span>
                        </button>

                         {/* Email */}
                         <button 
                             onClick={() => handleLogin('email')}
                             disabled={isLoading}
                             className="w-full bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200 text-gray-900 font-bold py-3.5 px-4 rounded-xl flex items-center gap-3 transition-all"
                        >
                            <Mail size={22} className="text-gray-600" />
                            <span className="flex-1 text-left">{t('login_email')}</span>
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        {onDismiss && (
                            <button 
                                onClick={onDismiss}
                                className="text-blue-600 font-bold text-sm hover:underline flex items-center justify-center gap-1 mx-auto"
                            >
                                {t('login_later')} <ChevronRight size={16} />
                            </button>
                        )}
                        <p className="text-xs text-gray-400 mt-4">{t('login_terms')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
