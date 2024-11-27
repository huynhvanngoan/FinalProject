import React, { memo } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ReviewFormData = {
    rating: number;
    comment: string;
};

type ReviewInputProps = {
    onSubmit: (review: ReviewFormData) => void;
    className?: string;
};

const RatingInput = memo(
    ({
        value,
        onChange,
    }: {
        value: number;
        onChange: (value: number) => void;
    }) => {
        const [hoverRating, setHoverRating] = React.useState(0);

        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                        key={star}
                        className=" bg-transparent transition-transform hover:scale-110 focus:outline-none border-none shadow-none hover:bg-transparent"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => onChange(star)}
                    >
                        <Icon
                            icon="material-symbols:star"
                            className={`${
                                star <= (hoverRating || value)
                                    ? "text-primary"
                                    : "text-gray-200"
                            } w-8 h-8`}
                        />
                    </Button>
                ))}
            </div>
        );
    }
);
RatingInput.displayName = "RatingInput";

const ReviewsInput = memo(({ onSubmit, className = "" }: ReviewInputProps) => {
    const form = useForm<ReviewFormData>({
        defaultValues: {
            rating: 0,
            comment: "",
        },
    });

    const handleSubmit = (data: ReviewFormData) => {
        onSubmit(data);
        form.reset();
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Write a Review</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        {/* User Info Preview */}
                        <div className="flex items-center gap-3">
                            <Image
                                src="/api/placeholder/40/40"
                                alt="Your avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-medium text-foreground">
                                    You
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Posting publicly
                                </p>
                            </div>
                        </div>

                        {/* Rating Input */}
                        <FormField
                            control={form.control}
                            name="rating"
                            rules={{ required: "Please select a rating" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl>
                                        <RatingInput
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Comment Input */}
                        <FormField
                            control={form.control}
                            name="comment"
                            rules={{
                                required: "Please write a review",
                                minLength: {
                                    value: 10,
                                    message:
                                        "Review must be at least 10 characters",
                                },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Review</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Share your experience..."
                                            className="resize-none"
                                            rows={4}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                            disabled={!form.watch("rating")}
                        >
                            Post Review
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
});
ReviewsInput.displayName = "ReviewsInput";

export default ReviewsInput;
