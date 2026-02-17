import React from 'react';
import { Phone, Brain, Plug, Rocket, TrendingUp } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
    const steps = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Discovery Call",
            desc: "15-min call to understand your business and goals."
        },
        {
            icon: <Brain className="w-6 h-6" />,
            title: "Custom AI Training",
            desc: "We build and train your AI on your specific data."
        },
        {
            icon: <Plug className="w-6 h-6" />,
            title: "Channel Setup",
            desc: "We connect your phone, website, and calendar."
        },
        {
            icon: <Rocket className="w-6 h-6" />,
            title: "Go Live",
            desc: "Your agent starts handling leads immediately."
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Optimize",
            desc: "We continually refine performance to maximize ROI."
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold">Up and Running in 72 Hours</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        Not 72 days. We handle the entire setup process for you.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[28px] left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-800 -z-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-4 bg-white dark:bg-zinc-950 p-4 md:p-0">
                                <div className="w-14 h-14 rounded-full bg-accent-blue text-white flex items-center justify-center shadow-lg shadow-blue-500/20 relative z-10 border-4 border-white dark:border-zinc-950">
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Step {i + 1}</h3>
                                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">{step.title}</h4>
                                    <p className="text-sm text-zinc-500">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm font-bold text-accent-blue bg-accent-blue/10 inline-block px-4 py-2 rounded-full">
                        Average time from signup to live: 48–72 hours
                    </p>
                </div>
            </div>
        </section>
    );
};
