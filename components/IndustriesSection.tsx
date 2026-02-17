import React from 'react';
import { Wrench, Stethoscope, Scale, Car, Home } from 'lucide-react';

export const IndustriesSection: React.FC = () => {
    const industries = [
        {
            icon: <Wrench className="w-6 h-6" />,
            title: "Home Services",
            items: ["Plumbing", "HVAC", "Electrical", "Roofing", "Landscaping", "Pest Control", "Cleaning", "Painting"]
        },
        {
            icon: <Stethoscope className="w-6 h-6" />,
            title: "Health & Wellness",
            items: ["Dental", "Chiropractic", "Med Spas", "Veterinary", "Mental Health", "Physical Therapy"]
        },
        {
            icon: <Scale className="w-6 h-6" />,
            title: "Professional Services",
            items: ["Law Firms", "Accounting/Tax", "Insurance Agencies", "Real Estate"]
        },
        {
            icon: <Car className="w-6 h-6" />,
            title: "Automotive",
            items: ["Auto Repair", "Auto Detailing", "Body Shops", "Towing"]
        },
        {
            icon: <Home className="w-6 h-6" />,
            title: "Property Services",
            items: ["Property Management", "Restoration", "Moving Companies"]
        }
    ];

    return (
        <section id="industries" className="py-24 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold">Built for Local Service Businesses</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        We understand your customers because we've trained AI agents for thousands of businesses just like yours.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industries.map((industry, index) => (
                        <div key={index} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 hover:border-accent-blue/50 transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 transition-transform">
                                {industry.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{industry.title}</h3>
                            <ul className="space-y-2">
                                {industry.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue/50"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="bg-gradient-to-br from-accent-blue to-purple-600 rounded-2xl p-8 text-white flex flex-col justify-center items-center text-center space-y-4">
                        <h3 className="text-2xl font-bold">Don't see your industry?</h3>
                        <p className="text-white/80">We've probably built for it. Our agents are fully customizable.</p>
                        <button className="px-6 py-2 bg-white text-accent-blue font-bold rounded hover:bg-zinc-100 transition-colors">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
