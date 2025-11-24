import React, { useState, useContext } from 'react';
import { Checklist } from '../types';
import { Check, Square, ChevronDown, ChevronUp } from 'lucide-react';
import { LanguageContext } from '../App';
import { getChecklists } from '../data';

export const ChecklistsView: React.FC = () => {
  const { t, language } = useContext(LanguageContext);
  const checklistsData = getChecklists(language);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [completionState, setCompletionState] = useState<Record<string, Record<string, boolean>>>({});

  const toggleChecklist = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleItem = (checklistId: string, itemId: string) => {
    setCompletionState(prev => {
      const listState = prev[checklistId] || {};
      return {
        ...prev,
        [checklistId]: {
          ...listState,
          [itemId]: !listState[itemId]
        }
      };
    });
  };

  const isCompleted = (checklistId: string, itemId: string) => {
    return completionState[checklistId]?.[itemId] || false;
  };

  const getProgress = (checklist: Checklist) => {
    const total = checklist.items.length;
    const done = checklist.items.filter(i => isCompleted(checklist.id, i.id)).length;
    return Math.round((done / total) * 100);
  };

  return (
    <div className="pt-24 px-6 pb-24 max-w-4xl mx-auto min-h-screen">
      <div className="mb-8 border-b-2 border-black pb-4">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">{t('checklists_title')}</h2>
      </div>
      
      <div className="space-y-4">
        {checklistsData.map(list => {
          const isOpen = expandedId === list.id;
          const progress = getProgress(list);
          
          return (
            <div 
              key={list.id} 
              className={`border-2 border-black bg-white transition-all`}
            >
              <button 
                onClick={() => toggleChecklist(list.id)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50"
              >
                <div className="flex-1 pr-6">
                  <h3 className="font-bold text-xl uppercase">{list.title}</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1 h-3 border border-black max-w-[150px]">
                        <div 
                            className="h-full bg-black transition-all duration-300"
                            style={{ width: `${progress}%` }} 
                        />
                    </div>
                  </div>
                </div>
                <div>
                     {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 border-t-2 border-black bg-gray-50">
                    <div className="space-y-2 mt-4">
                        {list.items.map(item => {
                            const checked = isCompleted(list.id, item.id);
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => toggleItem(list.id, item.id)}
                                    className={`w-full flex items-center gap-4 p-3 border border-black hover:bg-white transition-colors text-left bg-white`}
                                >
                                    <div className={`flex-shrink-0 text-black`}>
                                        {checked ? <div className="bg-black text-white p-0.5"><Check size={16} /></div> : <Square size={20} />}
                                    </div>
                                    <span className={`text-sm font-bold uppercase ${checked ? 'line-through opacity-50' : ''}`}>
                                        {item.text}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};