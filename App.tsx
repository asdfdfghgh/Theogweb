
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, NeuralConstellationScene, SubtleBackground } from './components/QuantumScene';
import { ExoplanetTransitDiagram, NeuralNetworkDiagram, TechStackGrid } from './components/Diagrams';
// Fix: Added Brain and Globe to imports to resolve "Cannot find name" errors
import { ArrowDown, Menu, X, ExternalLink, Mail, Github, Linkedin, Award, Book, Code, User, Rocket, Brain, Globe, FlaskConical, Mic, Radio, Microscope, Activity, Cpu, Database } from 'lucide-react';

const ProjectCard = ({ title, role, date, description, tags, link }: { title: string, role?: string, date?: string, description: string, tags?: string[], link?: string }) => {
  return (
    <div className="flex flex-col p-8 bg-white/80 backdrop-blur-md rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full hover:border-nobel-gold/50 group h-full relative z-10">
      <div className="flex justify-between items-start mb-2">
         <h3 className="font-serif text-2xl text-stone-900">{title}</h3>
         {link && <a href={link} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-nobel-gold"><ExternalLink size={18}/></a>}
      </div>
      {(role || date) && (
        <div className="text-xs text-stone-500 font-bold uppercase tracking-widest mb-4 flex gap-3">
          {role && <span>{role}</span>}
          {role && date && <span>•</span>}
          {date && <span>{date}</span>}
        </div>
      )}
      <p className="text-stone-600 leading-relaxed mb-6 flex-grow">{description}</p>
      {tags && (
        <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-wider rounded-sm group-hover:bg-[#F9F8F4] group-hover:text-nobel-gold transition-colors">
                    {tag}
                </span>
            ))}
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="mb-12 relative z-10">
        <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">{subtitle || "Explore"}</div>
        <h2 className="font-serif text-4xl md:text-5xl text-stone-900 relative inline-block">
            {title}
            <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-nobel-gold"></div>
        </h2>
    </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/95 backdrop-blur-md shadow-sm py-4 border-b border-stone-200' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-sm flex items-center justify-center text-stone-900 font-serif font-bold text-xl shadow-sm pb-1">S</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              SJM <span className="font-normal text-stone-500 text-sm hidden sm:inline">| Subhra Jyoti Mishra</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-stone-600">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors uppercase">About</a>
            <a href="#publications" onClick={scrollToSection('publications')} className="hover:text-nobel-gold transition-colors uppercase">Research</a>
            <a href="#awards" onClick={scrollToSection('awards')} className="hover:text-nobel-gold transition-colors uppercase">Awards</a>
            <a href="#lab" onClick={scrollToSection('lab')} className="hover:text-nobel-gold transition-colors uppercase">Lab</a>
            <a href="#experience" onClick={scrollToSection('experience')} className="hover:text-nobel-gold transition-colors uppercase">Experience</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="px-4 py-2 bg-stone-900 text-white hover:bg-stone-700 transition-colors uppercase">Contact</a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#about" onClick={scrollToSection('about')}>About</a>
            <a href="#publications" onClick={scrollToSection('publications')}>Research</a>
            <a href="#awards" onClick={scrollToSection('awards')}>Awards</a>
            <a href="#lab" onClick={scrollToSection('lab')}>Lab Work</a>
            <a href="#experience" onClick={scrollToSection('experience')}>Experience</a>
            <a href="#contact" onClick={scrollToSection('contact')}>Contact</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
        <HeroScene />
        
        {/* Gradient Overlay - Optimized for visibility */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0)_10%,rgba(249,248,244,0.1)_40%,#F9F8F4_100%)]" />

        <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12">
            
            <div className="text-center md:text-left max-w-2xl bg-white/40 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-sm">
                <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/50">
                    Hello
                </div>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-6 text-stone-900">
                    Subhra Jyoti Mishra
                </h1>
                <p className="font-serif text-2xl md:text-3xl text-stone-600 italic mb-4">
                    5th Year Integrated M.Sc. in Physics
                </p>
                <p className="max-w-xl text-sm md:text-base text-stone-500 font-bold tracking-widest uppercase mb-10">
                    Machine Learning and Exoplanet Researcher | Freelance Developer | NISER Bhubaneswar
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a href="#publications" onClick={scrollToSection('publications')} className="group flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-sm hover:bg-stone-800 transition-all">
                        <span>Discover Work</span>
                        <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                    </a>
                    <a href="#contact" onClick={scrollToSection('contact')} className="px-6 py-3 border border-stone-900 text-stone-900 rounded-sm hover:bg-stone-100 transition-all text-center">
                        Get in Touch
                    </a>
                </div>
            </div>

            {/* Profile Picture Slot */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-nobel-gold rounded-full opacity-30 group-hover:opacity-70 blur transition-opacity duration-300"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl bg-stone-200 flex items-center justify-center">
                    <div className="flex flex-col items-center text-stone-400">
                        <User size={64} strokeWidth={1} />
                        <span className="text-xs font-bold tracking-widest uppercase mt-2">Add Photo</span>
                    </div>
                </div>
            </div>

        </div>
      </header>

      <main>
        {/* About & Interests */}
        <section id="about" className="py-24 bg-white relative overflow-hidden">
          <SubtleBackground />
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 items-start relative z-10">
            <div className="md:col-span-5">
              <SectionTitle title="Research Interests" subtitle="About Me" />
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                I am a student at the <strong className="text-stone-900">National Institute of Science Education and Research (NISER)</strong>, specializing in Computational Astrophysics and Machine Learning.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
               I am a physics major with a specialization in *computation, astrophysics*, and *machine learning*. My research focuses on the integration of ML models across diverse applications, as well as the development of advanced neural network architectures to solve complex scientific challenges.
              </p>
            </div>
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-[#F9F8F4]/80 backdrop-blur-sm border border-stone-200 rounded-lg hover:border-nobel-gold transition-colors group">
                    <Rocket className="text-nobel-gold mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="font-serif text-xl mb-2">Computational Astrophysics</h3>
                    <p className="text-sm text-stone-500">Modeling large-scale cosmic phenomena and N-body dynamics.</p>
                </div>
                <div className="p-6 bg-[#F9F8F4]/80 backdrop-blur-sm border border-stone-200 rounded-lg hover:border-nobel-gold transition-colors group">
                    <Brain className="text-nobel-gold mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="font-serif text-xl mb-2">Machine Learning</h3>
                    <p className="text-sm text-stone-500">Applying AI to astrophysical datasets and real-world predictions.</p>
                </div>
                <div className="p-6 bg-[#F9F8F4]/80 backdrop-blur-sm border border-stone-200 rounded-lg hover:border-nobel-gold transition-colors group">
                    <Code className="text-nobel-gold mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="font-serif text-xl mb-2">GPT & AI Tools</h3>
                    <p className="text-sm text-stone-500">Developing generative models for scientific and social use cases.</p>
                </div>
                <div className="p-6 bg-[#F9F8F4]/80 backdrop-blur-sm border border-stone-200 rounded-lg hover:border-nobel-gold transition-colors group">
                    <Globe className="text-nobel-gold mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="font-serif text-xl mb-2">Web Development</h3>
                    <p className="text-sm text-stone-500">Building responsive portfolios and data-driven research tools.</p>
                </div>
            </div>
          </div>
        </section>

        {/* Publications (Distinct Page/Section) */}
        <section id="publications" className="py-24 bg-[#F5F4F0] border-t border-stone-200 min-h-[80vh] flex flex-col justify-center relative overflow-hidden">
            <SubtleBackground />
            <div className="container mx-auto px-6 relative z-10">
                <SectionTitle title="Publications" subtitle="Academic Research" />
                
                <div className="mb-12">
                    <h3 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-3">
                        <Book className="text-nobel-gold" size={24} />
                        Published Works
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         <ProjectCard 
                            title="Predictive irrigation: current practice and future prospects"
                            role="First Author"
                            date="2024"
                            description="A comprehensive review on integrating IoT and ML for optimizing water usage in agriculture. Published in 'Hyperautomation in Precision Agriculture'."
                            tags={["Chapter", "Elsevier", "IoT", "ML"]}
                            link="https://doi.org/10.1016/B978-0-443-24139-0.00022-9"
                         />
                         <ProjectCard 
                            title="IoT4Irrigation"
                            role="Co-Author"
                            date="June 2024"
                            description="Integrating IoT and Machine Learning for Low-Cost Sustainable Agriculture. Presented at ICICBDA-2024."
                            tags={["Springer", "Conference", "Sustainability"]}
                            link="https://doi.org/10.1007/978-3-031-74701-4_24"
                         />
                    </div>
                </div>

                <div>
                    <h3 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-3">
                         <Microscope className="text-nobel-gold" size={24} />
                         Under Review
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ProjectCard 
                            title="Spectral Analysis of Hot Jupiters using Deep Learning"
                            role="First Author"
                            date="Submitted 2025"
                            description="A novel approach to characterizing exoplanetary atmospheres by training Convolutional Neural Networks on synthetic transit spectroscopy data."
                            tags={["Astrophysics", "Deep Learning", "Spectroscopy"]}
                         />
                         <ProjectCard 
                            title="Optimizing Radio Interferometry Data with Generative AI"
                            role="Co-Author"
                            date="Submitted 2025"
                            description="Utilizing GANs to reconstruct missing baselines in radio telescope observations, improving image fidelity for low-frequency arrays."
                            tags={["Radio Astronomy", "GANs", "Signal Processing"]}
                         />
                    </div>
                </div>
            </div>
        </section>

        {/* Awards & Conferences (Distinct Page/Section) */}
        <section id="awards" className="py-24 bg-white border-t border-stone-200 min-h-[60vh] relative overflow-hidden">
            <SubtleBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <SectionTitle title="Honors & Awards" subtitle="Recognition" />
                        <div className="bg-[#F9F8F4]/90 backdrop-blur-md p-8 rounded-xl border border-stone-200 shadow-sm h-full">
                            <ul className="space-y-8">
                                <li className="flex gap-4 items-start">
                                    <div className="p-2 bg-white rounded-full border border-stone-200 text-nobel-gold shadow-sm">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-stone-900 leading-tight mb-1">1st Place - Hackathon 2025</h4>
                                        <p className="text-stone-500 font-serif italic">IISC Bangalore</p>
                                        <p className="text-sm text-stone-600 mt-2">Winner of the ChatGPT and AI Tools track for innovative use of LLMs in scientific workflows.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="p-2 bg-white rounded-full border border-stone-200 text-nobel-gold shadow-sm">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-stone-900 leading-tight mb-1">Chanakya Fellowship</h4>
                                        <p className="text-stone-500 font-serif italic">IIT Bombay (2023)</p>
                                        <p className="text-sm text-stone-600 mt-2">Awarded for excellence in interdisciplinary research connecting IoT and Agriculture.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="p-2 bg-white rounded-full border border-stone-200 text-nobel-gold shadow-sm">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-stone-900 leading-tight mb-1">Wolfram Summer School Selection</h4>
                                        <p className="text-stone-500 font-serif italic">Boston (2025)</p>
                                        <p className="text-sm text-stone-600 mt-2">Selected for the prestigious Science & Technology Track.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                         <SectionTitle title="Conferences & Talks" subtitle="Dissemination" />
                         <div className="bg-[#F9F8F4]/90 backdrop-blur-md p-8 rounded-xl border border-stone-200 shadow-sm h-full">
                            <ul className="space-y-8">
                                <li className="flex gap-4 items-start">
                                    <div className="p-2 bg-white rounded-full border border-stone-200 text-stone-700 shadow-sm">
                                        <Mic size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-stone-900 leading-tight mb-1">Distinguished Speaker</h4>
                                        <p className="text-stone-500 font-serif italic">Global Summit on Recycling & Waste Management, Berlin (2025)</p>
                                        <p className="text-sm text-stone-600 mt-2">Topic: "AI-Driven Waste Sorting Mechanisms".</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="p-2 bg-white rounded-full border border-stone-200 text-stone-700 shadow-sm">
                                        <Mic size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-stone-900 leading-tight mb-1">Presenter</h4>
                                        <p className="text-stone-500 font-serif italic">ICICBDA-2024</p>
                                        <p className="text-sm text-stone-600 mt-2">Presented paper on IoT4Irrigation and sustainable automation.</p>
                                    </div>
                                </li>
                            </ul>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Lab Experiments (New Distinct Page/Section) */}
        <section id="lab" className="py-24 bg-[#1a1a1a] text-stone-200 relative overflow-hidden">
             {/* Subtle background element */}
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-nobel-gold rounded-full blur-[150px]"></div>
             </div>
             
             {/* Add constellations to dark background too */}
             <div className="absolute inset-0 opacity-40 pointer-events-none">
                <NeuralConstellationScene color="#C5A059" />
             </div>

             <div className="container mx-auto px-6 relative z-10">
                <div className="mb-12">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">Experimental Physics</div>
                    <h2 className="font-serif text-4xl md:text-5xl text-white relative inline-block">
                        Lab Workbench
                        <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-nobel-gold"></div>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { 
                            icon: <FlaskConical className="text-nobel-gold" />, 
                            title: "Double Slit with Lasers", 
                            desc: "Demonstrating wave-particle duality and interference patterns using He-Ne lasers and precision slits." 
                        },
                        { 
                            icon: <Radio className="text-nobel-gold" />, 
                            title: "Muon Detection", 
                            desc: "Building a scintillator-based cosmic ray detector to measure muon flux at sea level." 
                        },
                        { 
                            icon: <Activity className="text-nobel-gold" />, 
                            title: "Chaotic Pendulum", 
                            desc: "Simulating and constructing a double pendulum to analyze phase space trajectories and chaos theory." 
                        },
                        { 
                            icon: <Cpu className="text-nobel-gold" />, 
                            title: "FPGA Logic Design", 
                            desc: "Implementing digital logic gates and counters on Xilinx FPGA boards for high-speed signal processing." 
                        },
                        { 
                            icon: <Microscope className="text-nobel-gold" />, 
                            title: "Optical Interferometry", 
                            desc: "Using a Michelson Interferometer to measure the wavelength of light and refractive indices of thin films." 
                        },
                        { 
                            icon: <Database className="text-nobel-gold" />, 
                            title: "Solar Spectrum Analysis", 
                            desc: "Capturing and analyzing Fraunhofer lines to determine solar elemental composition using a prism spectrometer." 
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:bg-white/10 hover:border-nobel-gold/50 transition-all group">
                            <div className="mb-4 p-3 bg-stone-900 rounded-lg inline-block group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h4 className="text-xl font-serif text-white mb-2">{item.title}</h4>
                            <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
             </div>
        </section>

        {/* Current Projects & Diagrams */}
        <section id="experience" className="py-24 bg-stone-900 text-stone-100 relative overflow-hidden border-t border-stone-800">
             <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
                <NeuralConstellationScene color="#C5A059" />
             </div>
             
             <div className="container mx-auto px-6 relative z-10">
                <SectionTitle title="Current Research" subtitle="In the Lab" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <div className="bg-stone-800/50 backdrop-blur-md p-8 rounded-xl border border-stone-700">
                        <h3 className="font-serif text-3xl mb-4 text-nobel-gold">Exoplanet Atmosphere Analysis</h3>
                        <p className="text-stone-300 mb-6 leading-relaxed">
                            Analyzing spectral data to determine atmospheric composition of distant worlds. By studying the light curve dips and spectral absorption lines during planetary transits, we can infer the presence of elements like Sodium, Potassium, and Water Vapor.
                        </p>
                        <div className="flex gap-3">
                             <span className="px-3 py-1 border border-stone-600 bg-stone-800 rounded-full text-xs uppercase tracking-wider text-stone-400">Spectroscopy</span>
                             <span className="px-3 py-1 border border-stone-600 bg-stone-800 rounded-full text-xs uppercase tracking-wider text-stone-400">Python</span>
                        </div>
                    </div>
                    <div>
                        <ExoplanetTransitDiagram />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                     <div className="order-2 lg:order-1">
                        <NeuralNetworkDiagram />
                    </div>
                    <div className="order-1 lg:order-2 bg-stone-800/50 backdrop-blur-md p-8 rounded-xl border border-stone-700">
                        <h3 className="font-serif text-3xl mb-4 text-nobel-gold">DermaTrack</h3>
                        <p className="text-stone-300 mb-6 leading-relaxed">
                            An ML-powered dermatological analysis tool designed to assist in the early detection of skin conditions. Using Convolutional Neural Networks (CNNs) trained on medical imaging datasets to classify skin lesions with high accuracy.
                        </p>
                         <div className="flex gap-3">
                             <span className="px-3 py-1 border border-stone-600 bg-stone-800 rounded-full text-xs uppercase tracking-wider text-stone-400">Computer Vision</span>
                             <span className="px-3 py-1 border border-stone-600 bg-stone-800 rounded-full text-xs uppercase tracking-wider text-stone-400">PyTorch</span>
                             <span className="px-3 py-1 border border-stone-600 bg-stone-800 rounded-full text-xs uppercase tracking-wider text-stone-400">Healthcare</span>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        {/* Experience & Freelance */}
        <section className="py-24 bg-white relative overflow-hidden">
            <SubtleBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="font-serif text-2xl mb-8 border-b border-stone-200 pb-4">Research Experience</h3>
                        <div className="space-y-8 border-l border-stone-200 pl-8 ml-4 relative">
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-nobel-gold rounded-full border-4 border-white"></div>
                                <h4 className="font-bold text-lg">Project Lead - Predictive Irrigation</h4>
                                <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">IIT Bombay (Chanakya Fellowship) | 2023-2024</p>
                                <p className="text-stone-600 text-sm">Collaborated with Jain Irrigation to develop smart systems integrating IoT sensor data.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-stone-300 rounded-full border-4 border-white"></div>
                                <h4 className="font-bold text-lg">Intern - Agnirva Space Program</h4>
                                <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">2025 | AICTE Recognized</p>
                                <p className="text-stone-600 text-sm">Worked with space-related datasets and AI pipelines under mentorship of scientists.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-5 h-5 bg-stone-300 rounded-full border-4 border-white"></div>
                                <h4 className="font-bold text-lg">Intern - IIT Indore</h4>
                                <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">2024</p>
                                <p className="text-stone-600 text-sm">Applied ML to remote sensing and satellite data for enhanced reliability.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl mb-8 border-b border-stone-200 pb-4">Freelance & Consulting</h3>
                         <div className="space-y-6">
                            <div className="p-6 bg-[#F9F8F4]/80 backdrop-blur-md rounded-lg border border-stone-200">
                                <h4 className="font-bold text-lg mb-1">AI Trainer</h4>
                                <p className="text-sm text-stone-500 mb-3">Outlier, Mercor</p>
                                <p className="text-stone-600 text-sm">Training and evaluating advanced AI models, improving coding capabilities and reasoning.</p>
                            </div>
                            <div className="p-6 bg-[#F9F8F4]/80 backdrop-blur-md rounded-lg border border-stone-200">
                                <h4 className="font-bold text-lg mb-1">Web Developer</h4>
                                <p className="text-sm text-stone-500 mb-3">Freelancer.com, Upwork</p>
                                <p className="text-stone-600 text-sm">Building responsive websites, portfolios, and technical documentation solutions for clients.</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-24 bg-[#F5F4F0] border-t border-stone-200 relative overflow-hidden">
            <SubtleBackground />
            <div className="container mx-auto px-6 relative z-10">
                <SectionTitle title="Technical Arsenal" subtitle="Skills" />
                <TechStackGrid />
            </div>
        </section>

        {/* Personal */}
        <section id="personal" className="py-24 bg-white relative overflow-hidden">
             <SubtleBackground />
             <div className="container mx-auto px-6 text-center relative z-10">
                 <SectionTitle title="Beyond the Lab" subtitle="Personal Interests" />
                 <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                    {[
                        { icon: "✍️", label: "Fictional Writing" },
                        { icon: "⚽", label: "Football" },
                        { icon: "📓", label: "Journaling" },
                        { icon: "🏸", label: "State Lvl Badminton" },
                        { icon: "🏃", label: "District Athlete" },
                        { icon: "🏅", label: "Marathons" },
                    ].map((item, i) => (
                        <div key={i} className="px-6 py-4 bg-[#F9F8F4]/80 backdrop-blur-sm rounded-full border border-stone-200 text-stone-700 font-serif text-lg hover:bg-stone-800 hover:text-nobel-gold transition-colors cursor-default">
                            <span className="mr-2">{item.icon}</span> {item.label}
                        </div>
                    ))}
                 </div>
             </div>
        </section>

      </main>

      {/* Contact */}
      <footer id="contact" className="bg-stone-900 text-stone-400 py-24 relative overflow-hidden">
        {/* Subtle effect in footer too */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
             <NeuralConstellationScene color="#C5A059" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-md">
                    <h2 className="text-white font-serif font-bold text-3xl mb-6">Let's Collaborate</h2>
                    <p className="mb-8 leading-relaxed">
                        I am always open to discussing new research opportunities, freelance projects, or just chatting about the cosmos and code.
                    </p>
                    <a href="mailto:subhrajyoti.mishra@niser.ac.in" className="inline-flex items-center gap-2 text-nobel-gold hover:text-white transition-colors text-lg">
                        <Mail size={20} /> subhrajyoti.mishra@niser.ac.in
                    </a>
                </div>
                
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-serif text-xl mb-2">Connect</h3>
                    <div className="flex gap-4">
                        <a href="#" className="p-3 bg-stone-800 rounded-full hover:bg-nobel-gold hover:text-stone-900 transition-colors"><Linkedin size={24}/></a>
                        <a href="#" className="p-3 bg-stone-800 rounded-full hover:bg-nobel-gold hover:text-stone-900 transition-colors"><Github size={24}/></a>
                        <a href="#" className="p-3 bg-stone-800 rounded-full hover:bg-nobel-gold hover:text-stone-900 transition-colors"><User size={24}/></a>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-stone-800 mt-16 pt-8 text-center text-xs text-stone-600 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; 2025 Subhra Jyoti Mishra. All rights reserved.</p>
                <p className="mt-2 md:mt-0">Built with React, Three.js & Tailwind</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
