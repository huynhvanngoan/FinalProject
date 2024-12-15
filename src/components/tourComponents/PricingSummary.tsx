// src/components/booking/PricingSummary.tsx
import React from "react";

type PricingSummaryProps = {
    totalPrice: {
        baseTourCost: number;
        servicesCost: number;
        totalCost: number;
    };
};

export const PricingSummary: React.FC<PricingSummaryProps> = React.memo(
    ({ totalPrice }) => {
        return (
            <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">
                    Pricing Breakdown
                </h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Base Tour Cost:</span>
                        <span>${totalPrice.baseTourCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Additional Services:</span>
                        <span>${totalPrice.servicesCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-primary">
                        <span>Total Cost:</span>
                        <span>${totalPrice.totalCost.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        );
    }
);

// Add display name to resolve potential eslint warnings
PricingSummary.displayName = "PricingSummary";
