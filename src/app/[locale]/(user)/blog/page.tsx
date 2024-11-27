/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Banner from "@/components/shared/Banner";
import PaginationCustom from "@/components/shared/Pagination";
import React, { useState } from "react";
import bgImg from "@/public/blog.jpg";

import BlogCard from "@/components/shared/BlogCard";
import { usePathname } from "next/navigation";
import { paginate } from "@/utils/helpers";
import { blogListData } from "@/data/blogData";


const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pathname = usePathname();
    const [_, locale] = pathname.split("/");
    const itemsPerPage = 8;

    const { paginatedItems: currentBlogs, totalPages } = paginate(
        blogListData,
        currentPage,
        itemsPerPage
    );

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    return (
        <main className="size-full flex flex-col">
            <Banner bgImage={bgImg} title="Blog" />
            <div className="flex flex-col gap-y-20 p-10 lg:p-16 xl:p-24 size-full">
                <div className="grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full gap-5">
                    {currentBlogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            title={blog.title}
                            description={blog.description}
                            readTime={blog.readTime}
                            imageSrc={blog.imageSrc}
                            link={`/${locale}/blog/${blog.link
                                .split("/")
                                .pop()}`}
                        />
                    ))}
                </div>

                <PaginationCustom
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
        </main>
    );
};

export default Blog;
