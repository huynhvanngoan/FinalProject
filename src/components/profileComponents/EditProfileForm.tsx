import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Upload, Save } from "lucide-react";

interface UserData {
    name: string;
    email: string;
    bio: string;
    location: string;
}

interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface ProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialTab?: "profile" | "password";
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({
    open,
    onOpenChange,
    initialTab = "profile",
}) => {
    const [formData, setFormData] = useState<UserData>({
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Software developer passionate about creating innovative solutions.",
        location: "San Francisco, CA",
    });

    const [passwordData, setPasswordData] = useState<PasswordData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [activeTab, setActiveTab] = useState<string>(initialTab);

    const [avatarPreview, setAvatarPreview] = useState<string>(
        "/placeholder-avatar.jpg"
    );

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const handleProfileInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Updated Profile:", formData);
        onOpenChange(false);
    };

    const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match");
            return;
        }
        console.log("Changing password");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center">
                        Account Settings
                    </DialogTitle>
                </DialogHeader>
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    defaultValue={initialTab}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="profile">Edit Profile</TabsTrigger>
                        <TabsTrigger value="password">
                            Change Password
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <form
                            onSubmit={handleProfileSubmit}
                            className="space-y-6"
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative group">
                                    <Avatar className="size-48 border-4 border-white shadow-xl">
                                        <AvatarImage
                                            src={avatarPreview}
                                            alt="Profile"
                                            className="object-cover"
                                        />
                                        <AvatarFallback>
                                            {formData.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full">
                                        <label className="cursor-pointer">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleAvatarUpload}
                                            />
                                            <Upload className="text-white size-8" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Name</Label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleProfileInputChange}
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleProfileInputChange}
                                        placeholder="Email address"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Bio</Label>
                                <Textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleProfileInputChange}
                                    placeholder="Tell us about yourself"
                                    rows={4}
                                />
                            </div>

                            <div>
                                <Label>Location</Label>
                                <Input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleProfileInputChange}
                                    placeholder="Your current location"
                                />
                            </div>

                            <div className="flex justify-center">
                                <Button type="submit" className="w-full">
                                    <Save className="mr-2 size-5" /> Save
                                    Profile
                                </Button>
                            </div>
                        </form>
                    </TabsContent>
                    <TabsContent value="password">
                        <form
                            onSubmit={handlePasswordSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <Label>Current Password</Label>
                                <Input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordInputChange}
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div>
                                <Label>New Password</Label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordInputChange}
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <Label>Confirm New Password</Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordInputChange}
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button type="submit" className="w-full">
                                    <Save className="mr-2 size-5" /> Change
                                    Password
                                </Button>
                            </div>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileDialog;
