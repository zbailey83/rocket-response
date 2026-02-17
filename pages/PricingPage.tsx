import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PricingSection } from '../components/PricingSection';
import { ComparisonTable } from '../components/ComparisonTable';
import { FAQSection } from '../components/FAQSection';
import { ROICalculator } from '../components/ROICalculator';
import { FinalCTA } from '../components/FinalCTA';
import { DemoWidget } from '../components/DemoWidget';

interface PricingPageProps {
    onBookClick: () => void;
    onNavigate: (id: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onBookClick, onNavigate }) => {
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
        <div className="pt-20">
            <div className="px-6 py-20 bg-zinc-50 dark:bg-zinc-900/50 text-center border-b border-zinc-200 dark:border-zinc-800">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Simple, Transparent Pricing</h1>
                <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                    Choose the plan that fits your business. No hidden fees. No long-term contracts.
                </p>
            </div>


            <PricingSection onBookClick={onBookClick} />

            <ROICalculator />

            <ComparisonTable />

            <FAQSection />

            {/* DEMO SECTION */}
            <section id="demo" className="py-24 px-6 relative bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 scroll-mt-28">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Experience the Future</h2>
                        <p className="text-zinc-500 max-w-2xl mx-auto">
                            Don't just take our word for it. Paste your website below, and our system will instantly train a voice agent on your business.
                        </p>
                    </div>

                    <DemoWidget theme="dark" />

                    <div className="mt-8 text-center">
                        <p className="text-xs font-mono-tech text-zinc-400">
                            * This is a live demonstration using Google's Gemini 2.5 Flash model.
                        </p>
                    </div>
                </div>
            </section>

            <FinalCTA onBookClick={onBookClick} onNavigate={onNavigate} />
        </div>
    );
};
