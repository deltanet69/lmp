import PageHeader from "@/components/PageHeader";
import ContactSection from "@/components/enquiry/ContactSection";
import MapWrapper from "@/components/enquiry/MapWrapper";

export default function EnquiryPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#19172A]">
            <PageHeader
                breadcrumb="Enquiry"
                pillText="• Get in touch"
                title="Hubungi Langit Media Pro"
                highlightWord="Hubungi"
            />
            <main className="flex-grow">
                <ContactSection />
                <section className="w-full relative z-0">
                    <MapWrapper />
                </section>
            </main>
        </div>
    );
}
