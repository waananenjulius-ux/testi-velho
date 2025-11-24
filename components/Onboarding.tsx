
import React, { useState, useContext } from 'react';
import { BikeStats, BikeCategory, AIAnalysis } from '../types';
import { ArrowRight, Check, Gauge, Calendar, Map, Clock, Sparkles } from 'lucide-react';
import { analyzeBikeCondition } from '../services/geminiService';
import { LanguageContext } from '../App';

interface OnboardingProps {
    bike: BikeCategory;
    onComplete: (stats: BikeStats, analysis: AIAnalysis) => void;
    onSkip: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ bike, onComplete, onSkip }) => {
    const { t, language } = useContext(LanguageContext);
    const [step, setStep] = useState(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [stats, setStats] = useState<BikeStats>({
        kilometers: 0,
        lastServiceDate: new Date().toISOString().split('T')[0],
        ridingConditions: 'mixed',
        weeklyHours: 2
    });

    const handleNext = async () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Finish and Analyze
            setIsAnalyzing(true);
            const analysis = await analyzeBikeCondition(bike.name, stats, language);
            setIsAnalyzing(false);
            onComplete(stats, analysis);
        }
    };

    const updateStats = (key: keyof BikeStats, value: any) => {
        setStats(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden relative">
                
                {/* Progress Bar */}
                <div className="h-1.5 bg-gray-100 w-full">
                    <div 
                        className="h-full bg-pink-700 transition-all duration-500" 
                        style={{ width: isAnalyzing ? '100%' : `${(step / 3) * 100}%` }} 
                    />
                </div>

                <div className="p-8 md:p-10">
                    {isAnalyzing ? (
                        <div className="text-center py-12 animate-fade-in">
                            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                                <Sparkles className="text-pink-700 animate-pulse" size={40} />
                                <div className="absolute inset-0 border-4 border-pink-700/20 rounded-full animate-spin-slow"></div>
                            </div>
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 uppercase">{t('btn_analyzing')}</h2>
                            <p className="text-gray-500">{t('analyzing_desc')}</p>
                        </div>
                    ) : (
                        <>
                            {/* Step 1: Usage */}
                            {step === 1 && (
                                <div className="animate-fade-in">
                                    <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-700 px-3 py-1 rounded-none text-xs font-bold uppercase tracking-wide mb-6 border border-pink-200">
                                        <Gauge size={14} /> {t('onboarding_step')} 1/3
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3 uppercase">{t('onboarding_km_title')}</h2>
                                    <p className="text-gray-500 mb-8">{t('onboarding_km_desc')}</p>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">{t('label_est_km')}</label>
                                            <div className="relative">
                                                <input 
                                                    type="number" 
                                                    value={stats.kilometers || ''}
                                                    onChange={(e) => updateStats('kilometers', Number(e.target.value))}
                                                    className="w-full bg-gray-50 border border-gray-300 rounded-none px-5 py-4 text-lg font-bold text-gray-900 focus:outline-none focus:border-pink-700 focus:ring-0 transition-all"
                                                    placeholder="500"
                                                />
                                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold uppercase">km</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">{t('label_hours_week')}</label>
                                            <div className="relative">
                                                <input 
                                                    type="number" 
                                                    value={stats.weeklyHours || ''}
                                                    onChange={(e) => updateStats('weeklyHours', Number(e.target.value))}
                                                    className="w-full bg-gray-50 border border-gray-300 rounded-none px-5 py-4 text-lg font-bold text-gray-900 focus:outline-none focus:border-pink-700 focus:ring-0 transition-all"
                                                    placeholder="2"
                                                />
                                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold uppercase">h</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Conditions */}
                            {step === 2 && (
                                <div className="animate-fade-in">
                                    <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-700 px-3 py-1 rounded-none text-xs font-bold uppercase tracking-wide mb-6 border border-pink-200">
                                        <Map size={14} /> {t('onboarding_step')} 2/3
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3 uppercase">{t('onboarding_cond_title')}</h2>
                                    <p className="text-gray-500 mb-8">{t('onboarding_cond_desc')}</p>
                                    
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { id: 'muddy', label: t('cond_muddy'), desc: t('cond_muddy_desc') },
                                            { id: 'dusty', label: t('cond_dusty'), desc: t('cond_dusty_desc') },
                                            { id: 'road', label: t('cond_road'), desc: t('cond_road_desc') },
                                            { id: 'mixed', label: t('cond_mixed'), desc: t('cond_mixed_desc') }
                                        ].map((opt) => (
                                            <button 
                                                key={opt.id}
                                                onClick={() => updateStats('ridingConditions', opt.id)}
                                                className={`p-4 rounded-lg border-2 text-left transition-all ${
                                                    stats.ridingConditions === opt.id 
                                                    ? 'border-pink-700 bg-pink-50' 
                                                    : 'border-transparent bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="font-bold text-gray-900 uppercase">{opt.label}</div>
                                                <div className="text-sm text-gray-500 font-medium">{opt.desc}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Last Service */}
                            {step === 3 && (
                                <div className="animate-fade-in">
                                    <div className="inline-flex items-center gap-2 bg-pink-50 text-pink-700 px-3 py-1 rounded-none text-xs font-bold uppercase tracking-wide mb-6 border border-pink-200">
                                        <Calendar size={14} /> {t('onboarding_step')} 3/3
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3 uppercase">{t('onboarding_date_title')}</h2>
                                    <p className="text-gray-500 mb-8">{t('onboarding_date_desc')}</p>
                                    
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">{t('label_date')}</label>
                                        <input 
                                            type="date" 
                                            value={stats.lastServiceDate}
                                            onChange={(e) => updateStats('lastServiceDate', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-300 rounded-none px-5 py-4 text-lg font-bold text-gray-900 focus:outline-none focus:border-pink-700 focus:ring-0 transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mt-10 flex items-center gap-4">
                                <button 
                                    onClick={onSkip}
                                    className="px-6 py-4 font-bold text-gray-500 hover:text-gray-800 transition-colors uppercase tracking-wide"
                                >
                                    {t('btn_skip')}
                                </button>
                                <button 
                                    onClick={handleNext}
                                    className="flex-1 bg-pink-700 text-white py-4 rounded-lg font-bold text-lg shadow-md hover:bg-pink-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                                >
                                    {step === 3 ? t('btn_done') : t('btn_next')} <ArrowRight size={20} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
