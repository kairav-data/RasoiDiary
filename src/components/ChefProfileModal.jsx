import React, { useState } from 'react';
import { X, User, Heart, Sparkles, Check, Save } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sound';

const EMOJI_OPTIONS = ['👩‍🍳', '👑', '🪔', '🥘', '🌶️', '🌸', '✨', '💖', '🫓', '🍲'];

export default function ChefProfileModal({
  profile,
  onSaveProfile,
  onClose
}) {
  const [name, setName] = useState(profile.name || '');
  const [kitchenName, setKitchenName] = useState(profile.kitchenName || 'Her Secret Rasoi');
  const [tagline, setTagline] = useState(profile.tagline || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [avatarEmoji, setAvatarEmoji] = useState(profile.avatarEmoji || '👩‍🍳');
  const [favoriteSpice, setFavoriteSpice] = useState(profile.favoriteSpice || 'Kasuri Methi');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      name: name.trim() || 'Chef',
      kitchenName: kitchenName.trim() || 'Her Secret Rasoi',
      tagline: tagline.trim(),
      bio: bio.trim(),
      avatarEmoji,
      favoriteSpice: favoriteSpice.trim()
    };

    onSaveProfile(updated);
    soundManager.playSuccess();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200/60 my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#FAF6F0] border-b border-amber-200/70 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif-heading font-extrabold text-xl text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span>Personalize Her Rasoi</span>
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Customize the name, bio, and kitchen identity dedicated to her.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Avatar Emoji Picker */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Chef Avatar Emoji
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {EMOJI_OPTIONS.map(emoji => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => {
                    soundManager.playTick();
                    setAvatarEmoji(emoji);
                  }}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                    avatarEmoji === emoji
                      ? 'bg-amber-100 border-2 border-orange-500 scale-110 shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 border border-stone-200/80'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Chef Name */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Her Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Pooja, Priya, Aarti..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />
          </div>

          {/* Kitchen Title */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Kitchen Title
            </label>
            <input
              type="text"
              required
              value={kitchenName}
              onChange={(e) => setKitchenName(e.target.value)}
              placeholder="e.g. Pooja's Rasoi, Her Secret Rasoi, Swad Sugandh..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Kitchen Tagline / Mantra
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Authentic Indian Flavors Crafted with Love & Warmth ✨"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />
          </div>

          {/* Favorite Spice */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Her Favorite Spice or Specialty
            </label>
            <input
              type="text"
              value={favoriteSpice}
              onChange={(e) => setFavoriteSpice(e.target.value)}
              placeholder="e.g. Kasuri Methi, Elaichi Chai, Kesar"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/30 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
