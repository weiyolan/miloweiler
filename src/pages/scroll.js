export default function scroll() {
  return (
    <main
      // style={{ height: !pageLoaded ? "100vh" : mobile ? "700vh" : "700vh" }}
      className={`w-full  mainBackground relative bg-black snap-y snap-mandatory overflow-y-scroll`}>
      <div className="h-[100dvh]  bg-yellow-300 border-debug border-2 border-red-500 z-[9999] w-full snap-center snap-always" />
      <div className="h-[100dvh]  bg-orange-300 border-debug border-2 border-red-500 z-[9999] w-full snap-center snap-always" />
      <div className="h-[100dvh]  bg-yellow-300 border-debug border-2 border-red-500 z-[9999] w-full snap-center snap-always" />
      <div className="h-[100dvh]  bg-orange-300 border-debug border-2 border-red-500 z-[9999] w-full snap-center snap-always" />
      <div className="h-[100dvh]  bg-yellow-300 border-debug border-2 border-red-500 z-[9999] w-full snap-center snap-always" />
      <div className="h-[100dvh]  bg-orange-300 border-debug border-2 border-red-500 z-[9999] w-full snap-center snap-always" />
      <div className="h-[100dvh]  bg-yellow-300 border-debug border-2 border-red-500 z-[9999] w-full snap-center snap-always" />
    </main>
  );
}
