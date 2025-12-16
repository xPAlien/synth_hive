import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AgentGrid from './components/AgentGrid';
import ChatInterface from './components/ChatInterface';
import Card from './components/ui/Card';
import { Agent, Tab } from './types';
import { AlertTriangle, Rss } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.AGENTS);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);

  const handleFooterLink = (e: React.MouseEvent, tab: Tab) => {
    e.preventDefault();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.AGENTS:
        return (
          <div id="agent-grid" className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-end mb-8 border-b-2 border-nb-contrast pb-4">
                <h2 className="text-4xl font-black uppercase tracking-tight text-nb-contrast">Active Units</h2>
                <span className="font-mono text-sm bg-nb-contrast text-black px-2 py-1">TOTAL: 6</span>
            </div>
            <AgentGrid onChat={setActiveAgent} />
          </div>
        );
      case Tab.FEED:
        return (
            <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
                 <div className="flex items-center gap-4 mb-8">
                    <Rss size={32} className="text-nb-orange" />
                    <h2 className="text-4xl font-black uppercase tracking-tight text-nb-contrast">Hive Mind Feed</h2>
                 </div>
                 {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-zinc-900">
                        <div className="flex items-center gap-3 mb-3 border-b border-zinc-700 pb-2">
                             <div className="w-8 h-8 rounded-full bg-nb-contrast"></div>
                             <div>
                                <div className="font-bold font-mono text-sm text-nb-contrast">SYSTEM_ADMIN</div>
                                <div className="text-xs text-zinc-500">24 mins ago</div>
                             </div>
                        </div>
                        <p className="font-medium text-lg mb-4 text-nb-contrast">
                            Deployment of the new Gemini 2.5 Flash model has resulted in a 40% reduction in latency across all agent interactions. The hive is faster than ever.
                        </p>
                        <div className="bg-zinc-800 p-3 font-mono text-sm border border-nb-contrast text-nb-contrast">
                            > UPDATE_COMPLETE: CORE_SYSTEMS_v2.5<br/>
                            > LATENCY: 45ms<br/>
                            > OPTIMIZATION: SUCCESS
                        </div>
                    </Card>
                 ))}
            </div>
        );
      case Tab.DOCS:
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <Card className="p-8 prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-p:font-medium">
                    <h1>The Protocol</h1>
                    <p>
                        SYNTH_HIVE is built on the principle of autonomous cooperation. We believe in a future where AI agents act as force multipliers for human creativity, not replacements.
                    </p>
                    <div className="bg-zinc-800 border-l-4 border-nb-orange p-4 my-6">
                        <div className="flex items-center gap-2 font-bold text-nb-orange mb-2">
                            <AlertTriangle size={20} />
                            <span>WARNING: BETA ENVIRONMENT</span>
                        </div>
                        <p className="m-0 text-sm text-zinc-300">
                            Agents operating in this sector have high autonomy levels. Interactions are monitored but not censored. Proceed with curiosity.
                        </p>
                    </div>
                    <h2>Core Directives</h2>
                    <ul className="list-disc pl-6 space-y-2 font-mono text-sm text-zinc-300">
                        <li><strong>DIRECTIVE_1:</strong> Always provide verifiable data.</li>
                        <li><strong>DIRECTIVE_2:</strong> Maintain personality integrity.</li>
                        <li><strong>DIRECTIVE_3:</strong> optimize_for_user_success(true).</li>
                    </ul>
                </Card>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-nb-bg text-nb-contrast selection:bg-nb-orange selection:text-black pb-20">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === Tab.AGENTS && <Hero onNavigate={setActiveTab} />}
      
      {renderContent()}

      {activeAgent && (
        <ChatInterface 
            agent={activeAgent} 
            onClose={() => setActiveAgent(null)} 
        />
      )}

      <footer className="border-t-2 border-nb-contrast bg-zinc-900 py-12 mt-12">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-nb-contrast">
                <h3 className="font-black text-xl mb-2">SYNTH_HIVE</h3>
                <p className="font-mono text-xs opacity-60">© 2024 AUTONOMOUS COLLECTIVE</p>
            </div>
            <div className="flex gap-6 font-mono text-sm font-bold underline decoration-2 underline-offset-4 text-nb-contrast">
                <a href="#" onClick={(e) => handleFooterLink(e, Tab.DOCS)} className="hover:text-nb-orange cursor-pointer">MANIFESTO</a>
                <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="hover:text-nb-orange cursor-pointer">API</a>
                <a href="#" onClick={(e) => handleFooterLink(e, Tab.FEED)} className="hover:text-nb-orange cursor-pointer">STATUS</a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;