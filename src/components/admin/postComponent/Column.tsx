/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Actions from "@/components/tableColumn/Actions";

export const createPostColumns = (
    onEdit: (item: Post) => void,
    onDelete: (item: Post) => void
): ColumnDef<Post>[] => [
    {
        accessorKey: "id",
        header: "Post ID",
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "coverImage",
        header: "Cover",
        cell: ({ row }: { row: any }) => (
            <Avatar className="h-10 w-10">
                <AvatarImage
                    src={
                        typeof row.getValue("coverImage") === "string"
                            ? row.getValue("coverImage")
                            : "/placeholder.png"
                    }
                    alt={`Cover of ${row.getValue("title")}`}
                    className="object-cover"
                />
                <AvatarFallback className="bg-primary/10 text-primary">
                    {row.getValue("title")?.[0]}
                </AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "slug",
        header: "Slug",
        cell: ({ row }) => (
            <div className="text-sm text-gray-500">{row.getValue("slug")}</div>
        ),
    },
    {
        accessorKey: "readingTime",
        header: "Reading Time (min)",
        cell: ({ row }) => (
            <div className="text-sm text-gray-500">
                {row.getValue("readingTime")} min
            </div>
        ),
    },
    {
        accessorKey: "summary",
        header: "Summary",
        cell: ({ row }) => (
            <div className="text-sm text-gray-500 truncate">
                {row.getValue("summary")}
            </div>
        ),
    },
    {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => {
            const content = row.getValue("content") as string;
            return (
                <div className="text-sm text-gray-500 truncate">
                    {content.length > 100
                        ? `${content.substring(0, 100)}...`
                        : content}
                </div>
            );
        },
    },
    {
        accessorKey: "published",
        header: "Published",
        cell: ({ row }) => {
            const published = row.getValue("published");
            return (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        published
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                    }`}
                >
                    {published ? "✅ Yes" : "❌ No"}
                </span>
            );
        },
    },
    {
        accessorKey: "authorId",
        header: "Author",
        cell: ({ row }) => (
            <div className="text-sm text-gray-500">
                {row.getValue("authorId")}
            </div>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <Actions
                item={row.original}
                actions={[
                    {
                        name: "edit",
                        icon: "solar:pen-bold",
                        tooltip: "Edit Post",
                        handler: () => onEdit(row.original),
                        variant: "primary",
                    },
                    {
                        name: "delete",
                        icon: "solar:trash-bin-trash-bold",
                        tooltip: "Delete Post",
                        handler: () => onDelete(row.original),
                        variant: "destructive",
                    },
                ]}
            />
        ),
    },
];
