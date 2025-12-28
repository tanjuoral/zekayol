
import React, { useState, useRef, useMemo, useEffect } from 'react';
import Layout, { ViewType } from './components/Layout';
import QuizView from './components/QuizView';
import { CURRICULUM, MOCK_USER_STATS } from './constants';
import { Subject, Unit, Topic, Question, UserStats, Difficulty, GradeLevel } from './types';
import { generateLessonContent } from './services/geminiService';
import { 
  Play, Info, Loader2, Zap, Target, ChevronRight, 
  X, ShieldCheck, Award, Edit3, Gem, BookOpen, 
  Camera, Save, User as UserIcon, CheckCircle2, 
  CirclePlay, LayoutGrid, Plus, Search, Bell, 
  Volume2, RotateCcw, Pencil, Star, TrendingUp, Clock, 
  ChevronLeft, LayoutDashboard, BrainCircuit,
  Flame, GraduationCap, Check, Download, Upload, Trash2, RefreshCcw, ChevronDown, ListOrdered
} from 'lucide-react';

const STORAGE_KEY = 'zekayol_user_data_v1';

const AVATAR_SEEDS = ["Felix", "Aneka", "Milo", "Luna", "Jasper", "Oliver", "Maya", "Leo", "Bella", "Coco", "Duke", "Zoe"];

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  
  // Persistence States
  const [userName, setUserName] = useState("Öğrenci");
  const [userAvatar, setUserAvatar] = useState("Felix");
  const [stats, setStats] = useState<UserStats>(MOCK_USER_STATS);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  // UI States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempAvatar, setTempAvatar] = useState("");
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [pendingTopic, setPendingTopic] = useState<{subject: Subject, unit: Unit, topic: Topic} | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(5);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subjects = useMemo(() => CURRICULUM[stats.currentGrade], [stats.currentGrade]);

  // Load from LocalStorage on Mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.userName) setUserName(parsed.userName);
        if (parsed.userAvatar) setUserAvatar(parsed.userAvatar);
        if (parsed.stats) setStats(parsed.stats);
        if (parsed.completedTopics) setCompletedTopics(new Set(parsed.completedTopics));
      } catch (e) {
        console.error("Yükleme hatası:", e);
      }
    }
  }, []);

  // Save to LocalStorage helper
  const persistData = (updates: {
    userName?: string,
    userAvatar?: string,
    stats?: UserStats,
    completedTopics?: Set<string>
  }) => {
    const currentData = {
      userName: updates.userName ?? userName,
      userAvatar: updates.userAvatar ?? userAvatar,
      stats: updates.stats ?? stats,
      completedTopics: Array.from(updates.completedTopics ?? completedTopics)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
  };

  const handleExportData = () => {
    const data = {
      userName,
      userAvatar,
      stats,
      completedTopics: Array.from(completedTopics),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zekayol_profil_${userName.replace(/\s+/g, '_').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        
        if (parsed.userName) setUserName(parsed.userName);
        if (parsed.userAvatar) setUserAvatar(parsed.userAvatar);
        if (parsed.stats) setStats(parsed.stats);
        if (parsed.completedTopics) setCompletedTopics(new Set(parsed.completedTopics));
        
        persistData({
          userName: parsed.userName,
          userAvatar: parsed.userAvatar,
          stats: parsed.stats,
          completedTopics: new Set(parsed.completedTopics)
        });
        
        alert("Profil başarıyla geri yüklendi!");
        setIsEditingProfile(false);
      } catch (err) {
        alert("Dosya okunamadı veya geçersiz JSON formatı.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm("Tüm ilerlemeni ve profil bilgilerini sıfırlamak istediğine emin misin? Bu işlem geri alınamaz.")) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  const toggleSubject = (subjectId: string) => {
    setExpandedSubjects(prev => {
      const next = new Set(prev);
      if (next.has(subjectId)) {
        next.delete(subjectId);
      } else {
        next.add(subjectId);
      }
      return next;
    });
  };

  const changeGrade = (grade: GradeLevel) => {
    const newStats = { ...stats, currentGrade: grade };
    setStats(newStats);
    persistData({ stats: newStats });
    setShowGradeModal(false);
  };

  const startEditing = () => {
    setTempName(userName);
    setTempAvatar(userAvatar);
    setIsEditingProfile(true);
  };

  const saveProfile = () => {
    setUserName(tempName);
    setUserAvatar(tempAvatar);
    persistData({ userName: tempName, userAvatar: tempAvatar });
    setIsEditingProfile(false);
  };

  const handleStartTopic = async (difficulty: Difficulty) => {
    if (!pendingTopic) return;
    const { subject, unit, topic } = pendingTopic;
    setShowDifficultyModal(false);
    setActiveSubject(subject);
    setActiveTopic(topic);
    setLoadingQuiz(true);
    
    try {
      const generatedQuestions = await generateLessonContent(
        subject.name, unit.name, topic.name, difficulty, stats.currentGrade, selectedQuestionCount
      );
      setQuestions(generatedQuestions);
      setLoadingQuiz(false);
      setView('quiz');
    } catch (err) {
      setLoadingQuiz(false);
      alert("Hata oluştu, tekrar dene.");
    }
  };

  const handleQuizComplete = (score: number) => {
    let newCompleted = completedTopics;
    if (activeTopic) {
      newCompleted = new Set(completedTopics).add(activeTopic.id);
      setCompletedTopics(newCompleted);
    }
    // Calculate score based on total questions to keep it balanced
    const adjustedScore = Math.round((score / (selectedQuestionCount * 10)) * 50); // Max 50 XP per session

    const newStats = {
      ...stats, 
      xp: stats.xp + adjustedScore, 
      xpEarnedToday: stats.xpEarnedToday + adjustedScore,
      gems: stats.gems + Math.floor(adjustedScore / 2)
    };
    setStats(newStats);
    persistData({ stats: newStats, completedTopics: newCompleted });
    setView('home');
  };

  const getSubjectProgress = (subject: Subject) => {
    const totalTopics = subject.units.reduce((acc, unit) => acc + unit.topics.length, 0);
    const completedCount = subject.units.reduce((acc, unit) => {
        return acc + unit.topics.filter(t => completedTopics.has(t.id)).length;
    }, 0);
    return {
        percentage: totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0,
        completedCount, totalTopics
    };
  };

  const openSelection = (subject: Subject, unit: Unit, topic: Topic) => {
    setPendingTopic({ subject, unit, topic });
    setSelectedQuestionCount(5); // Default
    setShowDifficultyModal(true);
  };

  if (view === 'quiz' && activeSubject && activeTopic) {
    return (
      <QuizView
        subject={activeSubject}
        topicName={activeTopic.name}
        questions={questions}
        onComplete={handleQuizComplete}
        onExit={() => setView('home')}
      />
    );
  }

  if (loadingQuiz) {
    return (
      <div className="fixed inset-0 bg-white z-[300] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-slate-100 rounded-full" />
          <div className="w-24 h-24 border-4 border-brand-500 border-t-transparent rounded-full animate-spin absolute top-0" />
          <div className="absolute inset-0 flex items-center justify-center text-brand-500">
            <BrainCircuit size={40} />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Dersin Hazırlanıyor...</h2>
        <p className="text-slate-500 font-medium text-lg">Yapay zeka senin için <span className="text-brand-600">{selectedQuestionCount} adet</span> yeni nesil soru kurguluyor.</p>
      </div>
    );
  }

  return (
    <Layout stats={stats} currentView={view} onNavigate={(v) => setView(v)} userAvatar={userAvatar}>
      {/* GRADE SELECTION */}
      {showGradeModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 text-center">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Sınıfını Seç</h2>
            <p className="text-slate-500 mb-10 text-lg">Hangi müfredatı takip etmek istiyorsun?</p>
            <div className="grid grid-cols-2 gap-6">
              {[7, 8].map((grade) => (
                <button
                  key={grade}
                  onClick={() => changeGrade(grade as GradeLevel)}
                  className={`group p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-4
                    ${stats.currentGrade === grade 
                      ? 'border-brand-500 bg-brand-50 shadow-lg shadow-brand-100' 
                      : 'border-slate-100 hover:border-brand-200 hover:bg-slate-50'}
                  `}
                >
                  <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black transition-colors
                    ${stats.currentGrade === grade ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-brand-100 group-hover:text-brand-500'}
                  `}>
                    {grade}
                  </div>
                  <span className={`text-xl font-bold ${stats.currentGrade === grade ? 'text-brand-700' : 'text-slate-500'}`}>
                    {grade}. Sınıf
                  </span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowGradeModal(false)} className="mt-12 text-slate-400 font-bold hover:text-slate-600 transition-colors">Vazgeç</button>
          </div>
        </div>
      )}

      {/* DIFFICULTY MODAL */}
      {showDifficultyModal && pendingTopic && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100">
             <div className="p-8 pb-0">
                <div className="flex items-center justify-between mb-6">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl text-white ${pendingTopic.subject.color} shadow-lg shadow-indigo-100`}>
                      {pendingTopic.subject.icon}
                   </div>
                   <button onClick={() => setShowDifficultyModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{pendingTopic.topic.name}</h3>
                <p className="text-slate-500 font-medium mb-8">Zorluk seviyesi ve soru sayısını seçerek başla.</p>

                {/* QUESTION COUNT PICKER */}
                <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                   <div className="flex items-center gap-2 mb-4 text-slate-600 font-black text-sm uppercase tracking-wider">
                      <ListOrdered size={18} className="text-brand-500" />
                      Kaç Soru Çözmek İstiyorsun?
                   </div>
                   <div className="flex gap-2">
                      {[5, 10, 15, 20].map(count => (
                        <button 
                          key={count} 
                          onClick={() => setSelectedQuestionCount(count)}
                          className={`flex-1 py-3 rounded-xl font-black text-lg transition-all border-2
                            ${selectedQuestionCount === count 
                              ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-100 scale-105' 
                              : 'bg-white text-slate-400 border-slate-200 hover:border-brand-200 hover:text-brand-500'}
                          `}
                        >
                          {count}
                        </button>
                      ))}
                   </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3 mb-8">
                   {[Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD, Difficulty.EXAM_READY].map((diff, idx) => (
                     <button 
                        key={diff} 
                        onClick={() => handleStartTopic(diff)} 
                        className={`group relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all 
                          ${idx === 1 ? 'border-brand-500 bg-brand-50/50' : 'border-slate-100 hover:border-brand-200 hover:bg-slate-50'}
                        `}
                     >
                        <div className="flex flex-col text-left">
                           <span className={`text-lg font-bold ${idx === 1 ? 'text-brand-700' : 'text-slate-700'}`}>{diff}</span>
                           <span className="text-xs text-slate-400 font-medium">Bu seviyeye uygun {selectedQuestionCount} soru hazırlanacak.</span>
                        </div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                          ${idx === 1 ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-brand-100 group-hover:text-brand-500'}
                        `}>
                           <ChevronRight size={20} />
                        </div>
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* DASHBOARD VIEW */}
      {view === 'home' && (
        <div className="space-y-10 animate-in fade-in duration-700">
          {/* WELCOME SECTION */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
            
            <div className="relative z-10 space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-bold border border-brand-100">
                <TrendingUp size={16} />
                LGS'ye {stats.currentGrade === 8 ? 'Son Sürat Hazırlık' : 'Temel Atıyoruz'}
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Selam, {userName.split(' ')[0]}! 👋
              </h1>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">
                Bugün harika iş çıkardın! Hedefine ulaşmak için <span className="text-brand-600 font-bold">30 XP</span> daha kazanman yeterli.
              </p>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setView('lessons')} 
                  className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-200 hover:-translate-y-1 active:translate-y-0"
                >
                  Derslere Dön
                </button>
                <button 
                  onClick={() => setShowGradeModal(true)} 
                  className="bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all"
                >
                  Sınıf Değiştir
                </button>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-80 space-y-4">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-slate-500 text-sm">GÜNLÜK HEDEF</span>
                  <span className="text-brand-600 font-black">{stats.xpEarnedToday} / {stats.dailyXpGoal} XP</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-500 rounded-full transition-all duration-1000" 
                    style={{ width: `${(stats.xpEarnedToday / stats.dailyXpGoal) * 100}%` }} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-orange-500 mb-2"><Flame size={28} fill="currentColor" /></div>
                  <div className="text-2xl font-black text-slate-900">{stats.streak}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase">GÜNLÜK SERİ</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-blue-500 mb-2"><Star size={28} fill="currentColor" /></div>
                  <div className="text-2xl font-black text-slate-900">{stats.level}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase">SEVİYE</div>
                </div>
              </div>
            </div>
          </div>

          {/* SUBJECT CARDS */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900">Derslerin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map(subject => {
                const prog = getSubjectProgress(subject);
                return (
                  <div 
                    key={subject.id} 
                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => {
                        setView('lessons');
                        setExpandedSubjects(new Set([subject.id]));
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl text-white ${subject.color} shadow-lg shadow-indigo-50 group-hover:scale-110 transition-transform`}>
                        {subject.icon}
                      </div>
                      <div className="bg-slate-50 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 border border-slate-100">
                        {subject.units.length} Ünite
                      </div>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{subject.name}</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-bold text-slate-400">
                        <span>İlerleme</span>
                        <span className="text-brand-600">% {Math.round(prog.percentage)}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${subject.color} rounded-full transition-all duration-700`}
                          style={{ width: `${prog.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* LESSONS VIEW */}
      {view === 'lessons' && (
        <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{stats.currentGrade}. Sınıf Müfredatı</h2>
              <p className="text-slate-500 font-medium mt-1">Derslerin üzerine tıklayarak üniteleri görebilirsin.</p>
            </div>
            <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex gap-2">
              <button className="bg-brand-50 text-brand-600 px-6 py-2 rounded-xl font-bold">Liste Görünümü</button>
              <button className="text-slate-400 hover:bg-slate-50 px-6 py-2 rounded-xl font-bold transition-all">Harita</button>
            </div>
          </div>

          <div className="space-y-4">
            {subjects.map(subject => {
              const isExpanded = expandedSubjects.has(subject.id);
              const prog = getSubjectProgress(subject);
              
              return (
                <div key={subject.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
                  {/* SUBJECT HEADER (TOGGLE) */}
                  <button 
                    onClick={() => toggleSubject(subject.id)}
                    className={`w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors
                      ${isExpanded ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'}
                    `}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl text-white ${subject.color} shadow-lg shadow-indigo-100`}>
                        {subject.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-slate-900">{subject.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{subject.units.length} Ünite</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="text-brand-600 font-bold text-[10px] tracking-widest">% {Math.round(prog.percentage)} Tamamlandı</span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  {/* SUBJECT CONTENT (UNITS) */}
                  {isExpanded && (
                    <div className="p-8 pt-4 space-y-12 animate-in slide-in-from-top-4 duration-300">
                      <div className="space-y-10">
                        {subject.units.map(unit => (
                          <div key={unit.id} className="space-y-4 relative pl-8">
                            <div className="absolute left-0 top-3 bottom-0 w-0.5 bg-slate-100" />
                            <div className="absolute left-[-4px] top-3 w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white" />
                            
                            <h4 className="text-brand-600 font-black text-xs uppercase tracking-[0.2em]">{unit.name}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {unit.topics.map(topic => (
                                <button 
                                  key={topic.id} 
                                  onClick={() => openSelection(subject, unit, topic)}
                                  className="w-full text-left p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-300 hover:bg-brand-50 hover:shadow-lg transition-all flex items-center justify-between group"
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-brand-600 transition-colors shadow-sm">
                                      <BookOpen size={20} />
                                    </div>
                                    <span className="text-slate-700 font-bold text-lg group-hover:text-brand-700 transition-colors">
                                      {topic.name}
                                      {completedTopics.has(topic.id) && (
                                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-green-100 text-green-600 rounded-full">
                                          <Check size={12} strokeWidth={4} />
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                  <div className="bg-white p-2 rounded-lg shadow-sm text-slate-300 group-hover:text-brand-500 transition-colors">
                                    <CirclePlay size={20} />
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PROFILE VIEW */}
      {view === 'profile' && (
        <div className="max-w-4xl mx-auto py-10 animate-in zoom-in-95 duration-500 space-y-8">
            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 text-center space-y-12">
               <h2 className="text-5xl font-black text-slate-900 tracking-tight">Profilini Özelleştir</h2>
               
               <div className="flex flex-col items-center gap-10">
                  <div className="relative group">
                     <div className={`w-56 h-56 bg-slate-50 rounded-[3rem] p-4 shadow-xl ring-8 ring-white transition-all duration-300 ${isEditingProfile ? 'ring-brand-100' : 'group-hover:scale-105'}`}>
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isEditingProfile ? tempAvatar : userAvatar}`} 
                          alt="Profile" 
                          className="w-full h-full rounded-[2.5rem] bg-slate-200" 
                        />
                        {isEditingProfile && (
                           <div className="absolute inset-0 bg-slate-900/40 rounded-[2.5rem] flex items-center justify-center pointer-events-none">
                              <Camera size={48} className="text-white opacity-80" />
                           </div>
                        )}
                     </div>
                     {!isEditingProfile && (
                        <button 
                          onClick={startEditing} 
                          className="absolute bottom-4 -right-2 bg-brand-600 text-white p-4 rounded-3xl shadow-2xl hover:scale-110 transition-transform border-4 border-white"
                        >
                           <Pencil size={24} />
                        </button>
                     )}
                  </div>

                  {isEditingProfile && (
                     <div className="w-full max-w-3xl bg-slate-50 p-8 rounded-3xl border border-slate-200 animate-in fade-in slide-in-from-top-4">
                        <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-6">Yeni Bir Avatar Seç</p>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                           {AVATAR_SEEDS.map(seed => (
                              <button 
                                key={seed} 
                                onClick={() => setTempAvatar(seed)}
                                className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all p-1 bg-white
                                  ${tempAvatar === seed ? 'border-brand-500 scale-110 shadow-lg shadow-brand-100' : 'border-transparent hover:border-slate-300'}
                                `}
                              >
                                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} alt={seed} className="w-full h-full bg-slate-100 rounded-xl" />
                              </button>
                           ))}
                        </div>
                     </div>
                  )}

                  <div className="w-full max-w-md space-y-8">
                     {isEditingProfile ? (
                        <div className="space-y-3 text-left">
                           <label className="text-slate-400 font-bold text-sm uppercase tracking-wider ml-1">İsmin Nedir?</label>
                           <input 
                             type="text" 
                             value={tempName}
                             onChange={(e) => setTempName(e.target.value)}
                             placeholder="Adını buraya yaz..."
                             className="w-full bg-white border-2 border-slate-200 text-slate-900 text-3xl font-black px-8 py-5 rounded-3xl focus:border-brand-500 focus:ring-0 outline-none transition-all shadow-sm"
                           />
                        </div>
                     ) : (
                        <div className="space-y-2">
                           <h3 className="text-5xl font-black text-slate-900 tracking-tight">{userName}</h3>
                           <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 px-4 py-2 rounded-full font-bold">
                              <GraduationCap size={18} />
                              {stats.currentGrade}. Sınıf Öğrencisi
                           </div>
                        </div>
                     )}
                  </div>

                  <div className="flex gap-4">
                     {isEditingProfile ? (
                        <>
                           <button 
                             onClick={saveProfile} 
                             className="bg-brand-600 text-white px-12 py-5 rounded-3xl font-black text-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 flex items-center gap-2"
                           >
                              <Save size={24} /> Değişiklikleri Kaydet
                           </button>
                           <button 
                             onClick={() => setIsEditingProfile(false)} 
                             className="bg-slate-200 text-slate-700 px-12 py-5 rounded-3xl font-black text-xl hover:bg-slate-300 transition-all"
                           >
                              İptal
                           </button>
                        </>
                     ) : (
                        <>
                           <button onClick={startEditing} className="bg-brand-600 text-white px-12 py-5 rounded-3xl font-black text-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 flex items-center gap-2">
                              Profili Düzenle
                           </button>
                           <button onClick={() => setShowGradeModal(true)} className="bg-white border-2 border-slate-200 text-slate-700 px-12 py-5 rounded-3xl font-black text-xl hover:bg-slate-50 transition-all">
                              Sınıf Değiştir
                           </button>
                        </>
                     )}
                  </div>
               </div>
            </div>

            {/* DATA MANAGEMENT SECTION */}
            <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 space-y-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
                     <RefreshCcw size={24} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">Veri Yönetimi</h3>
               </div>
               
               <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  İlerlemeni ve profil bilgilerini bir JSON dosyası olarak indirebilir veya başka bir cihazda geri yükleyebilirsin.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button 
                    onClick={handleExportData}
                    className="flex items-center justify-center gap-3 p-6 rounded-3xl bg-slate-50 border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 transition-all group font-bold text-xl"
                  >
                    <Download className="text-slate-400 group-hover:text-brand-600 transition-colors" size={24} />
                    Verileri Yedekle (JSON)
                  </button>
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-3 p-6 rounded-3xl bg-slate-50 border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 transition-all group font-bold text-xl"
                  >
                    <Upload className="text-slate-400 group-hover:text-brand-600 transition-colors" size={24} />
                    Yedekten Geri Yükle
                  </button>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json" 
                    onChange={handleImportData}
                  />
               </div>

               <div className="pt-6 border-t border-slate-100">
                  <button 
                    onClick={handleResetData}
                    className="flex items-center gap-2 text-red-400 hover:text-red-600 font-bold transition-colors mx-auto"
                  >
                    <Trash2 size={20} />
                    Tüm İlerlemeyi Sıfırla
                  </button>
               </div>
            </div>
        </div>
      )}

      {/* LEADERBOARD VIEW */}
      {view === 'leaderboard' && (
        <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500 py-10">
           <div className="text-center space-y-4">
              <h2 className="text-5xl font-black text-slate-900 tracking-tight">Haftalık Liderler</h2>
              <p className="text-slate-500 text-xl font-medium italic">En çok XP kazanan yıldız öğrenciler burada!</p>
           </div>

           <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl p-6">
              {[1, 2, 3, 4, 5].map((rank) => (
                 <div key={rank} className={`flex items-center gap-6 p-6 rounded-3xl transition-all ${rank === 4 ? 'bg-brand-50 border-2 border-brand-200' : 'hover:bg-slate-50 border-2 border-transparent'}`}>
                    <div className="w-12 h-12 flex items-center justify-center font-black text-3xl">
                       {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : <span className="text-slate-300">{rank}</span>}
                    </div>
                    <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden border-4 border-slate-100 shadow-sm flex-shrink-0">
                       <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${rank === 4 ? userAvatar : AVATAR_SEEDS[rank % AVATAR_SEEDS.length]}`} 
                          alt="Avatar" 
                          className="w-full h-full"
                       />
                    </div>
                    <div className="flex-1">
                       <h4 className="text-slate-900 font-extrabold text-2xl">{rank === 4 ? `${userName} (Sen)` : `Öğrenci_${rank}`}</h4>
                       <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">{1500 - (rank*50)} XP • {stats.currentGrade}. Sınıf</p>
                    </div>
                    {rank === 4 && (
                       <div className="bg-brand-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-md">
                          Senin Sıran
                       </div>
                    )}
                 </div>
              ))}
           </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
