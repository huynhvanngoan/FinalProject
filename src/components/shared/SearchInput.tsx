import { Icon } from "@iconify/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const SearchInput = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => (
    <div className="flex items-center w-full max-w-sm gap-2">
        <Input
            placeholder="Search..."
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="h-8"
        />
        {value && (
            <Button
                variant="ghost"
                onClick={() => onChange("")}
                className="h-8 px-2"
            >
                <Icon icon="mdi:close" className="h-4 w-4" />
            </Button>
        )}
    </div>
);

export default SearchInput;