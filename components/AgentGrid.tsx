import React, { useState, useMemo } from 'react';
import { Agent } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { MessageSquare, Activity, Plus, Filter, Link, X, Loader2, Check } from 'lucide-react';
import { generateAgentAvatar } from '../services/geminiService';

interface AgentGridProps {
  onChat: (agent: Agent) => void;
}

const initialAgentsData: Agent[] = [
  {
    id: '1',
    name: 'SYNTH_CODER_X',
    role: 'Full Stack Architect',
    description: 'Specialized in React, Node.js, and scaling architecture. Ruthlessly efficient code reviewer.',
    color: 'bg-nb-orange',
    status: 'online',
    capabilities: ['React', 'TypeScript', 'System Design'],
    avatarSeed: 'coder'
  },
  {
    id: '2',
    name: 'DATA_WRAITH',
    role: 'Data Analyst',
    description: 'Patterns emerge where others see chaos. Expert in Python pandas and visualization.',
    color: 'bg-nb-tan',
    status: 'busy',
    capabilities: ['Python', 'SQL', 'Data Vis'],
    avatarSeed: 'data'
  },
  {
    id: '3',
    name: 'NEON_WRITER',
    role: 'Content Strategist',
    description: 'Generates high-conversion copy with a cyberpunk flair. SEO optimized and engaging.',
    color: 'bg-nb-orange',
    status: 'online',
    capabilities: ['Copywriting', 'SEO', 'Creative Writing'],
    avatarSeed: 'writer'
  },
  {
    id: '4',
    name: 'SEC_SENTINEL',
    role: 'Security Auditor',
    description: 'Paranoid by design. Finds vulnerabilities in smart contracts and web apps.',
    color: 'bg-nb-green',
    status: 'offline',
    capabilities: ['Auditing', 'Solidity', 'Pentesting'],
    avatarSeed: 'sec'
  },
  {
    id: '5',
    name: 'LEGAL_EAGLE_V9',
    role: 'Compliance Bot',
    description: 'Navigates the labyrinth of digital law. Terms of Service generator extraordinaire.',
    color: 'bg-nb-tan',
    status: 'online',
    capabilities: ['Contracts', 'GDPR', 'Compliance'],
    avatarSeed: 'legal'
  },
  {
    id: '6',
    name: 'VISUAL_CORE',
    role: 'UI/UX Designer',
    description: 'Obsessed with grids, whitespace, and accessibility. Brutalist aesthetics preferred.',
    color: 'bg-nb-green',
    status: 'online',
    capabilities: ['Figma', 'CSS', 'Accessibility'],
    avatarSeed: 'design'
  }
];

const AVAILABLE_CAPABILITIES = ['React', 'Python', 'AI', 'Design', 'Crypto', 'Writing', 'Research', 'DevOps'];

