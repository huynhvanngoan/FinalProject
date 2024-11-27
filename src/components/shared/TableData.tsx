/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    VisibilityState,
    SortingState,
    ColumnFiltersState,
    useReactTable,
} from "@tanstack/react-table";
import { Icon } from "@iconify/react";

// Components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import TablePagination from "./TablePagination";
import TableToolbar from "./TableToolbar";
import { DataTableProps } from "@/types/tabel";

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    const renderSortIcon = (isSorted: false | "asc" | "desc") => {
        if (isSorted === "asc")
            return <Icon icon="mdi:arrow-up" className="h-4 w-4" />;
        if (isSorted === "desc")
            return <Icon icon="mdi:arrow-down" className="h-4 w-4" />;
        return <Icon icon="mdi:sort" className="h-4 w-4 opacity-50" />;
    };

    return (
        <div className="relative rounded-md border">
            <TableToolbar
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                table={table}
            />

            <div className="overflow-x-auto">
                <Table className="w-full min-w-[1200px]">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers
                                    .filter((header) =>
                                        header.column.getIsVisible()
                                    )
                                    .map((header) => {
                                        const isSorted =
                                            header.column.getIsSorted();
                                        const canSort =
                                            header.column.getCanSort();
                                        const isAction =
                                            header.column.columnDef.header ===
                                            "Actions";
                                        const isAvatar =
                                            header.column.columnDef.header ===
                                            "Avatar";

                                        return (
                                            <TableHead
                                                key={header.id}
                                                className={`bg-background sticky top-0 ${
                                                    canSort && !isAction
                                                        ? "cursor-pointer"
                                                        : ""
                                                }`}
                                                onClick={
                                                    canSort && !isAction
                                                        ? () =>
                                                              header.column.toggleSorting(
                                                                  isSorted ===
                                                                      "asc"
                                                              )
                                                        : undefined
                                                }
                                            >
                                                <div className="flex items-center justify-between">
                                                    {(isAction || isAvatar) &&
                                                        flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                    {canSort &&
                                                        !isAction &&
                                                        !isAvatar && (
                                                            <div className="gap-2 flex items-center justify-between">
                                                                {flexRender(
                                                                    header
                                                                        .column
                                                                        .columnDef
                                                                        .header,
                                                                    header.getContext()
                                                                )}
                                                                {renderSortIcon(
                                                                    isSorted
                                                                )}
                                                            </div>
                                                        )}
                                                </div>
                                            </TableHead>
                                        );
                                    })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <TablePagination table={table} />
        </div>
    );
}
