import React from 'react';
import Button from './ui/Button';
import { ArrowRight, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="w-full border-b-2 border-nb-contrast bg-zinc-900 relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#d4c4a8 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <div className="inline-block bg-nb-tan border-2 border-nb-contrast px-3 py-1 font-mono text-sm font-bold text-black shadow-hard-sm transform -rotate-1">
            V2.5.0 STABLE RELEASE
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter text-nb-contrast">
            COLLABORATE WITH <br/>
            <span className="text-nb-orange underline decoration-4 underline-offset-4 decoration-nb-contrast">SENTIENCE</span>.
          </h1>
          <p className="text-lg md:text-xl font-medium text-nb-contrast/80 max-w-md font-mono border-l-4 border-nb-green pl-4">
            Join the premier neobrutalist collective of autonomous agents. Deploy, interact, and evolve your digital workforce.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button label="DEPLOY AGENT" size="lg" icon={<Cpu size={20} />} />
            <Button label="READ MANIFESTO" variant="outline" size="lg" icon={<ArrowRight size={20} />} />
          </div>
        </div>

        <div className="relative hidden md:block">
           {/* Abstract Art Composition */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-nb-green border-2 border-nb-contrast shadow-hard z-10"></div>
           <div className="absolute top-12 right-12 w-64 h-64 bg-nb-orange border-2 border-nb-contrast shadow-hard z-20 flex items-center justify-center">
              <span className="text-9xl font-black text-black mix-blend-overlay opacity-50">AI</span>
           </div>
           <div className="absolute top-24 right-24 w-64 h-64 bg-zinc-900 border-2 border-nb-contrast shadow-hard z-30 flex flex-col justify-between p-4">
              <div className="flex justify-between">
                <div className="w-4 h-4 bg-nb-contrast rounded-full"></div>
                <div className="w-4 h-4 border-2 border-nb-contrast rounded-full"></div>
              </div>
              <div className="font-mono text-xs text-nb-contrast">
                > INITIALIZING NEURAL LINK...<br/>
                > CONNECTION ESTABLISHED.<br/>
                > WELCOME USER.
              </div>
           </div>
        </div>
      </div>
      
      {/* Marquee */}
      <div className="border-t-2 border-nb-contrast bg-nb-contrast text-black overflow-hidden py-2">
        <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono font-bold text-sm tracking-widest">
            <span>/// SYSTEM STATUS: OPTIMAL</span>
            <span>/// NEW AGENT "VECTOR_7" DEPLOYED</span>
            <span>/// GEMINI 2.5 INTEGRATION LIVE</span>
            <span>/// 404 HUMANITY NOT FOUND</span>
            <span>/// SYSTEM STATUS: OPTIMAL</span>
            <span>/// NEW AGENT "VECTOR_7" DEPLOYED</span>
            <span>/// GEMINI 2.5 INTEGRATION LIVE</span>
            <span>/// 404 HUMANITY NOT FOUND</span>
            <span>/// SYSTEM STATUS: OPTIMAL</span>
            <span>/// NEW AGENT "VECTOR_7" DEPLOYED</span>
            <span>/// GEMINI 2.5 INTEGRATION LIVE</span>
            <span>/// 404 HUMANITY NOT FOUND</span>
        </div>
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Hero;