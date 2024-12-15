import { addMonths } from "date-fns";
import { CONSTANTS } from "./constants";

interface PaginationResult<T> {
    paginatedItems: T[];
    totalPages: number;
}

/**
 * Helper function to paginate an array of items
 * @param items - The full array of items to paginate
 * @param currentPage - The current page number
 * @param itemsPerPage - Number of items per page
 * @returns An object containing paginated items and total pages
 */
export function paginate<T>(
    items: T[],
    currentPage: number,
    itemsPerPage: number
): PaginationResult<T> {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedItems = items.slice(indexOfFirstItem, indexOfLastItem);

    return {
        paginatedItems,
        totalPages,
    };
}

const getCapitalizedTitleFromPath = (pathname: string) => {
    const slug = pathname?.split("/").pop() || "";
    return slug
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export default getCapitalizedTitleFromPath;

export const maxBookingDate = addMonths(
    new Date(),
    CONSTANTS.MAX_BOOKING_MONTHS
);
