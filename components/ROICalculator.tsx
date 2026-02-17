import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, AlertCircle, RefreshCw, Calculator } from 'lucide-react';

export const ROICalculator: React.FC = () => {
    const [leadsPerMonth, setLeadsPerMonth] = useState<number>(80);
    const [avgTicketValue, setAvgTicketValue] = useState<number>(450);
    const [missedCallRate, setMissedCallRate] = useState<number>(40);

    const [annualLoss, setAnnualLoss] = useState<number>(0);
    const [recoveredRevenue, setRecoveredRevenue] = useState<number>(0);

    useEffect(() => {
        // Formula: Leads * Ticket * (Missed% / 100) * 12 months
        const loss = leadsPerMonth * avgTicketValue * (missedCallRate / 100) * 12;
        setAnnualLoss(loss);

        // Assumption: Rocket Response recovers 70% of those missed leads
        setRecoveredRevenue(loss * 0.7);
    }, [leadsPerMonth, avgTicketValue, missedCallRate]);

    return (
        <section id="roi-calculator" className="py-24 bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
            <div className="max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            How Much Revenue Are You <span className="text-red-500">Leaving on the Table?</span>
                        </h2>
                        <p className="text-zinc-500 text-lg">
                            Most local businesses underestimate the cost of missed calls. Use our calculator to see exactly what "I'll call them back later" is costing you.
                        </p>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Leads / Inquiries Per Month</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="10" max="500" step="10"
                                        value={leadsPerMonth}
                                        onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                                        className="flex-1 w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-accent-blue"
                                    />
                                    <span className="font-mono-tech font-bold w-16 text-right">{leadsPerMonth}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Average Job / Ticket Value ($)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="100" max="5000" step="50"
                                        value={avgTicketValue}
                                        onChange={(e) => setAvgTicketValue(Number(e.target.value))}
                                        className="flex-1 w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-accent-blue"
                                    />
                                    <span className="font-mono-tech font-bold w-16 text-right">${avgTicketValue}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Missed Call Rate (%)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="10" max="90" step="5"
                                        value={missedCallRate}
                                        onChange={(e) => setMissedCallRate(Number(e.target.value))}
                                        className="flex-1 w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                                    />
                                    <span className="font-mono-tech font-bold w-16 text-right text-red-500">{missedCallRate}%</span>
                                </div>
                                <p className="text-xs text-zinc-400">Industry average is ~62% for small businesses.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-32 bg-accent-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="relative z-10 space-y-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-red-500 font-bold mb-1">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>ESTIMATED ANNUAL LOSS</span>
                                </div>
                                <div className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white font-mono-tech">
                                    ${annualLoss.toLocaleString()}
                                </div>
                                <p className="text-sm text-zinc-500">Revenue lost to voicemails and slow replies.</p>
                            </div>

                            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800"></div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-green-500 font-bold mb-1">
                                    <RefreshCw className="w-5 h-5" />
                                    <span>POTENTIAL RECOVERED</span>
                                </div>
                                <div className="text-4xl md:text-5xl font-bold tracking-tight text-green-500 font-mono-tech">
                                    ${recoveredRevenue.toLocaleString()}
                                </div>
                                <p className="text-sm text-zinc-500">
                                    Revenue you could save with Rocket Response AI (est. 70% recovery).
                                </p>
                            </div>

                            <div className="pt-4">
                                <button className="w-full py-4 bg-accent-blue hover:bg-blue-600 text-white font-bold rounded shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
                                    <Calculator className="w-4 h-4" />
                                    <span>Start Recovering Revenue Now</span>
                                </button>
                                <p className="text-center text-xs text-zinc-400 mt-3">
                                    Based on typical results. Your actual recovery rate may vary.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
