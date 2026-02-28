import PageHeader from "@/components/PageHeader";

export default function EnquiryPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title="Enquiry"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Enquiry" }
                ]}
            />
            <section className="py-24 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/80">
                <h2 className="text-3xl font-bold text-white mb-6">Submit Your Enquiry</h2>
                <p className="text-lg leading-relaxed mb-12">
                    This is a dummy page for Enquiry. Please fill out the form below to initiate your next big project.
                </p>

                <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-white/90">Full Name</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-white/90">Email Address</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@company.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-white/90">Message</label>
                        <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white h-32 focus:outline-none focus:border-primary transition-colors" placeholder="Tell us about your project..."></textarea>
                    </div>
                    <button type="button" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20">
                        Send Enquiry
                    </button>
                </form>
            </section>
        </div>
    );
}
