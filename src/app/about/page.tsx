import PageHeader from "@/components/PageHeader";
import AboutIntro from "@/components/about/AboutIntro";
import OurClient from "@/components/about/OurClient";
import OurTeam from "@/components/about/OurTeam";
import RunningText from "@/components/home/RunningText";
import Gallery from "@/components/about/Gallery";

const aboutRunningText = [
    "Web Development Wizardry", "UI/UX Design Innovation", "LOGO AND BRAND IDENTITY",
    "Web Development Wizardry", "UI/UX Design Innovation", "LOGO AND BRAND IDENTITY",
    "Web Development Wizardry", "UI/UX Design Innovation", "LOGO AND BRAND IDENTITY",
];

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#19172A]">
            <PageHeader
                breadcrumb="About Us"
                pillText="About Us"
                highlightWord="Tentang"
                title="Tentang Langit Media Pro"

            />

            <main className="flex-grow">
                <AboutIntro />

                <OurClient />

                <OurTeam />

                <RunningText items={aboutRunningText} />

                <Gallery />
            </main>
        </div>
    );
}
