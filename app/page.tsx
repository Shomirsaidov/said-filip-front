"use client";

import Hero from "@/components/Hero";
import ScrollUp from "@/components/Common/ScrollUp";
import ProductsPage from "./products/page"; // We can reuse the products page content or part of it

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <div className="bg-[#F9FAFB] dark:bg-bg-color-dark">
        <ProductsPage />
      </div>
    </>
  );
}
