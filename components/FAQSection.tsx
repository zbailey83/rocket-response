import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection: React.FC = () => {
    const faqs = [
        {
            q: "Will my customers know they're talking to AI?",
            a: "Most won't. Our AI voice agent uses advanced natural language processing and sounds remarkably human. For text-based conversations, the AI communicates in a natural, conversational tone. We can also configure your agent to disclose it's an AI if you prefer."
        },
        {
            q: "How long does setup take?",
            a: "Most businesses are fully live within 48–72 hours. We handle everything: custom training, channel integration, and testing. You just review and approve."
        },
        {
            q: "What happens if the AI can't handle a question?",
            a: "Rocket Response AI is smart enough to know its limits. When a conversation requires human intervention (complex issues, upset customers), it seamlessly escalates to you via instant notification (text, email, app). You can jump in anytime."
        },
        {
            q: "Can I customize what the AI says?",
            a: "Absolutely. We work with you to define your AI's personality, approved responses, pricing guidelines, and brand voice. You have full control."
        },
        {
            q: "Do I need any technical skills?",
            a: "Zero. We handle all technical setup. If you can answer questions about your business in a 15-minute onboarding call, you're good to go."
        },
        {
            q: "Is there a contract?",
            a: "No. All plans are month-to-month. Cancel anytime. We also offer a 30-day money-back guarantee."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-zinc-50 dark:bg-zinc-900">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-zinc-500">Everything you need to know about getting started.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} question={faq.q} answer={faq.a} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
                <span>{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
            </button>
            <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
            >
                <p className="text-zinc-500 leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};
