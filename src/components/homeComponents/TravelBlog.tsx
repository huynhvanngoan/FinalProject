import React from "react";
import BlogCard from "../shared/BlogCard";
import NextPrevButton from "../shared/NextPrevButton";
import AppHeader from "../shared/AppHeader";
import HighlightTitle from "../shared/HighlightTitle";
import Demo from "@/public/chile.jpg";
const TravelBlog = () => {
    const blogData = [
        {
            title: "French Alps",
            description: "Explore the beauty of the French Alps",
            readTime: "5 mins",
            // imageSrc: "/french-alps.jpg",
            imageSrc: Demo,
            link: "/blog/french-alps",
        },
        {
            title: "Majestic Beaches",
            description: "Discover the most beautiful beaches in the world",
            readTime: "8 mins",
            // imageSrc: "/french-alps.jpg",
            imageSrc: Demo,
            link: "/blog/beaches",
        },
        {
            title: "Cultural Wonders",
            description: "Immerse yourself in the world's cultural treasures",
            readTime: "6 mins",
            // imageSrc: "/french-alps.jpg",
            imageSrc: Demo,
            link: "/blog/cultural-wonders",
        },
    ];
    return (
        <section className="w-full flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <HighlightTitle
                        text="Roaming Tales"
                        className="text-foreground"
                    />
                    <AppHeader text="Latest Travel Blog" />
                </div>
                <NextPrevButton
                    canPrev={false}
                    canNext={true}
                    // onPrev={() => console.log("Go to previous")}
                    // onNext={() => console.log("Go to next")}
                />
            </div>
            <div className="flex gap-6 p-6">
                {/* First Card Design */}
                {blogData.map((blog, index) => (
                    <BlogCard
                        key={index}
                        title={blog.title}
                        description={blog.description}
                        readTime={blog.readTime}
                        imageSrc={blog.imageSrc}
                        link={blog.link}
                    />
                ))}
            </div>
        </section>
    );
};

export default TravelBlog;
