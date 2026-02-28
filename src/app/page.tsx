import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import AboutUs from "@/components/home/AboutUs";
import RunningText from "@/components/home/RunningText";
import OurService from "@/components/home/OurService";
import LatestProject from "@/components/home/LatestProject";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Statistics />
      <AboutUs />
      <RunningText />
      <OurService />
      <LatestProject />
      <div className="mt-8 mb-[-1px]">
        {/* Running text is repeated before footer based on requirement "Running text (after later project)" */}
        <RunningText />
      </div>
    </div>
  );
}
