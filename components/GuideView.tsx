import React, { useState, useEffect, useContext } from 'react';
import { BikeCategory, MaintenanceTask, GuideStep, BikeStats } from '../types';
import { Check, ArrowRight, ArrowLeft, AlertTriangle, Wrench, Eye, RotateCw, ThumbsUp, MessageSquarePlus } from 'lucide-react';
import { generateTailoredSteps } from '../services/geminiService';
import { LanguageContext } from '../App';

interface GuideViewProps {
  bike: BikeCategory;
  task: MaintenanceTask;
  onComplete: () => void;
  bikeStats?: BikeStats;
}

// Keep Image Mapping Logic (same as before, just removed for brevity in this prompt, assuming it imports/uses same logic or keep it if it was inline)
// ... (Insert image logic from previous file content here if it was inline, or keep it)
// For this rewrite, I will assume the image logic helper functions are present or imported.
// RE-INCLUDING IMAGE LOGIC FOR COMPLETENESS:

const SPECIFIC_STEP_IMAGES: Record<string, Record<number, string>> = {
    'wash': {
        1: "https://images.unsplash.com/photo-1620802051678-774f74d08b39?auto=format&fit=crop&q=80&w=1000",
        2: "https://images.unsplash.com/photo-1563618147885-3e2882894396?auto=format&fit=crop&q=80&w=1000",
        3: "https://images.unsplash.com/photo-1635338146318-7b9c9f6a7d73?auto=format&fit=crop&q=80&w=1000",
        4: "https://images.unsplash.com/photo-1563618147885-3e2882894396?auto=format&fit=crop&q=80&w=1000",
        5: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=1000"
    },
    'chain_lube': {
        1: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=1000",
        2: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000",
        3: "https://images.unsplash.com/photo-1485965120184-e224f7a1adb1?auto=format&fit=crop&q=80&w=1000",
        4: "https://images.unsplash.com/photo-1530143311094-34d807799e8f?auto=format&fit=crop&q=80&w=1000"
    },
    'derailleur_adjust': {
        1: "https://images.unsplash.com/photo-1617135804825-502a3a5f782f?auto=format&fit=crop&q=80&w=1000",
        2: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000",
        3: "https://images.unsplash.com/photo-1588611910769-23c3b06e8c74?auto=format&fit=crop&q=80&w=1000",
    },
    'brake_check': {
        1: "https://images.unsplash.com/photo-1620802051678-774f74d08b39?auto=format&fit=crop&q=80&w=1000",
        2: "https://images.unsplash.com/photo-1532585292728-176c9c64cc49?auto=format&fit=crop&q=80&w=1000",
    },
    'tire_change': {
        1: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=1000",
        2: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=1000",
        3: "https://images.unsplash.com/photo-1626294763132-756184a446a8?auto=format&fit=crop&q=80&w=1000",
    }
};

const IMAGE_LIBRARY: Record<string, string> = {
    washing: "https://images.unsplash.com/photo-1563618147885-3e2882894396?auto=format&fit=crop&q=80&w=1000", 
    cleaning_cloth: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=1000",
    chain_oil: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000",
    drivetrain: "https://images.unsplash.com/photo-1485965120184-e224f7a1adb1?auto=format&fit=crop&q=80&w=1000",
    wrenching: "https://images.unsplash.com/photo-1588611910769-23c3b06e8c74?auto=format&fit=crop&q=80&w=1000",
    adjusting: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=1000",
    tires: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=1000",
    brakes: "https://images.unsplash.com/photo-1620802051678-774f74d08b39?auto=format&fit=crop&q=80&w=1000",
    workshop: "https://images.unsplash.com/photo-1609100803450-482f763261a2?auto=format&fit=crop&q=80&w=1000",
    stand: "https://images.unsplash.com/photo-1617135804825-502a3a5f782f?auto=format&fit=crop&q=80&w=1000",
};

