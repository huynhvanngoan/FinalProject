import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/users";
import Actions from "@/components/tableColumn/Actions";

export const createUserColumns = (
    onEdit: (user: User) => void,
    onDelete: (user: User) => void
): ColumnDef<User>[] => [
    {
        accessorKey: "profilePic",
        header: "Avatar",
        cell: ({ row }: { row: any }) => (
            <Avatar className="h-10 w-10">
                <AvatarImage
                    src={row.getValue("profilePic") || "/placeholder.png"}
                    alt={`${row.getValue("name")} avatar`}
                    className="object-cover"
                />
                <AvatarFallback>{row.getValue("name")?.[0]}</AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "firstName",
        header: "First Name",
        cell: ({ row }) => (
            <div className="font-medium text-sm">
                {row.getValue("firstName")}
            </div>
        ),
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
        cell: ({ row }) => (
            <div className="font-medium text-sm">
                {row.getValue("lastName")}
            </div>
        ),
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => (
            <div className="font-medium text-sm">{row.getValue("gender")}</div>
        ),
    },
    {
        accessorKey: "role", 
        header: "Role",
        cell: ({ row }) => (
            <div className="font-medium text-sm">
                {row.original.Role?.name || "N/A"}
            </div>
        ),
    },
    {
        accessorKey: "bio",
        header: "Bio",
        cell: ({ row }) => (
            <div className="truncate max-w-[200px] text-sm">
                {row.getValue("bio")}
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
                        tooltip: "Edit User",
                        handler: () => onEdit(row.original),
                        variant: "primary",
                    },
                    {
                        name: "delete",
                        icon: "solar:trash-bin-trash-bold",
                        tooltip: "Delete User",
                        handler: () => onDelete(row.original),
                        variant: "destructive",
                    },
                ]}
            />
        ),
    },
];
