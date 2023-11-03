import useMinimizeScroll from "@/utils/useMinimizeScroll";
// import { useEffect } from "react";

export default function scroll() {
  useMinimizeScroll();

  return (
    <main
      // style={{ height: !pageLoaded ? "100vh" : mobile ? "700vh" : "700vh" }}
      className={`w-full  no-scrollbar mainBackground relative bg-black snap-y snap-mandatory `}>
      {/* // snap-center snap-always */}
      <div className="h-[100dvh]  bg-yellow-300 border-debug border-2 border-red-500 z-[9999] w-full" />
      <div className="h-[100dvh]  bg-orange-300 border-debug border-2 border-red-500 z-[9999] w-full" />
      <div className="h-[100dvh]  bg-yellow-300 border-debug border-2 border-red-500 z-[9999] w-full" />
      <div className="h-[100dvh]  bg-orange-300 border-debug border-2 border-red-500 z-[9999] w-full" />
      <div className="h-[100dvh]  bg-yellow-300 border-debug border-2 border-red-500 z-[9999] w-full" />
      <div className="h-[100dvh]  bg-orange-300 border-debug border-2 border-red-500 z-[9999] w-full" />
      <div className="h-[100dvh]  bg-yellow-300 border-debug border-2 border-red-500 z-[9999] w-full" />
    </main>
  );
}
