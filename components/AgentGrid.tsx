import React from 'react';
import { Agent } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { MessageSquare, Zap, Activity } from 'lucide-react';

interface AgentGridProps {
  onChat: (agent: Agent) => void;
}

const agents: Agent[] = [
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

const AgentGrid: React.FC<AgentGridProps> = ({ onChat }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {agents.map((agent) => (
        <Card key={agent.id} className="h-full flex flex-col hover:shadow-hard-hover transition-shadow" title={agent.status === 'online' ? 'AVAILABLE' : 'STANDBY'} color={agent.color}>
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 border-2 border-nb-contrast bg-zinc-800 overflow-hidden relative shadow-hard-sm">
                 <img src={`https://picsum.photos/seed/${agent.avatarSeed}/200`} alt={agent.name} className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className={`px-2 py-1 border-2 border-nb-contrast text-xs font-bold font-mono flex items-center gap-1 ${agent.status === 'online' ? 'bg-green-900 text-green-300' : 'bg-zinc-800 text-zinc-400'}`}>
                <Activity size={12} />
                {agent.status.toUpperCase()}
            </div>
          </div>
          
          <h3 className="text-2xl font-black mb-1 uppercase leading-none text-nb-contrast">{agent.name}</h3>
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
    </div>
  );
};

export default AgentGrid;