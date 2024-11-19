import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (pageNumber: number) => void;
}

const PaginationCustom: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    handlePageChange,
}) => {
    return (
        <div className="flex justify-center items-center mt-8">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`cursor-pointer hover:text-primary hover:bg-primary/20 ${
                                currentPage === 1
                                    ? "opacity-50 pointer-events-none"
                                    : ""
                            }`}
                        />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                onClick={() => handlePageChange(index + 1)}
                                isActive={currentPage === index + 1}
                                className="cursor-pointer hover:text-primary hover:bg-primary/20"
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`cursor-pointer hover:text-primary hover:bg-primary/20 ${
                                currentPage === totalPages
                                    ? "opacity-50 pointer-events-none"
                                    : ""
                            }`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationCustom;
