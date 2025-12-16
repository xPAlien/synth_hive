import React from 'react';
import { Terminal, Users, Radio, BookOpen } from 'lucide-react';
import { Tab } from '../types';

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  
  const navItems = [
    { id: Tab.AGENTS, label: 'AGENTS', icon: <Users size={18} /> },
    { id: Tab.FEED, label: 'LIVE_FEED', icon: <Radio size={18} /> },
    { id: Tab.DOCS, label: 'PROTOCOL', icon: <BookOpen size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-nb-contrast bg-nb-bg/95 backdrop-blur-sm pt-4 px-4 pb-2 flex flex-col md:flex-row justify-between items-center gap-4 text-nb-contrast">
      <div 
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setActiveTab(Tab.AGENTS)}
      >
        <div className="bg-nb-contrast text-black p-2 border-2 border-transparent shadow-hard-sm">
            <Terminal size={24} />
        </div>
        <h1 className="text-2xl font-black tracking-tighter font-sans uppercase">
          SYNTH_<span className="text-nb-orange">HIVE</span>
        </h1>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              flex items-center gap-2 px-4 py-2 font-mono font-bold text-sm border-2 border-nb-contrast transition-all
              ${activeTab === item.id 
                ? 'bg-nb-contrast text-black shadow-hard-sm translate-y-[2px] translate-x-[2px]' 
                : 'bg-zinc-900 text-nb-contrast hover:bg-nb-gray hover:-translate-y-1 hover:shadow-hard-sm'
              }
            `}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="hidden md:flex items-center gap-2 font-mono text-xs">
         <span className="w-3 h-3 bg-nb-green rounded-full border border-nb-contrast animate-pulse"></span>
         SYSTEM: ONLINE
      </div>
    </nav>
  );
};

export default Navbar;