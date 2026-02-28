import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title="Contact Us"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Contact Us" }
                ]}
            />
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/80">
                <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">Get In Touch</h2>
                <p className="max-w-3xl mx-auto text-lg leading-relaxed mb-16 font-medium">
                    Ready to start your next project with us? Fill out the contact details below or reach out directly via email. We&apos;ll get back to you as soon as possible.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                        <h3 className="text-xl font-bold text-white mb-3">Email Us</h3>
                        <p className="text-primary font-bold">contact@langitmediapro.id</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                        <h3 className="text-xl font-bold text-white mb-3">Call Us</h3>
                        <p className="text-primary font-bold">+62 123 4567 890</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                        <h3 className="text-xl font-bold text-white mb-3">Visit Us</h3>
                        <p className="text-white/70">123 Media Street, Creative City, ID</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
