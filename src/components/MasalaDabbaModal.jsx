import React, { useState } from 'react';
import { X, Sparkles, Flame, HelpCircle, BookOpen, ChevronRight } from 'lucide-react';
import { MASALA_DABBA, COOKING_TIPS } from '../data/spicePantry';
import { soundManager } from '../utils/sound';

export default function MasalaDabbaModal({ onClose }) {
  const [selectedSpice, setSelectedSpice] = useState(MASALA_DABBA[0]);

  const handleSpiceSelect = (spice) => {
    soundManager.playTick();
    setSelectedSpice(spice);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200/60 my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#FAF6F0] border-b border-amber-200/70 px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif-heading font-extrabold text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
              <span className="text-2xl">🧂</span>
              <span>मसाला दानी • The Sacred Masala Dabba</span>
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Explore essential Indian spices, tadka chemistry, and smart emergency kitchen substitutes.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Spice Grid / Dabba (5 cols) */}
          <div className="md:col-span-5 flex flex-col">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
              Select Spice from the Box
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {MASALA_DABBA.map((spice) => {
                const isSelected = selectedSpice.id === spice.id;
                return (
                  <button
                    key={spice.id}
                    onClick={() => handleSpiceSelect(spice)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100/80 border-amber-400 shadow-xs ring-2 ring-amber-400/40'
                        : 'bg-stone-50 hover:bg-amber-50/50 border-stone-200/80'
                    }`}
                  >
                    <span className="text-xl shrink-0">{spice.icon}</span>
                    <div className="truncate">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {spice.name}
                      </p>
                      <p className="text-[10px] text-amber-800 font-ethnic truncate">
                        {spice.hindi}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Tadka Order Tip */}
            <div className="mt-6 bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-serif-heading">
                <Flame className="w-4 h-4 text-orange-600" />
                <span>The Golden Rule of Tadka</span>
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                Always heat ghee or oil first. Add whole spices (Mustard seeds, Jeera) until they splutter, followed by Hing, then ginger-garlic, onions, ground spices, and lastly Garam Masala & Kasuri Methi right at the end.
              </p>
            </div>
          </div>

          {/* Right Column: Selected Spice Spotlight (7 cols) */}
          <div className="md:col-span-7 flex flex-col space-y-4">
            
            {/* Spice Hero Card */}
            <div className="bg-gradient-to-br from-[#FFFBF2] to-[#FFF6E5] border border-amber-200 rounded-3xl p-6 shadow-xs">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl border border-amber-200">
                    {selectedSpice.icon}
                  </div>
                  <div>
                    <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-stone-900">
                      {selectedSpice.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-800">
                      {selectedSpice.english} • <span className="font-ethnic text-sm">{selectedSpice.hindi}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Flavor Profile */}
              <div className="mb-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Aromatic & Flavor Profile:
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed bg-white/70 p-3 rounded-xl border border-amber-100">
                  {selectedSpice.flavor}
                </p>
              </div>

              {/* Tadka Tempering Timing */}
              <div className="mb-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-orange-700 mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-600" />
                  <span>When to Add in Cooking (Tadka Timing):</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed bg-white/70 p-3 rounded-xl border border-amber-100">
                  {selectedSpice.temperTiming}
                </p>
              </div>

              {/* Best Emergency Substitutes */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Out of this spice? Best Kitchen Substitutes:</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                  {selectedSpice.bestSubstitutes}
                </p>
              </div>
            </div>

            {/* General Culinary Secrets */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Chef's Secret Wisdom
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {COOKING_TIPS.map((tip, i) => (
                  <div key={i} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                    <p className="font-bold text-stone-900 mb-0.5">{tip.title}</p>
                    <p className="text-stone-600">{tip.tip}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#FAF6F0] border-t border-amber-200/70 px-6 py-3 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Got it, back to Rasoi
          </button>
        </div>

      </div>
    </div>
  );
}
