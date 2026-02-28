import PageHeader from "@/components/PageHeader";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#19172A]">
            <PageHeader
                breadcrumb="About Us"
                pillText="• Who We Are"
                title="Your Trusted Production Partner"
                highlightWord="Production"
            />
            <main className="flex-grow flex items-center justify-center py-32">
                <h2 className="text-4xl md:text-6xl font-black text-white/20 uppercase tracking-[0.5em]">Hallo World</h2>
            </main>
        </div>
    );
}
