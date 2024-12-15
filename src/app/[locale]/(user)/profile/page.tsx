/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Loader2,
    Edit,
    Key,
    Trash2,
    MapPin,
    Calendar,
    BadgeCheck,
} from "lucide-react";
import ProfileDialog from "@/components/profileComponents/EditProfileForm";
import { toast } from "react-toastify";

const Profile = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [initialTab, setInitialTab] = useState<"profile" | "password">(
        "profile"
    );
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Software developer passionate about creating innovative solutions.",
        location: "San Francisco, CA",
        joinDate: "March 2023",
    };

    const handleEditProfileClick = () => {
        setInitialTab("profile");
        setDialogOpen(true);
    };

    const handleChangePasswordClick = () => {
        setInitialTab("password");
        setDialogOpen(true);
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);

        try {
            // Simulate an API call to delete account
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Close delete confirmation dialog
            setIsDeleteDialogOpen(false);

            // Show success toast
            toast.success("Your account has been successfully deleted.");

            // Optional: Redirect to home or login page
            // router.push('/login');
        } catch (error) {
            // Handle error (optional)
            toast.error("Failed to delete account. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <main className="mx-auto max-w-5xl px-4 space-y-20 py-5">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-3xl -rotate-1 shadow-lg"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-bl-2xl flex items-center gap-2">
                        <BadgeCheck className="size-5" />
                        <span className="font-medium">Verified</span>
                    </div>
                    <div className="flex flex-col items-center space-y-6">
                        <div className="relative">
                            <Avatar className="size-48 border-6 border-white ring-4 ring-blue-200 shadow-xl">
                                <AvatarImage
                                    src="/placeholder-avatar.jpg"
                                    alt={userData.name}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white text-5xl">
                                    {userData.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
                                {userData.name}
                                <BadgeCheck className="text-blue-500 size-8" />
                            </h1>
                            <p className="text-blue-600 mt-2 text-lg">
                                {userData.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 group">
                    <CardHeader className="border-b border-gray-100">
                        <CardTitle className="flex items-center gap-3 text-blue-600 group-hover:text-blue-700 transition-colors">
                            <MapPin className="size-6" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Bio</p>
                            <p className="text-gray-700 italic">
                                {userData.bio}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                            <MapPin className="text-blue-500 size-6" />
                            <p className="font-medium">{userData.location}</p>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                            <Calendar className="text-blue-500 size-6" />
                            <p className="font-medium">
                                Joined {userData.joinDate}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 group">
                    <CardHeader className="border-b border-gray-100">
                        <CardTitle className="flex items-center gap-3 text-red-600 group-hover:text-red-700 transition-colors">
                            <Key className="size-6" />
                            Account Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <Button
                            variant="outline"
                            className="w-full flex items-center gap-3 group hover:bg-blue-50 transition-colors"
                            onClick={handleEditProfileClick}
                        >
                            <Edit className="size-5 text-blue-500 group-hover:text-blue-600" />
                            Edit Profile
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full flex items-center gap-3 group hover:bg-blue-50 transition-colors"
                            onClick={handleChangePasswordClick}
                        >
                            <Key className="size-5 text-blue-500 group-hover:text-blue-600" />
                            Change Password
                        </Button>
                        <Dialog
                            open={isDeleteDialogOpen}
                            onOpenChange={setIsDeleteDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="w-full flex items-center gap-3 group"
                                >
                                    <Trash2 className="size-5" />
                                    Delete Account
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Are you absolutely sure?
                                    </DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        variant="destructive"
                                        onClick={handleDeleteAccount}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Deleting...
                                            </>
                                        ) : (
                                            "Delete Account"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>

            {dialogOpen && (
                <ProfileDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    initialTab={initialTab}
                />
            )}
        </main>
    );
};

export default Profile;
