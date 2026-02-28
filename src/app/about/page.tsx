import PageHeader from "@/components/PageHeader";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title="About Us"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "About Us" }
                ]}
            />
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/80">
                <h2 className="text-3xl font-bold text-white mb-6">About Langit Media Pro</h2>
                <p className="max-w-3xl mx-auto text-lg leading-relaxed">
                    This is a dummy page for About Us. We are a creative agency specializing in company profiles, animation videos, and website development. We bridge the gap between your brand and your audience through powerful visual storytelling.
                </p>
            </section>
        </div>
    );
}
