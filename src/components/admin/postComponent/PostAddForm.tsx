/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PostFormValues, postSchema } from "@/schemaValidations/post.schema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/markdown.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/inline_style.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";

interface PostAddFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PostFormValues) => void;
}

const PostAddForm: React.FC<PostAddFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [content, setContent] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            slug: "",
            readingTime: 0,
            summary: "",
            coverImage: "",
            published: false,
        },
    });

    const handleSubmit = (data: PostFormValues) => {
        onSubmit({
            ...data,
            content,
        });
        form.reset();
        setContent("");
        setPreviewUrl("");
        onClose();
    };

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        onChange?: (...event: any[]) => void
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
            onChange?.(file);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Post</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4 max-h-[70vh] overflow-y-auto"
                    >
                        {/* Cover Image */}
                        <FormField
                            control={form.control}
                            name="coverImage"
                            render={({
                                field: { value, onChange, ...field },
                            }) => (
                                <FormItem>
                                    <FormLabel>Cover Image</FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <div className="flex justify-center">
                                                <Avatar className="w-full h-20">
                                                    <AvatarImage
                                                        src={previewUrl}
                                                        alt="Cover preview"
                                                    />
                                                    <AvatarFallback>
                                                        <Icon
                                                            icon="mdi:camera"
                                                            className="text-gray-400 w-10 h-10"
                                                        />
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="flex justify-center">
                                                <label className="cursor-pointer">
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                                        <Icon
                                                            icon="mdi:upload"
                                                            className="w-5 h-5"
                                                        />
                                                        <span>
                                                            Choose Image
                                                        </span>
                                                    </div>
                                                    <Input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) =>
                                                            handleImageChange(
                                                                e,
                                                                onChange
                                                            )
                                                        }
                                                        {...field}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Title */}
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Post Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Slug */}
                        <FormField
                            name="slug"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Post Slug"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Reading Time */}
                        <FormField
                            name="readingTime"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Reading Time (minutes)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Reading Time"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Summary */}
                        <FormField
                            name="summary"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Summary</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Post Summary"
                                            {...field}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                            rows={4}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Content (Rich Text Editor) */}
                            <FormField
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FroalaEditor
                                            config={{
                                                placeholderText:
                                                    "Enter content of post...",
                                                charCounterCount: true,
                                            }}
                                            tag="textarea"
                                            model={content}
                                            onModelChange={(
                                                newContent: string
                                            ) => setContent(newContent)}
                                        />
                                    </FormItem>
                                )}
                            />

                        {/* Published */}
                        <FormField
                            name="published"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Published</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) =>
                                                field.onChange(value === "true")
                                            }
                                            value={
                                                field.value ? "true" : "false"
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">
                                                    Yes
                                                </SelectItem>
                                                <SelectItem value="false">
                                                    No
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Add Post</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PostAddForm;
