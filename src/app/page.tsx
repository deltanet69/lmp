import Hero from "@/components/home/Hero";
import Hero2 from "@/components/home/Hero2";
import Statistics from "@/components/home/Statistics";
import AboutUs from "@/components/home/AboutUs";
import RunningText from "@/components/home/RunningText";
import OurService from "@/components/home/OurService";
import LatestProject from "@/components/home/LatestProject";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const variant = searchParams.variant;

  return (
    <div className="flex flex-col w-full">
      {variant === '2' ? <Hero2 /> : <Hero />}
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
