import PageHeader from "@/components/PageHeader";

export default function PortfolioPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title="Portfolio"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Portfolio" }
                ]}
            />
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/80">
                <h2 className="text-3xl font-bold text-white mb-6">Our Finest Creations</h2>
                <p className="max-w-3xl mx-auto text-lg leading-relaxed">
                    This is a dummy page for Portfolio. View our gallery of hand-crafted visual identities and animations. Every frame is optimized for engaging communication.
                </p>
            </section>
        </div>
    );
}
