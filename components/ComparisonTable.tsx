import React from 'react';
import { Check, X, HelpCircle } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
    return (
        <section id="comparison" className="py-24 bg-zinc-50 dark:bg-zinc-900 overflow-x-auto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold">Rocket Response AI vs. The Alternatives</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        See why Rocket Response AI is the smartest choice for your business.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                <th className="py-4 px-6 text-sm font-semibold text-zinc-500 uppercase tracking-wider">Feature</th>
                                <th className="py-4 px-6 text-sm font-bold text-accent-blue uppercase tracking-wider bg-accent-blue/5 border-t-4 border-accent-blue">Rocket Response AI</th>
                                <th className="py-4 px-6 text-sm font-semibold text-zinc-500 uppercase tracking-wider">Answering Service</th>
                                <th className="py-4 px-6 text-sm font-semibold text-zinc-500 uppercase tracking-wider">Receptionist</th>
                                <th className="py-4 px-6 text-sm font-semibold text-zinc-500 uppercase tracking-wider">DIY / Manual</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {[
                                { feature: "24/7/365 Availability", rocket: true, answer: false, reception: false, diy: false, manualText: "Limited Hours", receptionText: "40 hrs/week" },
                                { feature: "Response Time", rocket: "Under 60 seconds", answer: "3–15 minutes", reception: "2–10 minutes", diy: "47+ minutes" },
                                { feature: "Answers Phone Calls", rocket: true, answer: true, reception: true, diy: "Sometimes" },
                                { feature: "Responds to Texts", rocket: true, answer: false, reception: "Maybe", diy: "Sometimes" },
                                { feature: "Website Chat", rocket: true, answer: false, reception: false, diy: false },
                                { feature: "Web Form Response", rocket: true, answer: false, reception: "Manual", diy: "Manual" },
                                { feature: "Books Appointments", rocket: "✅ Automatically", answer: "❌ Takes Messages", reception: true, diy: true },
                                { feature: "Automated Follow-Up", rocket: true, answer: false, reception: false, diy: false },
                                { feature: "Lead Qualification", rocket: true, answer: "Basic", reception: true, diy: true },
                                { feature: "Review Requests", rocket: true, answer: false, reception: false, diy: "Manual" },
                                { feature: "Database Reactivation", rocket: true, answer: false, reception: false, diy: false },
                                { feature: "CRM Integration", rocket: true, answer: "Limited", reception: "Manual", diy: "Manual" },
                                { feature: "Cost", rocket: "Starting at $97/mo", answer: "$800–$3,000/mo", reception: "$3,000–$4,500/mo", diy: "\"Free\" + Lost Revenue" },
                                { feature: "Scales Instantly", rocket: true, answer: false, reception: false, diy: false },
                                { feature: "Never Calls in Sick", rocket: true, answer: "N/A", reception: false, diy: false },
                                { feature: "Gets Better Over Time", rocket: "✅ (Machine Learning)", answer: false, reception: "Maybe", diy: false },
                            ].map((row, i) => (
                                <tr key={i} className={`hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors ${i % 2 === 0 ? 'bg-white dark:bg-zinc-950' : 'bg-zinc-50 dark:bg-zinc-900'}`}>
                                    <td className="py-4 px-6 font-medium text-zinc-900 dark:text-zinc-100">{row.feature}</td>

                                    {/* Rocket Response Column */}
                                    <td className="py-4 px-6 bg-accent-blue/5 font-bold text-zinc-900 dark:text-zinc-100">
                                        {renderCell(row.rocket)}
                                    </td>

                                    {/* Other Columns */}
                                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">{renderCell(row.answer)}</td>
                                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">{renderCell(row.reception)}</td>
                                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">{renderCell(row.diy)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

const renderCell = (value: boolean | string) => {
    if (value === true) return <Check className="w-5 h-5 text-green-500" />;
    if (value === false) return <X className="w-5 h-5 text-red-500 opacity-50" />;
    if (typeof value === 'string') {
        if (value.startsWith('✅')) return <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> {value.replace('✅ ', '')}</span>;
        if (value.startsWith('❌')) return <span className="flex items-center gap-2"><X className="w-4 h-4 text-red-500" /> {value.replace('❌ ', '')}</span>;
        return value;
    }
    return value;
};
