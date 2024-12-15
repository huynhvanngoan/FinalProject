"use client";
import ClientLogos from "@/components/homeComponents/ClientLogos";
import Banner from "@/components/shared/Banner";
import React, { useState } from "react";
import bgImg from "@/public/destination.jpg";
import DestinationCard from "@/components/destinationComponents/DestinationCard";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const Destination = () => {
  const [visibleCount, setVisibleCount] = useState(10); // Số card hiển thị

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };
  const t = useTranslations("General");

  return (
    <main className="size-full flex flex-col">
      <Banner bgImage={bgImg} title="Destination" />
      <div className="flex flex-col p-10 gap-4 lg:p-16 xl:p-24 size-full"></div>
      <ClientLogos />
    </main>
  );
};

export default Destination;
