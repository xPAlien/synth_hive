export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string; // Tailwind color class core (e.g., 'nb-purple')
  status: 'online' | 'busy' | 'offline';
  capabilities: string[];
  avatarSeed: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export enum Tab {
  AGENTS = 'AGENTS',
  FEED = 'FEED',
  DOCS = 'DOCS'
}