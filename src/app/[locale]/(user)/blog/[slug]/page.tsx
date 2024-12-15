/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Banner from "@/components/shared/Banner";
import React, { useState } from "react";
import bgImg from "@/public/blogdetails.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import TestimonialCard from "@/components/blogComponents/TestimonialCard";
import AppHeader from "@/components/shared/AppHeader";
import NextPrevButton from "@/components/shared/NextPrevButton";
import BlogCard from "@/components/shared/BlogCard";
import { usePathname } from "next/navigation";
import { usePagination } from "@/hooks/usePagination";

const BlogDetails = () => {
  const pathname = usePathname();
  const [_, locale] = pathname.split("/");

  return (
    <main className="size-full flex flex-col">
      <Banner bgImage={bgImg} title="Blog Details" />
      <div className="flex flex-col p-10 lg:p-16 xl:p-24 size-full gap-30">
        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-3">
            <h1 className="text-[54px] font-semibold">
              Journey Beyond Borders
            </h1>
            <div className="flex flex-col xs:flex-row gap-6">
              <p>Entrepreneur, Leadership</p>
              <div className="xs:flex-center flex items-center flex-row gap-2">
                <Icon icon="mage:clock" />
                <p>August 07, 2024</p>
              </div>{" "}
              <div className="xs:flex-center flex items-center flex-row gap-2">
                <Icon icon="lucide:dot" />
                <p>Admin</p>
              </div>
            </div>
          </div>
          <p className="text-lg text-foreground/60">
            &quot; Journey Beyond Borders &quot; invites you to embark on an
            extraordinary travel experience that transcends geographical limits
            and cultural boundaries. This adventure is designed to immerse you
            in the heart of diverse cultures, offering the chance to discover
            hidden gems and engage deeply with local communities. As you
            traverse breathtaking landscapes and explore vibrant cities,
            you&apos;ll be introduced to new traditions, cuisines, and ways of
            life that will enrich your understanding of the world. Each step of
            your journey is crafted to provide unique adventures and memorable
            moments, ensuring that your travel experience is both transformative
            and unforgettable. Whether you&apos;re hiking through majestic
            mountains, strolling through ancient towns, or savoring local
            delicacies, &quot;Journey Beyond Borders&quot; promises to elevate
            your travel experience to new heights, creating memories that will
            last a lifetime.
          </p>
          <div className="flex-center flex-col xxl:flex-row w-full xxl:h-[450px] gap-5 ">
            <Image
              src={bgImg}
              alt=""
              className="size-full rounded-md object-cover"
            />{" "}
            <Image
              src={bgImg}
              alt=""
              className="size-full rounded-md object-cover"
            />
          </div>
          <TestimonialCard />
          <p className="text-lg text-foreground/60">
            &quot; Journey Beyond Borders &quot; invites you to embark on an
            extraordinary travel experience that transcends geographical limits
            and cultural boundaries. This adventure is designed to immerse you
            in the heart of diverse cultures, offering the chance to discover
            hidden gems and engage deeply with local communities. As you
            traverse breathtaking landscapes and explore vibrant cities,
            you&apos;ll be introduced to new traditions, cuisines, and ways of
            life that will enrich your understanding of the world. Each step of
            your journey is crafted to provide unique adventures and memorable
            moments, ensuring that your travel experience is both transformative
            and unforgettable. Whether you&apos;re hiking through majestic
            mountains, strolling through ancient towns, or savoring local
            delicacies, &quot;Journey Beyond Borders&quot; promises to elevate
            your travel experience to new heights, creating memories that will
            last a lifetime.
          </p>
        </div>
        <div className="flex flex-col gap-[50px]"></div>
      </div>
    </main>
  );
};

export default BlogDetails;
