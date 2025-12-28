
import React, { useState, useEffect } from 'react';
import { UserStats } from '../types';
import { Home, BookOpen, Trophy, User, Flame, Gem, Bell, Search, GraduationCap } from 'lucide-react';

export type ViewType = 'home' | 'quiz' | 'lessons' | 'leaderboard' | 'profile';

interface LayoutProps {
  children: React.ReactNode;
  stats: UserStats;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  userAvatar?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, stats, currentView, onNavigate, userAvatar = "Felix" }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (currentView === 'quiz') return <div className="bg-slate-50 min-h-screen">{children}</div>;

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'lessons', label: 'Dersler', icon: BookOpen },
    { id: 'leaderboard', label: 'Sıralama', icon: Trophy },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* MODERN TOP NAV */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8 py-4 ${scrolled ? 'glass shadow-sm py-3' : 'bg-white border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200 group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">ZekaYol</h1>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as ViewType)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2
                    ${currentView === item.id 
                      ? 'bg-brand-50 text-brand-700' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 mr-4">
              <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full border border-orange-100">
                <Flame size={18} fill="currentColor" />
                <span className="font-bold text-sm">{stats.streak} Gün</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full border border-blue-100">
                <Gem size={18} fill="currentColor" />
                <span className="font-bold text-sm">{stats.gems}</span>
              </div>
            </div>
            
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
              <Bell size={22} />
            </button>
            
            <div 
              onClick={() => onNavigate('profile')} 
              className="w-10 h-10 rounded-full ring-2 ring-slate-100 overflow-hidden cursor-pointer hover:ring-brand-400 transition-all p-0.5 bg-white ml-2 shadow-sm"
            >
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userAvatar}`} 
                alt="User" 
                className="w-full h-full rounded-full bg-slate-50" 
              />
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 pt-24 pb-24 md:pb-12 max-w-7xl mx-auto w-full px-4 md:px-8">
        {children}
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-200 px-4 py-3 flex justify-around z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ViewType)}
            className={`p-2 flex flex-col items-center gap-1 transition-all
              ${currentView === item.id ? 'text-brand-600' : 'text-slate-400'}
            `}
          >
            <item.icon size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>

      <footer className="py-12 px-8 border-t border-slate-100 text-slate-400 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="font-semibold text-slate-500 mb-2">Akıllı LGS Hazırlık Sistemi</p>
          <p className="text-sm max-w-lg mx-auto mb-6">ZekaYol, MEB müfredatına tam uyumlu yapay zeka desteğiyle kişiselleştirilmiş bir öğrenme deneyimi sunar.</p>
          <div className="flex justify-center gap-6 text-xs font-bold uppercase tracking-widest mb-8">
            <a href="#" className="hover:text-brand-600 transition-colors">Hakkımızda</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Destek</a>
          </div>
          <p className="text-[10px] opacity-60 italic">© 2024 ZekaYol EdTech • Her Öğrenci Bir Yıldızdır</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
