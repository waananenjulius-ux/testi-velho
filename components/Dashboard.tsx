import React, { useContext } from 'react';
import { BikeCategory, MaintenanceTask, AIAnalysis, BikeStats } from '../types';
import { Droplets, Settings, Activity, Repeat, AlertCircle, Clock, BookOpen, ClipboardList, Plus, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import { getTasks } from '../data';

interface DashboardProps {
  selectedBike: BikeCategory;
  onSelectTask: (task: MaintenanceTask) => void;
  aiAnalysis?: AIAnalysis | null;
  bikeStats?: BikeStats | null;
}

const getIcon = (name: string) => {
    switch(name) {
        case 'Droplets': return <Droplets size={24} strokeWidth={1.5} />;
        case 'Settings': return <Settings size={24} strokeWidth={1.5} />;
        case 'Activity': return <Activity size={24} strokeWidth={1.5} />;
        case 'Repeat': return <Repeat size={24} strokeWidth={1.5} />;
        default: return <Settings size={24} strokeWidth={1.5} />;
    }
};

export const Dashboard: React.FC<DashboardProps> = ({ selectedBike, onSelectTask, aiAnalysis, bikeStats }) => {
  const navigate = useNavigate();
  const { t, language } = useContext(LanguageContext);
  const tasks = getTasks(language);

  return (
    <div className="pt-24 min-h-screen bg-white">
      
      {/* Header Info Bar */}
      <div className="border-b-2 border-black bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h2 className="text-4xl font-black uppercase tracking-tight text-black mb-2">{selectedBike.name}</h2>
                <div className="flex gap-4 text-sm font-mono uppercase tracking-wide">
                    <span>{bikeStats ? `${bikeStats.kilometers} KM` : '0 KM'}</span>
                    <span className="text-gray-400">/</span>
                    <span>{bikeStats?.ridingConditions || 'Mixed'}</span>
                </div>
            </div>
            <button 
                 onClick={() => navigate('/select-bike')}
                 className="px-6 py-3 border-2 border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
                {t('change')}
            </button>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* AI Analysis (If available) */}
        {aiAnalysis && (
            <div className="mb-12 border-2 border-black bg-lime-300 p-8">
                <div className="flex items-center gap-2 mb-4">
                    <Star size={20} className="fill-black" />
                    <span className="text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5">{t('ai_analysis_title')}</span>
                </div>
                <p className="text-3xl font-bold leading-tight mb-6 uppercase">"{aiAnalysis.summary}"</p>
                <div className="inline-block bg-black text-white px-4 py-1 text-sm font-bold uppercase">
                    {aiAnalysis.urgency === 'high' ? t('urgency_high') : t('urgency_low')}
                </div>
            </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-0 border-2 border-black mb-12">
            <button onClick={() => navigate('/service-log')} className="p-6 md:p-8 hover:bg-gray-100 text-left border-r-2 border-black group">
                <BookOpen size={32} strokeWidth={1} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-lg uppercase block">{t('btn_service_log')}</span>
            </button>
            <button onClick={() => navigate('/checklists')} className="p-6 md:p-8 hover:bg-gray-100 text-left group">
                <ClipboardList size={32} strokeWidth={1} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-lg uppercase block">{t('btn_checklists')}</span>
            </button>
        </div>

        {/* Tasks Grid */}
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">{t('tasks_title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task) => {
                const isRecommended = aiAnalysis?.recommendedTasks.includes(task.id);
                return (
                    <button 
                        key={task.id}
                        onClick={() => onSelectTask(task)}
                        className={`relative p-8 border-2 border-black text-left transition-all hover:bg-black hover:text-white group ${isRecommended ? 'bg-gray-50' : 'bg-white'}`}
                    >
                        {isRecommended && (
                            <div className="absolute top-0 right-0 bg-lime-300 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider border-l-2 border-b-2 border-black">
                                {t('recommendation')}
                            </div>
                        )}
                        
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 border-2 border-black bg-white text-black group-hover:bg-lime-300 transition-colors">
                                {getIcon(task.icon)}
                            </div>
                            <Plus size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <h4 className="font-black text-2xl uppercase mb-2">{task.title}</h4>
                        <p className="text-sm font-medium opacity-60 group-hover:opacity-80 mb-4">{task.description}</p>
                        
                        <div className="flex gap-2 text-xs font-mono uppercase">
                            <span className="border border-current px-2 py-1">{task.duration}</span>
                            <span className="border border-current px-2 py-1">{task.difficulty}</span>
                        </div>
                    </button>
                );
            })}
        </div>
      </div>
    </div>
  );
};