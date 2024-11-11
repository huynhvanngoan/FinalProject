import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";

interface NextPrevButtonProps {
    canPrev: boolean; // Determines if the "Prev" button should be enabled
    canNext: boolean; // Determines if the "Next" button should be enabled
    onPrev?: () => void; // Function to handle the "Prev" button click
    onNext?: () => void; // Function to handle the "Next" button click
}

const NextPrevButton: React.FC<NextPrevButtonProps> = ({
    canPrev,
    canNext,
    onPrev,
    onNext,
}) => {
    return (
        <div className="flex gap-4 items-center">
            {/* Previous Button */}
            <Button
                // onClick={canPrev ? onPrev : undefined}
                disabled={!canPrev}
                className={`flex-center size-12  rounded-full shadow-lg text-white transition duration-300 ${
                    canPrev
                        ? "hover:bg-primary hover:text-white cursor-pointer"
                        : "opacity-50 bg-white border-2 border-primary text-primary cursor-not-allowed"
                }`}
            >
                <Icon icon="mdi:chevron-left" width={30} height={30} />
            </Button>

            {/* Next Button */}
            <Button
                // onClick={canNext ? onNext : undefined}
                disabled={!canNext}
                className={`flex-center size-12 bg-primary   rounded-full text-white shadow-lg transition duration-300 ${
                    canNext
                        ? "hover:shadow-xl cursor-pointer"
                        : "opacity-50 border-2 border-primary bg-white text-primary cursor-not-allowed"
                }`}
            >
                <Icon icon="mdi:chevron-right" width={30} height={30} />
            </Button>
        </div>
    );
};

export default NextPrevButton;
