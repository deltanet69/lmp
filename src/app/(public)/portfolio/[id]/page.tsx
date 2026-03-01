import PageHeader from "@/components/PageHeader";
import { portfolioProjects } from "@/data/portfolio";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from 'next';

type Props = { params: Promise<{ id: string }> };

// Generate metadata for each project dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = portfolioProjects.find(p => p.id === id);
    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.title} | Langit Media Pro`,
        description: project.subtitle,
    };
}

export default async function ProjectDetailsPage({ params }: Props) {
    const { id } = await params;
    const projectIndex = portfolioProjects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
        notFound();
    }

    const project = portfolioProjects[projectIndex];

    // Determine Prev/Next navigation
    const prevProject = projectIndex > 0 ? portfolioProjects[projectIndex - 1] : null;
    const nextProject = projectIndex < portfolioProjects.length - 1 ? portfolioProjects[projectIndex + 1] : null;

    return (
        <div className="flex flex-col min-h-screen bg-[#19172A]">
            {/* Standard Page Header */}
            <PageHeader
                breadcrumb={`Portfolio / ${project.title}`}
                pillText="• Project details"
                title={project.title}
                highlightWord={project.title.split(' ')[0]}
            />

            <main className="flex-grow pt-16 pb-32">
                <div className="max-w-[1440px] mx-auto px-4 md:px-12">

                    {/* Thumbnail Hero Image */}
                    <div className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 shadow-[0_0_50px_rgba(226,14,194,0.1)] border border-white/10 relative">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    {/* Two-Column Detail Structure */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                        {/* Main Content Column (Span 2) */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                                    {project.title}
                                </h1>
                                <p className="text-xl text-primary font-medium italic">
                                    {project.subtitle}
                                </p>
                            </div>

                            <div className="text-white/70 text-lg leading-relaxed space-y-6">
                                <p>{project.description}</p>
                                <p>This project was specifically designed to tackle the unique requirements of the {project.category} sector, blending our creativity with deep industry insight.</p>

                                <h3 className="text-2xl font-bold text-white mt-8 mb-4">Project Impact & Strategy</h3>
                                <p>Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                            </div>

                            {/* Optional secondary imagery block if needed later */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                                    <img src={project.image} alt="Detail" className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                                    <img src="/aboutimage.png" alt="Detail 2" className="w-full h-full object-cover opacity-80" />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column (Span 1) */}
                        <div className="lg:col-span-1 space-y-8">

                            {/* Project Detail Card */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] ">
                                <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Project Info</h3>

                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <p className="text-white/50 text-sm uppercase tracking-wider font-bold">Project Name</p>
                                        <p className="text-white font-medium text-lg">{project.title}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white/50 text-sm uppercase tracking-wider font-bold">Client</p>
                                        <p className="text-white font-medium text-lg">{project.client}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white/50 text-sm uppercase tracking-wider font-bold">Category</p>
                                        <p className="text-primary font-bold text-lg">{project.category}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white/50 text-sm uppercase tracking-wider font-bold">Production Date</p>
                                        <p className="text-white font-medium text-lg">{project.date}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white/50 text-sm uppercase tracking-wider font-bold">Project Link</p>
                                        <a href={project.link} target="_blank" rel="noreferrer" className="text-white font-medium text-lg hover:text-primary transition-colors underline decoration-white/30 underline-offset-4">
                                            View Live Project
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* "Need something like this?" Card */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-[#E20EC2] to-[#7A0668] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(226,14,194,0.3)]">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full transform translate-x-10 -translate-y-10"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 blur-2xl rounded-full transform -translate-x-5 translate-y-5"></div>

                                <div className="relative z-10 space-y-4">
                                    <h3 className="text-2xl font-black text-white leading-tight">Need something like this?</h3>
                                    <p className="text-white/80 font-medium">Let&apos;s collaborate and build something extraordinary for your brand.</p>
                                    <Link
                                        href="/contact"
                                        className="inline-block mt-4 bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300 "
                                    >
                                        Contact Us Now
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Project Navigation */}
                    <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                        {prevProject ? (
                            <Link href={`/portfolio/${prevProject.id}`} className="group flex items-center gap-4 w-full sm:w-auto">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors shrink-0">
                                    <img src="/icun.png" alt="Prev" className="w-4 h-4 object-contain brightness-0 invert rotate-180" />
                                </div>
                                <div className="text-left">
                                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Previous Project</p>
                                    <p className="text-white font-bold group-hover:text-primary transition-colors max-w-[200px] truncate">{prevProject.title}</p>
                                </div>
                            </Link>
                        ) : (
                            <div className="w-full sm:w-auto"></div> // Spacer
                        )}

                        <div className="hidden sm:block w-px h-16 bg-white/10 shrink-0"></div>

                        {nextProject ? (
                            <Link href={`/portfolio/${nextProject.id}`} className="group flex items-center justify-end gap-4 w-full sm:w-auto text-right">
                                <div className="text-right">
                                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Next Project</p>
                                    <p className="text-white font-bold group-hover:text-primary transition-colors max-w-[200px] truncate">{nextProject.title}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors shrink-0">
                                    <img src="/icun.png" alt="Next" className="w-4 h-4 object-contain brightness-0 invert" />
                                </div>
                            </Link>
                        ) : (
                            <div className="w-full sm:w-auto"></div> // Spacer
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
