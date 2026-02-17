import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { FinalCTA } from '../components/FinalCTA';
import { RocketLogo } from '../components/RocketLogo';
import Hero from '../components/ui/animated-shader-hero';
import { FeaturesSectionWithHoverEffects } from '../components/ui/feature-section-with-hover-effects';
import { PhoneMissed, Clock, CheckCircle2, ArrowRight, MessageSquare, Phone, Globe, Calendar, Smartphone } from 'lucide-react';

interface HomePageProps {
    theme: 'dark' | 'light';
    onBookClick: () => void;
    onNavigate: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ theme, onBookClick, onNavigate }) => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <>
            {/* HERO SECTION */}
            {/* HERO SECTION */}
            <Hero
                showLogo={true}
                headline={{
                    line1: "ROCKET RESPONSE AI",
                    line2: ""
                }}
                tagline="Voice Automation Systems"
                subtitle="AI-Powered Agents That Answer, Book, and Follow Up With Every Lead — 24/7/365."
                buttons={{
                    primary: {
                        text: "Get Started Now",
                        onClick: () => onNavigate('pricing')
                    },
                    secondary: {
                        text: "Try Live Demo",
                        onClick: () => onNavigate('/pricing#demo')
                    }
                }}
            />



            {/* SOLUTION SECTION */}
            <section id="solution" className="py-24 bg-white dark:bg-zinc-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold">Meet Your New <br /><span className="text-accent-blue">AI-Powered Team Member</span></h2>
                            <p className="text-lg text-zinc-500">
                                Rocket Response AI isn't just a chatbot. It's a fully trained agent that knows your business, answers calls with a human voice, books appointments, and follows up forever.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: <Phone className="w-4 h-4" />, title: "Phone Calls", desc: "Answers, qualifies, and books." },
                                    { icon: <MessageSquare className="w-4 h-4" />, title: "SMS / Text", desc: "Instant text responses & follow-up." },
                                    { icon: <Globe className="w-4 h-4" />, title: "Web Forms", desc: "Responds in <60 seconds." },
                                    { icon: <Calendar className="w-4 h-4" />, title: "Booking", desc: "Syncs with your calendar." },
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-accent-blue shrink-0">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">{feature.title}</h4>
                                            <p className="text-xs text-zinc-500 mt-1">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl h-[400px] flex flex-col justify-between overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] pointer-events-none"></div>

                                <div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="ml-auto text-xs font-mono text-zinc-500">ACTIVE_AGENT_V2</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-4 items-end">
                                        <div className="bg-zinc-800 rounded-2xl rounded-bl-none p-3 text-sm text-zinc-300 max-w-[80%]">
                                            Hi, this is Sarah from Mike's Plumbing. I see you missed a call from us. How can I help you today?
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-end flex-row-reverse">
                                        <div className="bg-accent-blue rounded-2xl rounded-br-none p-3 text-sm text-white max-w-[80%]">
                                            My water heater is leaking all over the garage! Can you send someone out?
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-end">
                                        <div className="bg-zinc-800 rounded-2xl rounded-bl-none p-3 text-sm text-zinc-300 max-w-[80%]">
                                            I can definitely help with that. Is it a gas or electric water heater? And are you available for an emergency technician to come by in about an hour?
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-green-500 font-mono">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span>BOOKING_IN_PROGRESS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* HOW IT WORKS */}
            <HowItWorksSection />

            {/* FEATURES LIST */}
            <section id="features" className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need. Nothing You Don't.</h2>
                        <p className="text-zinc-500 text-lg">Powerful AI features designed specifically for real local service businesses.</p>
                    </div>

                    <FeaturesSectionWithHoverEffects />
                </div>
            </section>

            {/* SOCIAL PROOF */}
            <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold">Real Businesses.<br />Real Results.</h2>

                            <blockquote className="space-y-4">
                                <p className="text-xl md:text-2xl font-medium leading-relaxed italic opacity-90">
                                    "We were missing 40% of our calls because my guys are on job sites all day. Rocket Response AI answered every single one. We booked <span className="text-green-400 font-bold">$47,000</span> in new jobs in the first 30 days."
                                </p>
                                <footer className="text-sm text-zinc-400">
                                    — Mike R., Owner, R&M Plumbing (Phoenix, AZ)
                                </footer>
                            </blockquote>

                            <blockquote className="space-y-4">
                                <p className="text-xl md:text-2xl font-medium leading-relaxed italic opacity-90">
                                    "I was paying $3,200/month for a call center. Rocket Response costs a fraction of that and actually books jobs. It's not even close."
                                </p>
                                <footer className="text-sm text-zinc-400">
                                    — Sarah K., Operations Manager, BrightStar Electric (Dallas, TX)
                                </footer>
                            </blockquote>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { label: "Avg Response Time", value: "38 sec" },
                                { label: "Increase in Bookings", value: "+147%" },
                                { label: "Reduction in Missed Calls", value: "94%" },
                                { label: "ROI (First 90 Days)", value: "11x" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur border border-white/10 p-6 rounded-2xl flex flex-col justify-center text-center">
                                    <div className="text-3xl md:text-4xl font-bold mb-2 font-mono-tech">{stat.value}</div>
                                    <div className="text-xs uppercase tracking-wider text-zinc-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <FinalCTA onBookClick={onBookClick} onNavigate={onNavigate} />
        </>
    );
};
