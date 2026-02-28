import Link from 'next/link';

interface Breadcrumb {
    label: string;
    href?: string;
}

export default function PageHeader({ title, breadcrumbs }: { title: string, breadcrumbs: Breadcrumb[] }) {
    return (
        <section className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden bg-[#19172A]">
            <div className="absolute inset-0 z-0 opacity-40">
                <img src="/pg.png" alt="Header Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#19172A] opacity-90"></div>
            </div>
            <div className="relative z-10 text-center px-4 mt-10">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-wider uppercase drop-shadow-lg">{title}</h1>
                <div className="flex items-center justify-center gap-3 text-white/70 text-sm md:text-base font-medium">
                    {breadcrumbs.map((bc, index) => (
                        <span key={index} className="flex items-center gap-3">
                            {index > 0 && <span className="text-primary font-bold">/</span>}
                            {bc.href ? (
                                <Link href={bc.href} className="hover:text-white transition-colors">{bc.label}</Link>
                            ) : (
                                <span className="text-white">{bc.label}</span>
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
