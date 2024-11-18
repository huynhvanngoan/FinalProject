import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@iconify/react/dist/iconify.js";

// Locations for the combobox
const locations = [
    { label: "New York", value: "ny" },
    { label: "Los Angeles", value: "la" },
    { label: "Chicago", value: "ch" },
    { label: "Houston", value: "ho" },
    { label: "Miami", value: "mi" },
    { label: "San Francisco", value: "sf" },
    { label: "Las Vegas", value: "lv" },
    { label: "Orlando", value: "or" },
    { label: "Seattle", value: "se" },
] as const;

type ComboboxFormProps = {
    selectedLocation: string;
    onLocationChange: (value: string) => void;
};

const ComboboxForm: React.FC<ComboboxFormProps> = ({
    selectedLocation,
    onLocationChange,
}) => {
    const selectedTextColor = selectedLocation
        ? "text-primary"
        : "text-muted-foreground";
    const selectedBorderColor = selectedLocation
        ? "border-primary"
        : "border-muted";

    return (
        <FormField
            name="location"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Location</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full h-12 justify-between border group", // Add group class here
                                        selectedTextColor,
                                        selectedBorderColor,
                                        "focus:ring-primary focus:border-primary",
                                        "hover:text-primary hover:border-primary"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon
                                            icon="iconamoon:location-light"
                                            width="48"
                                            height="48"
                                            className={cn(
                                                selectedTextColor,
                                                selectedBorderColor,
                                                "group-hover:text-primary", // Add hover color change
                                                "focus:ring-primary focus:border-primary",
                                                "hover:text-primary hover:border-primary"
                                            )}
                                        />
                                        {selectedLocation
                                            ? locations.find(
                                                  (location) =>
                                                      location.value ===
                                                      selectedLocation
                                              )?.label
                                            : "Where are you going?"}
                                    </div>
                                    <Icon
                                        icon="ic:outline-keyboard-arrow-down"
                                        width="48"
                                        height="48"
                                        className={cn(
                                            selectedTextColor,
                                            selectedBorderColor,
                                            "group-hover:text-primary", // Add hover color change
                                            "focus:ring-primary focus:border-primary",
                                            "hover:text-primary hover:border-primary"
                                        )}
                                    />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-[var(--radix-popover-trigger-width)] p-0"
                            align="start"
                        >
                            <Command className="w-full">
                                <CommandInput
                                    placeholder="Search location..."
                                    className="h-9"
                                />
                                <CommandList className="max-h-[300px] overflow-y-auto">
                                    <CommandEmpty>
                                        No location found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {locations.map((location) => (
                                            <CommandItem
                                                key={location.value}
                                                value={location.label}
                                                className="flex items-center justify-between py-3"
                                                onSelect={() =>
                                                    onLocationChange(
                                                        location.value
                                                    )
                                                }
                                            >
                                                {location.label}
                                                <Check
                                                    className={cn(
                                                        "ml-2 h-4 w-4",
                                                        location.value ===
                                                            selectedLocation
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </FormItem>
            )}
        />
    );
};

export default ComboboxForm;
