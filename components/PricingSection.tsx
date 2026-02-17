import React from 'react';
import { Check } from 'lucide-react';

export const PricingSection: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
    return (
        <section id="pricing" className="py-24 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-accent-blue/5 -skew-y-3 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold">Simple, Transparent Pricing</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        No setup fees. No contracts. Cancel anytime. Start your journey today.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* STARTER */}
                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition-transform relative">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Starter</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold">$97</span>
                            <span className="text-zinc-500">/month</span>
                        </div>
                        <p className="text-sm text-zinc-500 mb-6 min-h-[40px]">Perfect for solopreneurs and micro-businesses just getting started.</p>

                        <button
                            onClick={() => window.open('https://buy.stripe.com/cNiaEWgqya9e6tT2sc4Rq00', '_blank')}
                            className="w-full py-3 border border-accent-blue text-accent-blue font-bold rounded hover:bg-accent-blue/5 transition-colors mb-8"
                        >
                            Get Started Now
                        </button>

                        <ul className="space-y-3 text-sm">
                            {[
                                "AI-powered SMS/text agent",
                                "Website chat widget",
                                "200 AI conversations/mo",
                                "Smart appointment booking",
                                "Basic follow-up sequence",
                                "Email support"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                    <span className="text-zinc-600 dark:text-zinc-400">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* GROWTH - POPULAR */}
                    <div className="bg-white dark:bg-zinc-950 border-2 border-accent-blue rounded-2xl p-8 shadow-2xl scale-105 relative z-20">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-blue text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                            Most Popular
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Growth</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold">$297</span>
                            <span className="text-zinc-500">/month</span>
                        </div>
                        <p className="text-sm text-zinc-500 mb-6 min-h-[40px]">The full AI receptionist + lead conversion engine for growing businesses.</p>

                        <button
                            onClick={() => window.open('https://buy.stripe.com/6oU14mgqy5SY4lL6Is4Rq01', '_blank')}
                            className="w-full py-4 bg-accent-blue hover:bg-blue-600 text-white font-bold rounded shadow-lg shadow-blue-500/25 transition-colors mb-8"
                        >
                            Get Started Now
                        </button>

                        <ul className="space-y-3 text-sm">
                            <li className="font-bold text-accent-blue">Everything in Starter, PLUS:</li>
                            {[
                                "AI Voice Agent (Inbound calling)",
                                "500 AI conversations/mo",
                                "Multi-channel (Phone + Text + Web)",
                                "Automated Review Requests",
                                "Detailed CRM Integration",
                                "Priority Support"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                    <span className="text-zinc-600 dark:text-zinc-400">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PRO */}
                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition-transform relative">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Pro</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold">$597</span>
                            <span className="text-zinc-500">/month</span>
                        </div>
                        <p className="text-sm text-zinc-500 mb-6 min-h-[40px]">Full-stack AI sales system for serious operators and teams.</p>

                        <button
                            onClick={() => window.open('https://buy.stripe.com/6oU4gygqygxCdWl7Mw4Rq02', '_blank')}
                            className="w-full py-3 border border-accent-blue text-accent-blue font-bold rounded hover:bg-accent-blue/5 transition-colors mb-8"
                        >
                            Get Started Now
                        </button>

                        <ul className="space-y-3 text-sm">
                            <li className="font-bold text-accent-blue">Everything in Growth, PLUS:</li>
                            {[
                                "1,500 AI conversations/mo",
                                "Database Reactivation Campaigns",
                                "Outbound AI Follow-up Calls",
                                "Multi-location support (up to 3)",
                                "Facebook/Instagram DM Auto-response",
                                "Dedicated Account Manager"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                                    <span className="text-zinc-600 dark:text-zinc-400">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>



            </div>
        </section>
    );
};