const getSmartImage = (taskId: string, stepId: number, title: string, desc: string): string => {
    if (SPECIFIC_STEP_IMAGES[taskId] && SPECIFIC_STEP_IMAGES[taskId][stepId]) {
        return SPECIFIC_STEP_IMAGES[taskId][stepId];
    }
    const text = (title + " " + desc).toLowerCase();
    if (text.includes("pesu") || text.includes("wash") || text.includes("clean")) return IMAGE_LIBRARY.washing;
    if (text.includes("kuivaa") || text.includes("dry") || text.includes("wipe")) return IMAGE_LIBRARY.cleaning_cloth;
    if (text.includes("öljy") || text.includes("lube") || text.includes("oil")) return IMAGE_LIBRARY.chain_oil;
    if (text.includes("ratas") || text.includes("gear")) return IMAGE_LIBRARY.drivetrain;
    if (text.includes("ruuvi") || text.includes("screw") || text.includes("wrench")) return IMAGE_LIBRARY.wrenching;
    if (text.includes("rengas") || text.includes("tire")) return IMAGE_LIBRARY.tires;
    if (text.includes("jarru") || text.includes("brake")) return IMAGE_LIBRARY.brakes;
    if (text.includes("valmistelu") || text.includes("prepare")) return IMAGE_LIBRARY.stand;
    
    return IMAGE_LIBRARY.workshop;
};

const getInitialSteps = (task: MaintenanceTask, bike: BikeCategory, language: string): GuideStep[] => {
    const isFi = language === 'fi';
    const baseSteps = [
        { 
            id: 1, 
            title: isFi ? 'Valmistelu' : 'Preparation', 
            description: isFi ? 'Aseta pyörä tukevasti huoltotelineeseen tai käännä se varovasti ylösalaisin pehmeälle alustalle.' : 'Secure the bike in a stand or flip it gently upside down on a soft surface.', 
            tip: isFi ? 'Varmista hyvä valaistus.' : 'Ensure good lighting.' 
        },
        { 
            id: 2, 
            title: isFi ? 'Puhdistus' : 'Cleaning', 
            description: isFi ? `Puhdista ${task.title.toLowerCase()} liasta ja pölystä rätillä.` : `Clean the ${task.title.toLowerCase()} of dirt and dust with a rag.`, 
            tip: isFi ? 'Likainen osa on vaikea säätää.' : 'Dirt makes adjusting hard.'
        },
        { 
            id: 3, 
            title: isFi ? 'Tarkistus' : 'Inspection', 
            description: isFi ? 'Tarkista osan yleiskunto silmämääräisesti vaurioiden varalta.' : 'Visually inspect the part for damage.' 
        },
        { 
            id: 4, 
            title: isFi ? 'Toimenpide' : 'Action', 
            description: isFi ? `Suorita varsinainen ${task.title.toLowerCase()}. Seuraa tarkasti ohjeita.` : `Perform the actual ${task.title.toLowerCase()}. Follow instructions carefully.`
        },
        { 
            id: 5, 
            title: isFi ? 'Viimeistely' : 'Finishing', 
            description: isFi ? 'Tarkista kireydet ja testaa toiminta turvallisessa ympäristössä.' : 'Check torques and test function in a safe area.' 
        }
    ];

    return baseSteps.map(step => {
        const imgUrl = getSmartImage(task.id, step.id, step.title, step.description);
        return { ...step, imageUrl: imgUrl };
    });
};

