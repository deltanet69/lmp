"use client";
import { motion } from 'framer-motion';

const teamMembers = [
    {
        name: "Darlene Robertson",
        jobTitle: "Creative Director",
        description: "Over the course of several years, I've been involved in recruiting individuals within this field, and I must say, the degree of professionalism exhibited by this team is unparalleled.",
        image: "/profil/pr1.png"
    },
    {
        name: "Jane Doe",
        jobTitle: "Lead Designer",
        description: "Over the course of several years, I've been involved in recruiting individuals within this field, and I must say, the degree of professionalism exhibited by this team is unparalleled.",
        image: "/profil/pr2.png"
    },
    {
        name: "John Smith",
        jobTitle: "Senior Developer",
        description: "Over the course of several years, I've been involved in recruiting individuals within this field, and I must say, the degree of professionalism exhibited by this team is unparalleled.",
        image: "/profil/pr3.png"
    },
    {
        name: "Alice Johnson",
        jobTitle: "Project Manager",
        description: "Over the course of several years, I've been involved in recruiting individuals within this field, and I must say, the degree of professionalism exhibited by this team is unparalleled.",
        image: "/profil/pr4.png"
    }
];

export default function OurTeam() {
    return (
        <section className="relative w-full py-24 overflow-hidden bg-[#19172A]">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-3">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-secondary font-bold tracking-widest text-sm uppercase">We support creative people</p>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight capitalize mt-2">
                            <span className="  text-primary">Tim Kreatif</span> Langit Media Pro
                        </h2>
                    </motion.div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.15 }}
                            className="relative bg-white/5 border border-white/10 p-2 rounded-[2rem] overflow-hidden group transition-all duration-500 hover:bg-white/10 hover:backdrop-blur-xl hover:shadow-[0_0_30px_rgba(226,14,194,0.15)] hover:-translate-y-2 hover:border-white/20"
                        >
                            {/* Image Wrapper */}
                            <div className="w-full aspect-[4/5] mx-auto bg-black/20 rounded-[1.5rem] mb-6 overflow-hidden relative border-2 border-transparent group-hover:border-primary/50 transition-colors duration-500">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Optional overlay layer on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            <div className="text-center relative z-10">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-primary font-bold text-sm tracking-wider uppercase mb-2">
                                    {member.jobTitle}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
