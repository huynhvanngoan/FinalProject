/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginationButton from "./PaginationButton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const TablePagination = ({ table }: { table: any }) => (
    <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Rows per page</p>
            <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                    table.setPageSize(Number(value));
                }}
            >
                <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                        placeholder={table.getState().pagination.pageSize}
                    />
                </SelectTrigger>
                <SelectContent side="top">
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
            </p>
        </div>

        <div className="flex items-center gap-2">
            <PaginationButton
                icon="ic:round-keyboard-double-arrow-left"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            />
            <PaginationButton
                icon="mdi:chevron-left"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            />
            <PaginationButton
                icon="mdi:chevron-right"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            />
            <PaginationButton
                icon="ic:round-keyboard-double-arrow-right"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            />
        </div>
    </div>
);

export default TablePagination;