export const GuideView: React.FC<GuideViewProps> = ({ bike, task, onComplete, bikeStats }) => {
  const { t, language } = useContext(LanguageContext);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<GuideStep[]>(() => getInitialSteps(task, bike, language));
  const [imgError, setImgError] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState<Record<number, boolean>>({});

  useEffect(() => {
      setSteps(getInitialSteps(task, bike, language));
  }, [language, task, bike]);

  useEffect(() => {
      setImgError(false);
  }, [currentStepIndex]);

  useEffect(() => {
      const fetchSteps = async () => {
          const aiSteps = await generateTailoredSteps(bike.name, task.title, language);
          if (aiSteps && aiSteps.length > 0) {
              const mappedSteps = aiSteps.map((s: any, i: number) => {
                  const stepId = i + 1;
                  const imgUrl = getSmartImage(task.id, stepId, s.title || '', s.description || '');
                  return {
                      id: stepId,
                      title: s.title || `${t('step')} ${stepId}`,
                      description: s.description || s.text || '',
                      tip: s.tip,
                      imageUrl: imgUrl
                  };
              });
              setSteps(mappedSteps);
          }
      };
      fetchSteps();
  }, [bike, task.title, task.id, language, t]);

  const currentStep = steps[currentStepIndex];

  return (
    <div className="pt-24 pb-24 min-h-screen flex flex-col bg-white">
      
      {/* Progress Bar - Thin Black Line */}
      <div className="fixed top-[58px] left-0 right-0 z-40 bg-white">
        <div className="flex h-1.5 w-full">
            {steps.map((_, idx) => (
                <div 
                    key={idx}
                    className={`flex-1 transition-colors duration-300 border-r border-white ${idx <= currentStepIndex ? 'bg-black' : 'bg-gray-200'}`}
                />
            ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start h-full">
            
            {/* Visuals */}
            <div className="order-2 lg:order-1 lg:sticky lg:top-32">
                <div className="relative w-full aspect-[4/3] bg-gray-100 border-2 border-black">
                    {currentStep.imageUrl && !imgError ? (
                        <img 
                            key={`step-img-${currentStep.id}`} 
                            src={currentStep.imageUrl} 
                            alt={currentStep.title} 
                            className="w-full h-full object-cover"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                            <Wrench size={64} strokeWidth={1} className="text-gray-300" />
                        </div>
                    )}
                    
                    <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 font-bold uppercase tracking-widest text-sm">
                        {t('step')} {currentStepIndex + 1}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 flex flex-col space-y-8">
                <div>
                     <h2 className="text-5xl font-black text-black leading-none mb-6 uppercase">{currentStep.title}</h2>
                     
                     {/* Tools */}
                     <div className="mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t('tools_needed')}</h3>
                        <div className="flex flex-wrap gap-2">
                            {task.tools.map((tool, index) => (
                                <span key={index} className="border border-black px-3 py-1 text-sm font-bold uppercase">
                                    {tool}
                                </span>
                            ))}
                        </div>
                     </div>
                </div>

                <div className="text-lg md:text-xl font-medium leading-relaxed border-l-4 border-lime-300 pl-6">
                    {currentStep.description}
                </div>

                {currentStep.tip && (
                    <div className="bg-gray-50 border-2 border-black p-6 flex gap-4 items-start">
                        <AlertTriangle size={24} className="shrink-0" />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest mb-1">{t('tip_title')}</p>
                            <p className="font-bold">{currentStep.tip}</p>
                        </div>
                    </div>
                )}

                {/* Feedback */}
                <div className="border-t-2 border-black pt-6 flex justify-between items-center">
                    <span className="text-sm font-bold uppercase text-gray-400">{t('feedback_question')}</span>
                    <div className="flex gap-2">
                        <button className="p-2 border border-black hover:bg-black hover:text-white transition-colors">
                            <ThumbsUp size={18} />
                        </button>
                    </div>
                </div>

                {/* Nav Buttons */}
                <div className="flex items-center gap-4 pt-4 mt-auto">
                    <button 
                        onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
                        disabled={currentStepIndex === 0}
                        className={`w-16 h-16 border-2 border-black flex items-center justify-center transition-colors ${currentStepIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <button 
                        onClick={() => {
                            if (currentStepIndex < steps.length - 1) {
                                setCurrentStepIndex(currentStepIndex + 1);
                            } else {
                                onComplete();
                            }
                        }}
                        className="flex-1 h-16 bg-lime-300 border-2 border-black text-black font-black text-lg hover:bg-black hover:text-lime-300 transition-colors flex items-center justify-center gap-4 uppercase tracking-widest"
                    >
                        {currentStepIndex === steps.length - 1 ? t('btn_done') : t('btn_next')} 
                        {currentStepIndex === steps.length - 1 ? <Check size={24} /> : <ArrowRight size={24} />}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};