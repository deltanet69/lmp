import PageHeader from "@/components/PageHeader";

export default function ProjectsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title="Our Projects"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Our Projects" }
                ]}
            />
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/80">
                <h2 className="text-3xl font-bold text-white mb-6">Explore Our Work</h2>
                <p className="max-w-3xl mx-auto text-lg leading-relaxed">
                    This is a dummy page for Our Projects. Browse through our extensive library of corporate videos, 2D/3D animations, and dynamic website projects built across the past decade.
                </p>
            </section>
        </div>
    );
}
