/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, Network, Code, Terminal, Brain, Cpu, Globe } from 'lucide-react';

// --- EXOPLANET TRANSIT DIAGRAM ---
// Visualizes a planet passing in front of a star and the dip in light curve
export const ExoplanetTransitDiagram: React.FC = () => {
  const [phase, setPhase] = useState(0); // 0 to 100
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 0.5) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Calculate position: -50 to 50 relative to center
  const position = phase - 50; 
  
  // Calculate flux drop when planet (-10 to 10) is over star (-20 to 20)
  const isTransiting = Math.abs(position) < 25;
  const flux = isTransiting ? 0.85 : 1.0;

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-2 text-stone-800">Atmospheric Analysis</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        Simulating transit photometry to detect exoplanets and analyze their atmospheric composition via spectral flux variations.
      </p>
      
      <div className="relative w-full max-w-md h-40 bg-[#1a1a1a] rounded-lg overflow-hidden mb-4 flex items-center justify-center">
         {/* Star */}
         <div className="w-32 h-32 rounded-full bg-[#C5A059] shadow-[0_0_30px_#C5A059]"></div>
         
         {/* Planet */}
         <div 
            className="absolute w-8 h-8 rounded-full bg-black border border-stone-700 z-10"
            style={{ 
                left: `${phase}%`, 
                transform: 'translateX(-50%)'
            }}
         ></div>
      </div>

      {/* Light Curve Graph */}
      <div className="w-full max-w-md h-32 border-l border-b border-stone-300 relative bg-[#F9F8F4]">
        <div className="absolute top-2 left-2 text-xs font-mono text-stone-400">BRIGHTNESS FLUX</div>
        <div className="absolute bottom-[-20px] right-0 text-xs font-mono text-stone-400">TIME</div>
        
        {/* Dynamic Line */}
        <svg className="w-full h-full overflow-visible">
            <polyline 
                points={`0,10 ${phase * 4},10 ${phase * 4},${isTransiting ? 50 : 10} 400,${isTransiting ? 50 : 10}`}
                fill="none"
                stroke="#C5A059"
                strokeWidth="2"
            />
            {/* The plotted curve history would be complex to animate perfectly in React state without canvas, 
                so we simulate the current reading dot */}
            <circle 
                cx={`${phase}%`} 
                cy={isTransiting ? "70%" : "20%"} 
                r="4" 
                fill="#C5A059" 
            />
        </svg>
      </div>
    </div>
  );
};

// --- NEURAL NETWORK FLOW ---
// Visualizes layers of a model processing data
export const NeuralNetworkDiagram: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLayer(l => (l + 1) % 5);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const layers = [
        { name: "Input", color: "bg-stone-300" },
        { name: "Conv2D", color: "bg-stone-400" },
        { name: "ReLU", color: "bg-stone-500" },
        { name: "Dense", color: "bg-stone-600" },
        { name: "Output", color: "bg-nobel-gold" },
    ];

    return (
        <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
            <h3 className="font-serif text-xl mb-4 text-stone-900">ML Pipeline Visualization</h3>
            <p className="text-sm text-stone-600 mb-8 text-center max-w-md">
                Representative architecture for DermaTrack and Predictive Irrigation models.
            </p>

            <div className="flex items-center gap-2 md:gap-4">
                {layers.map((layer, idx) => (
                    <div key={idx} className="flex items-center">
                        <div className={`flex flex-col items-center gap-2 transition-all duration-300 ${activeLayer === idx ? 'scale-110' : 'opacity-60'}`}>
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg border-2 border-stone-300 flex items-center justify-center ${activeLayer === idx ? 'bg-white shadow-md border-nobel-gold' : 'bg-stone-100'}`}>
                                <Activity size={20} className={activeLayer === idx ? 'text-nobel-gold' : 'text-stone-400'} />
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">{layer.name}</span>
                        </div>
                        {idx < layers.length - 1 && (
                            <div className="w-4 h-0.5 bg-stone-300 mx-1 md:mx-2">
                                <motion.div 
                                    className="h-full bg-nobel-gold" 
                                    initial={{ width: "0%" }}
                                    animate={{ width: activeLayer === idx ? "100%" : "0%" }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="mt-8 p-4 bg-white rounded border border-stone-200 w-full max-w-sm">
                <div className="flex justify-between text-xs font-mono text-stone-500 mb-2">
                    <span>STATUS</span>
                    <span className={activeLayer === 4 ? "text-green-600 font-bold" : "text-stone-400"}>
                        {activeLayer === 4 ? "CLASSIFICATION COMPLETE" : "PROCESSING..."}
                    </span>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-nobel-gold"
                        animate={{ width: `${((activeLayer + 1) / 5) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

// --- TECH STACK GRID ---
export const TechStackGrid: React.FC = () => {
    const skills = [
        { icon: <Code size={20} />, name: "Python", cat: "Core" },
        { icon: <Terminal size={20} />, name: "C++", cat: "Core" },
        { icon: <Brain size={20} />, name: "PyTorch", cat: "ML/AI" },
        { icon: <Network size={20} />, name: "TensorFlow", cat: "ML/AI" },
        { icon: <Database size={20} />, name: "SQL", cat: "Data" },
        { icon: <Globe size={20} />, name: "React", cat: "Web" },
        { icon: <Activity size={20} />, name: "Mathematica", cat: "Science" },
        { icon: <Cpu size={20} />, name: "LaTeX", cat: "Docs" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {skills.map((skill, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-stone-200 hover:border-nobel-gold transition-colors hover:shadow-sm group">
                    <div className="text-stone-400 group-hover:text-nobel-gold mb-2 transition-colors">
                        {skill.icon}
                    </div>
                    <span className="font-serif font-medium text-stone-800">{skill.name}</span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">{skill.cat}</span>
                </div>
            ))}
        </div>
    );
}