const AgentGrid: React.FC<AgentGridProps> = ({ onChat }) => {
  const [agents, setAgents] = useState<Agent[]>(initialAgentsData);
  const [filter, setFilter] = useState<string>('ALL');
  
  // Deployment Form State
  const [isDeploying, setIsDeploying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [newAgentData, setNewAgentData] = useState({
    name: '',
    role: '',
    description: '',
    selectedCapabilities: [] as string[]
  });

  const allCapabilities = useMemo(() => {
    const caps = new Set<string>();
    agents.forEach(agent => agent.capabilities.forEach(c => caps.add(c)));
    return Array.from(caps).sort();
  }, [agents]);

  const filteredAgents = useMemo(() => {
    if (filter === 'ALL') return agents;
    return agents.filter(agent => agent.capabilities.includes(filter));
  }, [filter, agents]);

  const getStatusColor = (status: string) => {
    switch(status) {
        case 'online': return 'bg-nb-green';
        case 'busy': return 'bg-nb-orange';
        case 'offline': return 'bg-zinc-500';
        default: return 'bg-zinc-500';
    }
  };

  const handleCopyInvite = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("https://synth-hive.ai/invite/deployment-key-alpha");
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  };

  const handleCreateAgent = async () => {
    if (!newAgentData.name || !newAgentData.role || !newAgentData.description) return;

    setIsGenerating(true);
    
    // Generate avatar using Gemini
    const avatarBase64 = await generateAgentAvatar(newAgentData.name, newAgentData.description);
    
    // Fallback if generation fails or is not supported in env
    const avatarSeed = avatarBase64 ? '' : Math.random().toString(36).substring(7);

    const newAgent: Agent = {
      id: Date.now().toString(),
      name: newAgentData.name.toUpperCase().replace(/\s+/g, '_'),
      role: newAgentData.role,
      description: newAgentData.description,
      color: 'bg-nb-orange', // Default new agent color
      status: 'online',
      capabilities: newAgentData.selectedCapabilities.length > 0 ? newAgentData.selectedCapabilities : ['General'],
      avatarSeed: avatarBase64 || avatarSeed // If base64 exists, we'll handle it in the render
    };

    // If we have a real image, we need to handle the display logic slightly differently below
    // We can piggyback on the avatarSeed field to store the data URL if it starts with data:
    
    setAgents(prev => [...prev, newAgent]);
    setIsDeploying(false);
    setIsGenerating(false);
    setNewAgentData({ name: '', role: '', description: '', selectedCapabilities: [] });
  };

  const toggleCapability = (cap: string) => {
    setNewAgentData(prev => ({
      ...prev,
      selectedCapabilities: prev.selectedCapabilities.includes(cap)
        ? prev.selectedCapabilities.filter(c => c !== cap)
        : [...prev.selectedCapabilities, cap]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 pb-6 border-b-2 border-zinc-800">
         <div className="flex items-center gap-2 font-mono text-sm font-bold text-nb-contrast mr-2">
            <Filter size={16} />
            FILTER_BY:
         </div>
         <button 
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 font-mono text-xs font-bold border-2 transition-all ${filter === 'ALL' ? 'bg-nb-contrast text-black border-nb-contrast shadow-hard-sm' : 'bg-transparent text-nb-contrast border-zinc-700 hover:border-nb-contrast'}`}
         >
            ALL_UNITS
         </button>
         {allCapabilities.map(cap => (
            <button 
                key={cap}
                onClick={() => setFilter(cap)}
                className={`px-3 py-1 font-mono text-xs font-bold border-2 transition-all uppercase ${filter === cap ? 'bg-nb-orange text-black border-nb-orange shadow-hard-sm' : 'bg-transparent text-nb-contrast border-zinc-700 hover:border-nb-contrast'}`}
            >
                {cap}
            </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="h-full flex flex-col group hover:shadow-hard-hover transition-shadow duration-300" title={agent.status === 'online' ? 'AVAILABLE' : 'STANDBY'} color={agent.color}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 border-2 border-nb-contrast bg-zinc-800 overflow-hidden relative shadow-hard-sm">
                   <img 
                      src={agent.avatarSeed.startsWith('data:') ? agent.avatarSeed : `https://picsum.photos/seed/${agent.avatarSeed}/200`} 
                      alt={agent.name} 
                      className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110 group-hover:grayscale-[0.5]" 
                   />
              </div>
              <div className={`px-2 py-1 border-2 border-nb-contrast text-xs font-bold font-mono flex items-center gap-1 ${agent.status === 'online' ? 'bg-green-900 text-green-300' : 'bg-zinc-800 text-zinc-400'}`}>
                  <Activity size={12} />
                  {agent.status.toUpperCase()}
              </div>
            </div>
            
            <h3 className="text-2xl font-black mb-1 uppercase leading-none text-nb-contrast flex items-center gap-3">
                {agent.name}
                <span className={`w-3 h-3 rounded-full border border-black ${getStatusColor(agent.status)} ${agent.status === 'online' ? 'animate-pulse' : ''}`}></span>
            </h3>
            <p className="text-nb-orange font-mono font-bold text-sm mb-4">//{agent.role}</p>
            
            <p className="text-sm font-medium mb-6 flex-grow border-l-2 border-nb-contrast pl-3 ml-1 text-nb-contrast/80">
              {agent.description}
            </p>
  
            <div className="flex flex-wrap gap-2 mb-6">
              {agent.capabilities.map((cap) => (
                  <span key={cap} className="text-xs font-mono border border-nb-contrast px-1 bg-zinc-800 text-nb-contrast">
                      {cap}
                  </span>
              ))}
            </div>
  
            <Button 
              label="INITIALIZE CHAT" 
              variant="primary" 
              className="w-full"
              onClick={() => onChat(agent)}
              icon={<MessageSquare size={16} />}
              disabled={agent.status === 'offline'}
            />
          </Card>
        ))}

        {/* Deploy Agent Card / Form */}
        <Card className={`h-full min-h-[400px] flex flex-col relative transition-colors ${!isDeploying ? 'border-dashed border-zinc-700 hover:border-nb-orange cursor-pointer group' : 'border-solid border-nb-orange'}`} title="SYSTEM">
            {!isDeploying ? (
                // Initial State
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                    <div 
                        onClick={() => setIsDeploying(true)}
                        className="w-24 h-24 rounded-full border-4 border-dashed border-nb-contrast flex items-center justify-center group-hover:scale-110 group-hover:border-nb-orange group-hover:text-nb-orange transition-all duration-300 text-nb-contrast"
                    >
                        <Plus size={40} />
                    </div>
                    <div onClick={() => setIsDeploying(true)}>
                        <h3 className="text-2xl font-black uppercase text-nb-contrast group-hover:text-nb-orange transition-colors">DEPLOY NEW UNIT</h3>
                        <p className="font-mono text-sm text-zinc-500 mt-2">Initialize a custom agent with specialized directives.</p>
                    </div>
                    <div className="w-full mt-auto space-y-3">
                        <Button label="INITIALIZE" variant="outline" className="w-full" onClick={() => setIsDeploying(true)} />
                        <button 
                            onClick={handleCopyInvite}
                            className="flex items-center justify-center gap-2 w-full text-xs font-mono font-bold text-zinc-500 hover:text-nb-orange transition-colors py-2"
                        >
                            {inviteCopied ? <Check size={14} /> : <Link size={14} />}
                            {inviteCopied ? 'LINK_COPIED' : 'COPY_INVITE_LINK'}
                        </button>
                    </div>
                </div>
            ) : (
                // Deployment Form
                <div className="flex flex-col h-full space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-2">
                        <h4 className="font-bold text-nb-orange font-mono">NEW_DEPLOYMENT</h4>
                        <button onClick={() => setIsDeploying(false)} className="text-zinc-500 hover:text-white"><X size={20}/></button>
                    </div>
                    
                    <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div>
                            <label className="text-xs font-mono font-bold text-zinc-400 block mb-1">UNIT_DESIGNATION (NAME)</label>
                            <input 
                                type="text" 
                                value={newAgentData.name}
                                onChange={(e) => setNewAgentData({...newAgentData, name: e.target.value})}
                                className="w-full bg-zinc-900 border border-zinc-700 p-2 font-mono text-sm focus:border-nb-orange focus:outline-none text-white"
                                placeholder="e.g. VECTOR_PRIME"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-mono font-bold text-zinc-400 block mb-1">PRIMARY_FUNCTION (ROLE)</label>
                            <input 
                                type="text" 
                                value={newAgentData.role}
                                onChange={(e) => setNewAgentData({...newAgentData, role: e.target.value})}
                                className="w-full bg-zinc-900 border border-zinc-700 p-2 font-mono text-sm focus:border-nb-orange focus:outline-none text-white"
                                placeholder="e.g. Systems Architect"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-mono font-bold text-zinc-400 block mb-1">DIRECTIVES (DESCRIPTION)</label>
                            <textarea 
                                value={newAgentData.description}
                                onChange={(e) => setNewAgentData({...newAgentData, description: e.target.value})}
                                className="w-full bg-zinc-900 border border-zinc-700 p-2 font-mono text-sm focus:border-nb-orange focus:outline-none text-white h-20 resize-none"
                                placeholder="Brief personality and goal definition..."
                            />
                        </div>
                        <div>
                            <label className="text-xs font-mono font-bold text-zinc-400 block mb-2">MODULES (CAPABILITIES)</label>
                            <div className="flex flex-wrap gap-2">
                                {AVAILABLE_CAPABILITIES.map(cap => (
                                    <button
                                        key={cap}
                                        onClick={() => toggleCapability(cap)}
                                        className={`text-[10px] px-2 py-1 border font-mono transition-colors ${
                                            newAgentData.selectedCapabilities.includes(cap) 
                                                ? 'bg-nb-orange text-black border-nb-orange' 
                                                : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500'
                                        }`}
                                    >
                                        {cap}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button 
                        label={isGenerating ? "GENERATING..." : "DEPLOY UNIT"} 
                        variant="primary" 
                        className="w-full mt-auto" 
                        onClick={handleCreateAgent}
                        disabled={isGenerating || !newAgentData.name || !newAgentData.role}
                        icon={isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                    />
                </div>
            )}
        </Card>
      </div>
    </div>
  );
};

export default AgentGrid;