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

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();
  const [_, locale] = pathname.split("/");
  const itemsPerPage = 8;

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="size-full flex flex-col">
      <Banner bgImage={bgImg} title="Blog" />
      <div className="flex flex-col gap-y-20 p-10 lg:p-16 xl:p-24 size-full"></div>
    </main>
  );
};

export default Blog;
