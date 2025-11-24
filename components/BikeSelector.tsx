import React, { useContext } from 'react';
import { BikeCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { LanguageContext } from '../App';
import { getBikes } from '../data';

interface BikeSelectorProps {
  onSelect: (bike: BikeCategory) => void;
}

export const BikeSelector: React.FC<BikeSelectorProps> = ({ onSelect }) => {
  const { t, language } = useContext(LanguageContext);
  const bikeCategories = getBikes(language);

  return (
    <div className="pt-24 px-6 pb-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 border-b-2 border-black pb-6">
        <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter mb-4">Select Bike</h2>
        <p className="text-xl font-medium text-gray-600 max-w-2xl">{t('select_bike_desc')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bikeCategories.map((bike) => (
          <button
            key={bike.id}
            onClick={() => onSelect(bike)}
            className="group relative w-full text-left border-2 border-black bg-white hover:bg-black transition-colors duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image Section */}
                <div className="relative h-64 md:h-auto overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-black">
                    <img 
                      src={bike.imageUrl} 
                      alt={bike.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                </div>
                
                {/* Content Section */}
                <div className="p-8 flex flex-col justify-between h-full group-hover:text-white">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest border border-black group-hover:border-white px-2 py-1">
                                Category
                            </span>
                            <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-3xl font-black uppercase mb-2 leading-none">{bike.name}</h3>
                        <p className="text-sm font-medium opacity-60 group-hover:opacity-80">{bike.description}</p>
                    </div>
                </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};