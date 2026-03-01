import PageHeader from "@/components/PageHeader";
import OurService from "@/components/home/OurService";
import RunningText from "@/components/home/RunningText";
import BusinessProcess from "@/components/services/BusinessProcess";

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#19172A]">
            <PageHeader
                breadcrumb="Our Services"
                pillText="• Our Service"
                title="Layanan Langit Media Pro"
                highlightWord="Layanan"
            />
            <main className="flex-grow">
                <OurService />
                <RunningText />
                <BusinessProcess />
            </main>
        </div>
    );
}
