import PageHeader from "@/components/PageHeader";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export default function PortfolioPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#19172A]">
            <PageHeader
                breadcrumb="Portfolio"
                pillText="Portfolio"
                title="Portfolio Kerja Kami"
                highlightWord="Portfolio"
            />
            <main className="flex-grow">
                <PortfolioGrid />
            </main>
        </div>
    );
}
