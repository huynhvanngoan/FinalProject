"use client";

import React from "react";
// import { Action } from "@/types/actions";
import { Icon } from "@iconify/react";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
export interface Action<T> {
    name: string;
    icon: string;
    tooltip: string;
    handler: (item: T) => void;
    variant?: string;
}
interface ActionsProps<T> {
    item: T;
    actions: Action<T>[];
}

const Actions = <T,>({ item, actions }: ActionsProps<T>) => {
    return (
        <div className="flex items-center space-x-2">
            {actions.map((action) => (
                <TooltipProvider key={action.name} delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => action.handler(item)}
                                className={`hover:bg-primary/10 hover:text-primary `}
                            >
                                <Icon
                                    icon={action.icon}
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{action.tooltip}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
};

export default Actions;
