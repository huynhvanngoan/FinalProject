import { Button } from "../ui/button";
import { Icon } from "@iconify/react";

const PaginationButton = ({
    icon,
    onClick,
    disabled,
}: {
    icon: string;
    onClick: () => void;
    disabled: boolean;
}) => {
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={onClick}
            disabled={disabled}
        >
            <Icon icon={icon} className="h-4 w-4" />
        </Button>
    );
};

export default PaginationButton;
