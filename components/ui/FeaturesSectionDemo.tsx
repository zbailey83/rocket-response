import React from "react";
import { FeaturesSectionWithHoverEffects } from "./feature-section-with-hover-effects";

export function FeaturesSectionWithHoverEffectsDemo() {
    return (
        <div className="min-h-screen w-full bg-black py-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Features Section Demo</h2>
                <FeaturesSectionWithHoverEffects />
            </div>
        </div>
    );
}
