// hooks/usePagination.ts
"use client"
import { useState } from "react";

interface UsePaginationProps<T> {
    data: T[];
    itemsPerPage: number;
}

interface UsePaginationReturn<T> {
    currentData: T[];
    currentPage: number;
    totalPages: number;
    handleNext: () => void;
    handlePrev: () => void;
    handlePageChange: (page: number) => void;
    isFirstPage: boolean;
    isLastPage: boolean;
}

export function usePagination<T>({
    data,
    itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
    const [currentPage, setCurrentPage] = useState(0);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get current page data
    const currentData = data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Handle next page
    const handleNext = () => {
        if ((currentPage + 1) * itemsPerPage < data.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handle previous page
    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle specific page change
    const handlePageChange = (page: number) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    // Check if current page is first or last
    const isFirstPage = currentPage === 0;
    const isLastPage = (currentPage + 1) * itemsPerPage >= data.length;

    return {
        currentData,
        currentPage,
        totalPages,
        handleNext,
        handlePrev,
        handlePageChange,
        isFirstPage,
        isLastPage,
    };
}
