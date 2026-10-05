import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Check, 
  Share2, 
  Printer, 
  RotateCcw,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/sound';

const CATEGORIES = [
  { name: 'Produce', label: '🥦 Fresh Produce & Herbs (सब्ज़ी मंडी)' },
  { name: 'Dairy', label: '🥛 Dairy & Paneer (दूध व पनीर)' },
  { name: 'Spices', label: '🌶️ Spices & Masalas (मसाला भंडार)' },
  { name: 'Grains', label: '🌾 Dals, Rice & Grains (दाल व अनाज)' },
  { name: 'Pantry', label: '🍯 Oils, Ghee & Pantry (किराना सामान)' },
  { name: 'Bakery', label: '🍞 Bakery & Pav' }
];

export default function GroceryListModal({
  groceryList,
  onUpdateGroceryList,
  onClose
}) {
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Produce');
  const [newItemAmount, setNewItemAmount] = useState('1');
  const [newItemUnit, setNewItemUnit] = useState('bunch');

  const handleToggleCheck = (index) => {
    soundManager.playTick();
    const updated = [...groceryList];
    updated[index].checked = !updated[index].checked;
    onUpdateGroceryList(updated);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    soundManager.playTick();
    const newItem = {
      name: newItemName.trim(),
      amount: newItemAmount.trim(),
      unit: newItemUnit.trim(),
      category: newItemCategory,
      checked: false,
      recipeTitle: 'Custom Item'
    };

    onUpdateGroceryList([...groceryList, newItem]);
    setNewItemName('');
  };

  const handleDeleteItem = (index) => {
    soundManager.playTick();
    const updated = groceryList.filter((_, i) => i !== index);
    onUpdateGroceryList(updated);
  };

  const handleClearChecked = () => {
    soundManager.playTick();
    onUpdateGroceryList(groceryList.filter(item => !item.checked));
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your whole grocery list?')) {
      onUpdateGroceryList([]);
    }
  };

  const handleShareWhatsApp = () => {
    if (groceryList.length === 0) return;

    let text = `🛒 *Bazaar Shopping List (Rasoi Diary)*\n\n`;
    CATEGORIES.forEach(cat => {
      const items = groceryList.filter(i => (i.category || 'Pantry') === cat.name);
      if (items.length > 0) {
        text += `*${cat.label}*\n`;
        items.forEach(it => {
          text += `${it.checked ? '✅' : '▫️'} ${it.amount ? `${it.amount} ` : ''}${it.unit ? `${it.unit} ` : ''}${it.name}\n`;
        });
        text += `\n`;
      }
    });

    text += `_Sent with love from Rasoi Diary_ 🪔`;

    const encoded = encodeURI(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const totalItems = groceryList.length;
  const checkedCount = groceryList.filter(i => i.checked).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200/60 my-6 flex flex-col max-h-[92vh] print-container"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#FAF6F0] border-b border-amber-200/70 px-6 py-4 flex items-center justify-between shrink-0 no-print">
          <div>
            <h2 className="font-serif-heading font-extrabold text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
              <span>बाज़ार लिस्ट • Bazaar Shopping List</span>
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              {totalItems} items ({checkedCount} checked off)
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp Share Button */}
            <button
              onClick={handleShareWhatsApp}
              disabled={totalItems === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              title="Send shopping list to WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Send on WhatsApp</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl"
              title="Print Checklist"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Add Form */}
        <form onSubmit={handleAddItem} className="bg-amber-50/50 border-b border-amber-200/60 p-4 shrink-0 no-print">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={newItemAmount}
              onChange={(e) => setNewItemAmount(e.target.value)}
              placeholder="Qty (1)"
              className="w-full sm:w-16 px-2.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
            />
            <input
              type="text"
              value={newItemUnit}
              onChange={(e) => setNewItemUnit(e.target.value)}
              placeholder="Unit (kg/pack)"
              className="w-full sm:w-24 px-2.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
            />
            <input
              type="text"
              required
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item name (e.g. Kasuri Methi, Amul Butter, Dhaniya)..."
              className="w-full flex-1 px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="w-full sm:w-36 px-2.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
            >
              {CATEGORIES.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </form>

        {/* Categorized List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {totalItems === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <ShoppingCart className="w-12 h-12 mx-auto stroke-1 mb-2 opacity-50" />
              <p className="font-serif-heading text-base font-semibold text-stone-600">Your shopping bag is empty</p>
              <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1">
                Click "Add to Bazaar List" from any recipe card or the Weekly Meal Planner to populate this checklist.
              </p>
            </div>
          ) : (
            CATEGORIES.map(cat => {
              const items = groceryList
                .map((item, originalIndex) => ({ ...item, originalIndex }))
                .filter(i => (i.category || 'Pantry') === cat.name);

              if (items.length === 0) return null;

              return (
                <div key={cat.name} className="space-y-2">
                  <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider pb-1 border-b border-stone-100 flex items-center justify-between">
                    <span>{cat.label}</span>
                    <span className="text-[10px] text-stone-400">{items.length} items</span>
                  </h3>

                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li
                        key={item.originalIndex}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                          item.checked
                            ? 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                            : 'bg-white hover:bg-amber-50/40 border-stone-200/80 text-stone-800'
                        }`}
                      >
                        <div 
                          onClick={() => handleToggleCheck(item.originalIndex)}
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                            item.checked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-stone-300 bg-white'
                          }`}>
                            {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="text-xs sm:text-sm">
                            <span className="font-bold text-stone-900 mr-1.5">
                              {item.amount} {item.unit}
                            </span>
                            <span>{item.name}</span>
                            {item.recipeTitle && (
                              <span className="ml-2 text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-sm">
                                for {item.recipeTitle}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteItem(item.originalIndex)}
                          className="p-1 text-stone-300 hover:text-red-500 rounded-md transition-colors no-print"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Actions */}
        {totalItems > 0 && (
          <div className="bg-[#FAF6F0] border-t border-amber-200/70 px-6 py-3 flex items-center justify-between shrink-0 no-print">
            <button
              onClick={handleClearChecked}
              disabled={checkedCount === 0}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 disabled:opacity-40"
            >
              Clear Checked Items ({checkedCount})
            </button>

            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-red-600 hover:text-red-800"
            >
              Clear Entire List
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
