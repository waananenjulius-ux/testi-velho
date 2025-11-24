import React, { useState, useContext } from 'react';
import { InventoryItem, InventoryCategory, InventoryStatus } from '../types';
import { Wrench, ShoppingBag, Plus, Trash2, ArrowRightLeft } from 'lucide-react';
import { LanguageContext } from '../App';
import { getDefaultInventory } from '../data';

export const InventoryView: React.FC = () => {
    const { t, language } = useContext(LanguageContext);
    const [items, setItems] = useState<InventoryItem[]>(() => getDefaultInventory(language));
    const [activeTab, setActiveTab] = useState<InventoryStatus>('owned');

    return (
        <div className="pt-24 px-6 pb-24 max-w-4xl mx-auto min-h-screen">
             <div className="mb-8 border-b-2 border-black pb-4">
                <h2 className="text-4xl font-black uppercase tracking-tight">{t('inv_title')}</h2>
            </div>

            {/* Tabs */}
            <div className="flex border-2 border-black mb-8">
                <button
                    onClick={() => setActiveTab('owned')}
                    className={`flex-1 py-4 font-bold uppercase tracking-widest ${activeTab === 'owned' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                    {t('tab_owned')}
                </button>
                <div className="w-0.5 bg-black"></div>
                <button
                    onClick={() => setActiveTab('needed')}
                    className={`flex-1 py-4 font-bold uppercase tracking-widest ${activeTab === 'needed' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                    {t('tab_needed')}
                </button>
            </div>

            {/* List */}
            <div className="space-y-0 border-2 border-black divide-y-2 divide-black">
                {items.filter(i => i.status === activeTab).map(item => (
                    <div key={item.id} className="bg-white p-4 flex items-center justify-between hover:bg-gray-50">
                        <span className="font-bold text-lg uppercase">{item.name}</span>
                        <div className="flex gap-4">
                            <button className="text-black hover:text-lime-600"><Trash2 size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};