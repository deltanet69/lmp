import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import YouTubeModal from "@/components/portfolio/YouTubeModal";

type Props = { params: Promise<{ id: string }> };

interface Project {
    id: string;
    title: string;
    category: string;
    client: string | null;
    years: string | null;
    project_link: string | null;
    description: string | null;
    project_thumbnail: string | null;
    project_album: string[] | null;
}

/** Strip HTML tags and return plain text for excerpt */
function stripHtml(html: string | null): string {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getExcerpt(html: string | null, words = 10): string {
    const plain = stripHtml(html);
    const arr = plain.split(" ");
    return arr.slice(0, words).join(" ") + (arr.length > words ? "..." : "");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const supabase = await createClient();
    const { data } = await supabase.from("portfolio").select("title, description").eq("id", id).single();
    if (!data) return { title: "Project Not Found" };
    return {
        title: `${data.title} | Langit Media Pro`,
        description: getExcerpt(data.description, 20),
    };
}

export default async function ProjectDetailsPage({ params }: Props) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: project } = await supabase
        .from("portfolio")
        .select("*")
        .eq("id", id)
        .single<Project>();

    if (!project) notFound();

    // Prev / Next
    const { data: allProjects } = await supabase
        .from("portfolio")
        .select("id, title")
        .order("created_at", { ascending: false });

    const projectList = allProjects || [];
    const currentIndex = projectList.findIndex((p) => p.id === id);
    const prevProject = currentIndex > 0 ? projectList[currentIndex - 1] : null;
    const nextProject = currentIndex < projectList.length - 1 ? projectList[currentIndex + 1] : null;

    const excerpt = getExcerpt(project.description, 10);

    return (
        <div className="flex flex-col min-h-screen bg-[#19172A]">
            <PageHeader
                breadcrumb={`Portfolio / ${project.title}`}
                pillText="• Project details"
                title={project.title}
                highlightWord={project.title.split(" ")[0]}
            />

            <main className="flex-grow pt-16 pb-32">
                <div className="max-w-[1440px] mx-auto px-4 md:px-12">

                    {/* Thumbnail Hero with YouTube popup */}
                    <div className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 shadow-[0_0_50px_rgba(226,14,194,0.1)] border border-white/10 relative">
                        {project.project_thumbnail ? (
                            <img
                                src={project.project_thumbnail}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 text-6xl font-black">
                                {project.title[0]}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* YouTube play — opens modal */}
                        {project.project_link && (
                            <YouTubeModal url={project.project_link} />
                        )}
                    </div>

                    {/* Two-Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-3">
                                    {project.title}
                                </h1>
                                {excerpt && (
                                    <p className="text-lg text-primary font-medium italic">{excerpt}</p>
                                )}
                            </div>

                            {/* Description — force white on all inline styles */}
                            <div
                                className="text-white/80 text-base md:text-lg leading-relaxed space-y-4 
                                           [&_*]:!text-white [&_*]:!color-white [&_p]:text-white/80 
                                           [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white 
                                           [&_strong]:text-white [&_li]:text-white/80"
                                style={{ color: "rgba(255,255,255,0.8)" }}
                                dangerouslySetInnerHTML={{
                                    __html: project.description
                                        // Remove all inline color styles that could make text dark
                                        ?.replace(/color\s*:\s*rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/gi, "color:inherit")
                                        ?.replace(/color\s*:\s*#[0-9a-fA-F]{3,6}/gi, "color:inherit")
                                        ?? "<p>No description available.</p>"
                                }}
                            />

                            {/* Gallery */}
                            {project.project_album && project.project_album.length > 0 && (
                                <div className="mt-10">
                                    <h3 className="text-2xl font-bold text-white mb-6">Project Gallery</h3>
                                    <ProjectGallery images={project.project_album} title={project.title} />
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem]">
                                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Project Info</h3>
                                <div className="space-y-5">
                                    <InfoRow label="Project Name" value={project.title} />
                                    {project.client && <InfoRow label="Client" value={project.client} />}
                                    <InfoRow label="Category" value={project.category} highlight />
                                    {project.years && <InfoRow label="Production Date" value={project.years} />}
                                    {project.project_link && (
                                        <div className="space-y-1">
                                            <p className="text-white/50 text-sm uppercase tracking-wider font-bold">Project Link</p>
                                            <a
                                                href={project.project_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-white font-medium text-base hover:text-primary transition-colors underline decoration-white/30 underline-offset-4 break-all"
                                            >
                                                View Live Project ↗
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="relative overflow-hidden bg-gradient-to-br from-[#E20EC2] to-[#7A0668] p-8 rounded-[2rem] shadow-[0_0_40px_rgba(226,14,194,0.3)]">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full translate-x-10 -translate-y-10" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 blur-2xl rounded-full -translate-x-5 translate-y-5" />
                                <div className="relative z-10 space-y-4">
                                    <h3 className="text-2xl font-black text-white leading-tight">
                                        Need something like this?
                                    </h3>
                                    <p className="text-white/80 font-medium">
                                        Let&apos;s collaborate and build something extraordinary for your brand.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="inline-block mt-4 bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
                                    >
                                        Contact Us Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prev / Next */}
                    <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                        {prevProject ? (
                            <Link href={`/portfolio/${prevProject.id}`} className="group flex items-center gap-4 w-full sm:w-auto">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors shrink-0">
                                    <img src="/icun.png" alt="Prev" className="w-4 h-4 object-contain brightness-0 invert rotate-180" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Previous Project</p>
                                    <p className="text-white font-bold group-hover:text-primary transition-colors max-w-[200px] truncate">{prevProject.title}</p>
                                </div>
                            </Link>
                        ) : <div />}

                        <div className="hidden sm:block w-px h-16 bg-white/10 shrink-0" />

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
                        ) : <div />}
                    </div>

                </div>
            </main>
        </div>
    );
}

function InfoRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className="space-y-1">
            <p className="text-white/50 text-sm uppercase tracking-wider font-bold">{label}</p>
            <p className={`font-medium text-base ${highlight ? "text-primary font-bold" : "text-white"}`}>{value}</p>
        </div>
    );
}
