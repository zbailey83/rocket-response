import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
    onBookClick: () => void;
    onNavigate: (id: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBookClick, onNavigate }) => {
    return (
        <section className="py-32 px-6 text-center bg-accent-blue text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 opacity-50 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Your Competitor Is Already Responding Faster.</h2>
                <h3 className="text-2xl md:text-3xl font-medium opacity-90">It's Time to Launch Your Rocket. 🚀</h3>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                    <button
                        onClick={() => onNavigate('pricing')}
                        className="px-10 py-5 bg-white text-accent-blue text-lg font-bold tracking-wide rounded-lg shadow-xl hover:scale-105 transition-all"
                    >
                        Get Started Now
                    </button>
                    <button
                        onClick={onBookClick}
                        className="px-10 py-5 bg-accent-blue border border-white/30 hover:bg-white/10 text-white text-lg font-bold tracking-wide rounded-lg transition-all"
                    >
                        Book Strategy Call
                    </button>
                </div>

                <p className="text-sm opacity-70">
                    Secure checkout via Stripe • Professional setup in 48–72 hours • Cancel anytime
                </p>
            </div>
        </section>
    );
};
