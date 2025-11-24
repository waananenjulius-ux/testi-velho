import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, ShieldCheck, Bike, Zap } from 'lucide-react';
import { LanguageContext } from '../App';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  const heroImage = "https://images.unsplash.com/photo-1599839462529-679905908389?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="min-h-screen flex flex-col bg-white pt-24">
      
      {/* Hero Section */}
      <div className="w-full bg-lime-300 border-b-2 border-black py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                  <h1 className="text-6xl md:text-8xl font-black text-black leading-[0.9] tracking-tighter mb-8 uppercase">
                      We Fix <br/> Bikes.
                  </h1>
                  <p className="text-xl md:text-2xl text-black font-medium max-w-md mb-10 border-l-4 border-black pl-6 leading-tight">
                      {t('landing_desc')}
                  </p>
                  
                  <button 
                      onClick={() => navigate('/select-bike')}
                      className="group relative inline-flex items-center gap-4 bg-black text-white px-8 py-5 text-lg font-bold uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all"
                  >
                      {t('landing_cta')}
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
              </div>
              <div className="relative">
                  <div className="w-full aspect-[4/3] bg-white border-2 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <img 
                          src={heroImage} 
                          alt="Workshop" 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                  </div>
              </div>
          </div>
      </div>

      {/* Stats / Features Bar */}
      <div className="border-b-2 border-black bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
              <div className="p-8 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                  <Bike size={32} strokeWidth={1.5} />
                  <div>
                      <h3 className="text-xl font-bold uppercase mb-2">{t('feature_all_models')}</h3>
                      <p className="text-sm text-gray-600">All categories covered.</p>
                  </div>
              </div>
              <div className="p-8 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                  <Zap size={32} strokeWidth={1.5} />
                  <div>
                      <h3 className="text-xl font-bold uppercase mb-2">{t('feature_ai_support')}</h3>
                      <p className="text-sm text-gray-600">Powered by Gemini AI.</p>
                  </div>
              </div>
              <div className="p-8 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                  <ShieldCheck size={32} strokeWidth={1.5} />
                  <div>
                      <h3 className="text-xl font-bold uppercase mb-2">{t('feature_free')}</h3>
                      <p className="text-sm text-gray-600">No hidden costs.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Manifesto Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <h2 className="text-4xl font-black uppercase tracking-tight">
                  Maintenance <br/> Simplified.
              </h2>
              <div className="space-y-6 text-lg font-medium leading-relaxed">
                  <p>
                      Velho is not just an app. It is a tool designed to empower cyclists. 
                      We believe that mechanical independence leads to better riding experiences.
                  </p>
                  <p>
                      Select your bike, diagnose issues, and get back on the road. 
                      Professional guidance, simplified for everyone.
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
};