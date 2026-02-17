import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PricingSection } from '../components/PricingSection';
import { ComparisonTable } from '../components/ComparisonTable';
import { FAQSection } from '../components/FAQSection';
import { ROICalculator } from '../components/ROICalculator';
import { FinalCTA } from '../components/FinalCTA';

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

            <FinalCTA onBookClick={onBookClick} onNavigate={onNavigate} />
        </div>
    );
};
