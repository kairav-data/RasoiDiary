import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ChefHat, 
  List
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sound';
import { speechHelper } from '../utils/speech';
import { scaleIngredient } from '../utils/scaler';

export default function CookingModeModal({
  recipe,
  onClose
}) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showIngredientsDrawer, setShowIngredientsDrawer] = useState(false);
  
  // Timer state
  const currentStep = recipe.instructions[currentStepIdx] || {};
  const defaultStepDuration = (currentStep.durationMinutes || 5) * 60;
  const [timeLeft, setTimeLeft] = useState(defaultStepDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sync timer when step changes
  useEffect(() => {
    const stepDuration = (currentStep.durationMinutes || 5) * 60;
    setTimeLeft(stepDuration);
    setIsTimerRunning(false);
    speechHelper.stop();
    setIsSpeaking(false);
  }, [currentStepIdx]);

  // Timer countdown loop
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            soundManager.playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // Cleanup speech on unmount and support Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      speechHelper.stop();
    };
  }, [onClose]);

  const totalSteps = recipe.instructions.length;
  const progressPercent = Math.round(((currentStepIdx + 1) / totalSteps) * 100);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    soundManager.playTick();
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      // Completed the entire recipe!
      setIsCompleted(true);
      soundManager.playSuccess();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ea580c', '#f59e0b', '#10b981', '#fbbf24', '#e11d48']
      });
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      soundManager.playTick();
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speechHelper.stop();
      setIsSpeaking(false);
    } else {
      const textToRead = `Step ${currentStepIdx + 1}: ${currentStep.title}. ${currentStep.text}`;
      setIsSpeaking(true);
      speechHelper.speak(textToRead, () => {
        setIsSpeaking(false);
      });
    }
  };

  const toggleTimer = () => {
    soundManager.playTick();
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    soundManager.playTick();
    setIsTimerRunning(false);
    setTimeLeft((currentStep.durationMinutes || 5) * 60);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 text-white flex flex-col justify-between overflow-hidden animate-fade-in select-none">
      
      {/* Top Bar: Progress & Quick Actions */}
      <div className="bg-stone-900/90 border-b border-stone-800 px-6 py-4 flex items-center justify-between">
        
        {/* Left: Recipe Name & Step Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold">
            <ChefHat className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-serif-heading font-bold text-white flex items-center gap-2">
              <span>{recipe.title}</span>
              {recipe.hindiTitle && (
                <span className="text-amber-400 text-sm font-ethnic hidden sm:inline">
                  • {recipe.hindiTitle}
                </span>
              )}
            </h2>
            <p className="text-xs text-stone-400 font-medium">
              Kitchen Mode • Step {currentStepIdx + 1} of {totalSteps} ({progressPercent}% Completed)
            </p>
          </div>
        </div>

        {/* Right: Drawer toggle, Voice button, Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Ingredients Drawer Button */}
          <button
            onClick={() => setShowIngredientsDrawer(!showIngredientsDrawer)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
          >
            <List className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Ingredients</span>
          </button>

          {/* Voice Narration Button */}
          <button
            onClick={handleToggleSpeech}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
              isSpeaking
                ? 'bg-orange-600 text-white animate-pulse'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
            }`}
            title="Read instruction aloud"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-orange-400" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Stop Voice' : 'Read Aloud'}</span>
          </button>

          {/* Exit Kitchen Mode */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
            title="Exit Kitchen Mode and Return to Recipes"
          >
            <X className="w-4 h-4" />
            <span>Exit to Recipes</span>
          </button>
        </div>

      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-stone-800 h-1.5">
        <div 
          className="bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Focus Area */}
      <div className="flex-1 relative flex items-center justify-center p-4 sm:p-12 max-w-5xl mx-auto w-full">
        
        {isCompleted ? (
          /* Finished Celebration View */
          <div className="text-center max-w-lg mx-auto py-8">
            <div className="w-24 h-24 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-5xl mb-6 shadow-xl">
              🎉
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-heading font-extrabold text-white mb-3">
              Kamaal Ka Swad!
            </h2>
            <p className="text-amber-300 text-lg font-ethnic mb-4">
              स्वादिष्ट भोजन तैयार है!
            </p>
            <p className="text-stone-300 text-sm leading-relaxed mb-8">
              Your delicious <strong className="text-white">{recipe.title}</strong> is ready to be savored! Garnish with fresh coriander or cream and serve smoking hot.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setIsCompleted(false);
                  setCurrentStepIdx(0);
                }}
                className="px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm"
              >
                Start Over
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-600/30"
              >
                Done Cooking
              </button>
            </div>
          </div>
        ) : (
          /* Active Step View */
          <div className="w-full flex flex-col items-center text-center">
            
            {/* Step Number Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-400 font-bold text-sm uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Step {currentStepIdx + 1} of {totalSteps}</span>
            </div>

            {/* Step Title */}
            <h3 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white mb-6 max-w-3xl leading-snug">
              {currentStep.title}
            </h3>

            {/* Large Readable Instruction Text */}
            <div className="max-w-3xl bg-stone-900/80 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-2xl mb-8">
              <p className="text-lg sm:text-2xl text-stone-100 font-normal leading-relaxed sm:leading-loose">
                {currentStep.text}
              </p>
            </div>

            {/* Step Timer Display */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-stone-900/90 border border-stone-800 px-6 py-4 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3">
                <Clock className={`w-5 h-5 ${isTimerRunning ? 'text-orange-400 animate-spin' : 'text-stone-400'}`} />
                <span className="font-mono text-3xl font-bold tracking-wider text-amber-300">
                  {formatTimer(timeLeft)}
                </span>
                {timeLeft === 0 && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md font-bold uppercase animate-bounce">
                    Time's Up! 🔔
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                    isTimerRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                </button>
                <button
                  onClick={resetTimer}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Quick Ingredients Slide-in Drawer */}
        {showIngredientsDrawer && (
          <div className="absolute top-0 right-0 bottom-0 w-80 sm:w-96 bg-stone-900 border-l border-stone-800 p-6 overflow-y-auto shadow-2xl z-30 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <h4 className="font-serif-heading font-bold text-base text-amber-300 flex items-center gap-2">
                <span>सामग्री • Ingredients</span>
              </h4>
              <button
                onClick={() => setShowIngredientsDrawer(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ul className="space-y-2 text-xs">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-200 py-1.5 border-b border-stone-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-white mr-1">
                      {scaleIngredient(ing.amount, recipe.servings, recipe.targetServings || recipe.servings)} {ing.unit}
                    </span>
                    <span>{ing.item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Bottom Bar: Navigation Buttons */}
      {!isCompleted && (
        <div className="bg-stone-900/95 border-t border-stone-800 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIdx === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
              currentStepIdx === 0
                ? 'opacity-30 cursor-not-allowed bg-stone-800 text-stone-500'
                : 'bg-stone-800 hover:bg-stone-700 text-white cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous Step</span>
          </button>

          {/* Dadi Maa's Tip reminder for this recipe if present */}
          {recipe.secretTip && (
            <p className="hidden md:block text-xs text-amber-300/80 italic max-w-md text-center line-clamp-1">
              ✨ Tip: {recipe.secretTip}
            </p>
          )}

          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-600/30 transition-all cursor-pointer active:scale-95"
          >
            <span>{currentStepIdx === totalSteps - 1 ? 'Finish Dish' : 'Next Step'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

    </div>
  );
}
