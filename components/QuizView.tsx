
import React, { useState } from 'react';
import { Question, Subject } from '../types';
import { getMistakeExplanation } from '../services/geminiService';
import { X, Check, MessageCircle, Play, ChevronRight, BrainCircuit, Sparkles } from 'lucide-react';

interface QuizViewProps {
  subject: Subject;
  topicName: string;
  questions: Question[];
  onComplete: (score: number) => void;
  onExit: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ subject, topicName, questions, onComplete, onExit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedback, setFeedback] = useState<{ encouragement: string; explanation: string; tip: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  const currentQuestion = questions[currentQIndex];
  const progress = ((currentQIndex + 1) / questions.length) * 100;

  const handleCheck = async () => {
    if (!selectedOption) return;
    if (selectedOption === currentQuestion.correctAnswer) {
      setStatus('correct');
      setScore(s => s + 10);
    } else {
      setStatus('wrong');
      setIsLoadingFeedback(true);
      const aiFeedback = await getMistakeExplanation(
        subject.name, topicName, currentQuestion.text, selectedOption, currentQuestion.correctAnswer
      );
      setFeedback(aiFeedback);
      setIsLoadingFeedback(false);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setStatus('idle');
      setFeedback(null);
    } else {
      onComplete(score);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="fixed inset-0 bg-slate-50 text-slate-900 flex flex-col z-[500] animate-in slide-in-from-right duration-500">
      {/* HEADER */}
      <header className="p-6 md:p-8 flex items-center justify-between glass border-b border-slate-200">
         <div className="flex items-center gap-6 flex-1 max-w-3xl">
            <button onClick={onExit} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={28} /></button>
            <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
               <div className="h-full bg-brand-500 rounded-full transition-all duration-700 relative" style={{ width: `${progress}%` }}>
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
               </div>
            </div>
            <span className="text-slate-400 font-black text-lg min-w-[60px]">{currentQIndex + 1} / {questions.length}</span>
         </div>
         <div className="hidden md:flex items-center gap-2 ml-10">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${subject.color}`}>
               {subject.icon}
            </div>
            <span className="font-extrabold text-slate-800 tracking-tight">{subject.name}</span>
         </div>
      </header>

      {/* QUESTION AREA */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 md:p-12">
         <div className="max-w-4xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-6 py-2.5 rounded-full font-black text-sm uppercase tracking-widest border border-brand-100 shadow-sm">
               <Sparkles size={16} />
               Soru {currentQIndex + 1}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
               {currentQuestion.text}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-4">
               {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={status !== 'idle'}
                    onClick={() => setSelectedOption(option)}
                    className={`p-6 md:p-8 rounded-3xl text-xl font-bold transition-all border-4 text-left shadow-sm relative group overflow-hidden
                      ${selectedOption === option ? 'border-brand-500 bg-brand-50 text-brand-900' : 'border-white bg-white text-slate-600 hover:border-brand-200 hover:shadow-xl'}
                      ${status === 'correct' && option === currentQuestion.correctAnswer ? '!bg-green-50 !text-green-700 !border-green-500 shadow-lg shadow-green-100 scale-[1.02]' : ''}
                      ${status === 'wrong' && option === selectedOption ? '!bg-red-50 !text-red-700 !border-red-500 scale-[0.98]' : ''}
                      ${status !== 'idle' && option === currentQuestion.correctAnswer ? '!bg-green-50 !border-green-500 !text-green-700' : ''}
                    `}
                  >
                     <div className="relative z-10 flex items-center gap-4">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black border-2 transition-colors
                           ${selectedOption === option ? 'bg-brand-500 border-brand-500 text-white' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-brand-100 group-hover:border-brand-100 group-hover:text-brand-600'}
                        `}>
                           {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                     </div>
                  </button>
               ))}
            </div>
         </div>
      </main>

      {/* FOOTER FEEDBACK */}
      <footer className={`p-8 md:p-12 border-t transition-all duration-500 ${status === 'correct' ? 'bg-green-50 border-green-200' : status === 'wrong' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200 shadow-2xl'}`}>
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            {status === 'idle' ? (
               <>
                  <div className="flex items-center gap-4 text-slate-400">
                     <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                        <BrainCircuit size={24} />
                     </div>
                     <p className="font-bold text-lg italic">Hazır olduğunda kontrol et!</p>
                  </div>
                  <button 
                    onClick={handleCheck}
                    disabled={!selectedOption}
                    className={`px-16 py-5 rounded-[2rem] font-black text-xl tracking-wider uppercase transition-all shadow-2xl
                      ${selectedOption ? 'bg-brand-600 text-white hover:bg-brand-700 hover:scale-105 active:scale-95 shadow-brand-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}
                    `}
                  >
                     Cevabı Kontrol Et
                  </button>
               </>
            ) : (
               <div className="flex flex-col md:flex-row items-center gap-10 w-full">
                  <div className="flex-1 space-y-4">
                     <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${status === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
                           {status === 'correct' ? <Check size={32} /> : <X size={32} />}
                        </div>
                        <div>
                           <h3 className={`text-4xl font-black ${status === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                              {status === 'correct' ? 'Harika Gidiyorsun!' : 'Bu Bir Öğrenme Fırsatı'}
                           </h3>
                           <p className="text-slate-500 font-bold text-lg">
                              {status === 'correct' ? 'Doğru cevapladın, +10 XP kazandın.' : 'Üzülme, her hata seni başarıya bir adım daha yaklaştırır.'}
                           </p>
                        </div>
                     </div>
                     {status === 'wrong' && (
                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border-2 border-red-100 shadow-xl shadow-red-50 relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 opacity-50" />
                           {isLoadingFeedback ? (
                              <div className="flex items-center gap-4 animate-pulse text-slate-500 relative z-10">
                                 <BrainCircuit size={24} className="text-brand-500" />
                                 <span className="font-bold">Yapay zeka öğretmenin hatanı analiz ediyor...</span>
                              </div>
                           ) : feedback && (
                              <div className="space-y-4 relative z-10">
                                 <div className="flex items-center gap-2 text-brand-600">
                                    <MessageCircle size={20} fill="currentColor" className="opacity-20" />
                                    <p className="font-extrabold text-xl">{feedback.encouragement}</p>
                                 </div>
                                 <p className="text-slate-600 font-medium text-lg leading-relaxed">{feedback.explanation}</p>
                                 <div className="pt-2 flex items-center gap-2">
                                    <span className="bg-brand-500 text-white px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest">İPUCU</span>
                                    <p className="text-brand-700 font-bold">{feedback.tip}</p>
                                 </div>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
                  <button onClick={handleNext} className="bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-xl flex items-center gap-4 hover:bg-slate-800 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0 whitespace-nowrap">
                     {currentQIndex < questions.length - 1 ? 'Sonraki Soru' : 'Egzersizi Bitir'} <ChevronRight size={28} />
                  </button>
               </div>
            )}
         </div>
      </footer>
    </div>
  );
};

export default QuizView;
