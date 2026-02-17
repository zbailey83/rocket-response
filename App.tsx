import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DemoWidget } from './components/DemoWidget';
import { RocketLogo } from './components/RocketLogo';
import { PhoneMissed, Clock, TrendingUp, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookConsult = () => {
    window.open('https://calendly.com/zbailey83/30min', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col technical-grid relative text-zinc-900 dark:text-zinc-100 transition-colors duration-300 selection:bg-accent-blue/30">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onBookClick={handleBookConsult} 
        onNavigate={scrollToSection}
      />
      
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur text-xs font-mono-tech text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            AI VOICE AGENTS FOR LOCAL SERVICES
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Stop Losing Revenue to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Missed Calls</span>
          </h1>
          
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Your customers are calling when you're busy working. 
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold"> Rocket Responder</span> answers the phone 24/7, books appointments, and captures leads instantly using human-like AI.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection('demo')}
              className="px-8 py-4 bg-accent-blue hover:bg-blue-600 text-white font-bold tracking-wide rounded transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 group"
            >
              <span>Try the Live Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleBookConsult}
              className="px-8 py-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold tracking-wide rounded border border-zinc-200 dark:border-zinc-700 transition-all"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-2xl text-red-600 dark:text-red-400">
                <PhoneMissed className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">62% of Calls Go Unanswered</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Small business owners are busy on the job. Every missed call is a customer calling your competitor.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">After-Hours Demand</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Consumers search for services at night. If you don't answer at 8 PM, you lose the job for tomorrow morning.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-2xl text-green-600 dark:text-green-400">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">The Speed to Lead</h3>
              <p className="text-zinc-500 dark:text-zinc-400">You are 21x more likely to qualify a lead if you respond in 5 minutes. Voice AI responds instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES LIST */}
      <section id="features" className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
             <h2 className="text-3xl md:text-4xl font-bold leading-tight">
               Your New Best Employee <br/>
               <span className="text-accent-blue">Never Calls in Sick.</span>
             </h2>
             <p className="text-zinc-500 text-lg">
               Rocket Responder integrates directly with your existing phone line. We can handle overflow calls, after-hours calls, or everything.
             </p>
             
             <ul className="space-y-4">
               {[
                 "Instantly answers calls with your business name",
                 "Qualified leads are sent to you via SMS/Email",
                 "Books appointments directly into your calendar",
                 "Answers FAQs about pricing and service areas",
                 "Filters out spam calls automatically"
               ].map((item, i) => (
                 <li key={i} className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                   <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                 </li>
               ))}
             </ul>
             
             <button onClick={handleBookConsult} className="mt-4 text-accent-blue font-bold hover:underline flex items-center gap-2">
               See all features <ArrowRight className="w-4 h-4" />
             </button>
           </div>
           
           <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 to-purple-500/20 blur-3xl rounded-full"></div>
             <div className="relative bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Mock Chat/Transcript */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center shrink-0">👤</div>
                    <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm">
                      Do you have availability for a plumbing repair tomorrow?
                    </div>
                  </div>
                  <div className="flex gap-4 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center shrink-0 text-white">
                      <RocketLogo className="w-4 h-4" />
                    </div>
                    <div className="bg-accent-blue/10 border border-accent-blue/20 p-3 rounded-2xl rounded-tr-none text-sm">
                      Yes! We have a slot open at 2:00 PM. Would you like me to book that for you?
                    </div>
                  </div>
                   <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center shrink-0">👤</div>
                    <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm">
                      That works perfect.
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-green-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    APPOINTMENT_CONFIRMED
                  </div>
                  <Calendar className="w-4 h-4 text-zinc-400" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section id="demo" className="py-24 px-6 relative scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-3xl md:text-5xl font-bold">Experience the Future</h2>
             <p className="text-zinc-500 max-w-2xl mx-auto">
               Don't just take our word for it. Paste your website below, and our system will instantly train a voice agent on your business details.
             </p>
          </div>

          <DemoWidget theme={theme} />
          
          <div className="mt-8 text-center">
             <p className="text-xs font-mono-tech text-zinc-400">
               * This is a live demonstration using Google's Gemini 2.5 Flash model. Latency may vary based on network connection.
             </p>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Automate Your Phones?</h2>
          <p className="text-xl text-zinc-500">
            Book a free 15-minute strategy call. We'll show you exactly how much revenue you're losing and how to fix it.
          </p>
          <button 
            onClick={handleBookConsult}
            className="px-10 py-5 bg-accent-blue hover:bg-blue-600 text-white text-lg font-bold tracking-wide rounded shadow-xl shadow-blue-500/30 transition-all hover:scale-105"
          >
            Book Your Free Consultation
          </button>
        </div>
      </section>

      <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
             <RocketLogo className="w-5 h-5" />
             <span className="font-bold tracking-wider">ROCKET_RESPONDER</span>
          </div>
          <p className="text-xs text-zinc-500 font-mono-tech">
            © 2024 ROCKET RESPONDER AI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}