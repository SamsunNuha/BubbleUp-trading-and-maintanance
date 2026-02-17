import { motion } from "motion/react";
import { Facebook, Linkedin, Mail, User } from "lucide-react";

const teamMembers = [
    {
        name: "Mohamed Mufsi",
        position: "MANAGING DIRECTOR",
        socials: {
            facebook: "#",
            linkedin: "#",
            email: "mailto:info@bubbleuptrading.com",
        },
    },
    {
        name: "Mohamed Amjath",
        position: "GENERAL MANAGER",
        socials: {
            facebook: "#",
            linkedin: "#",
            email: "mailto:info@bubbleuptrading.com",
        },
    },
    {
        name: "Rabiul Hossain",
        position: "SALES ENGINEER-AUTOMATION & CONTROL PANEL SPECIALIST",
        socials: {
            facebook: "#",
            linkedin: "#",
            email: "mailto:info@bubbleuptrading.com",
        },
    },
    {
        name: "Rishad",
        position: "ACCOUNTS",
        socials: {
            facebook: "#",
            linkedin: "#",
            email: "mailto:info@bubbleuptrading.com",
        },
    },
];

export function Team() {
    return (
        <section id="team" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sm tracking-widest uppercase font-semibold text-blue-600 mb-4 block">
                        OUR EXPERT TEAM
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Meet Our Expert Team
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-slate-50 rounded-2xl overflow-hidden mb-6 aspect-[4/5] relative flex items-end justify-center">
                                {/* Image Placeholder */}
                                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                                    <User className="w-24 h-24 text-slate-400 opacity-20" />
                                </div>

                                {/* Real image would go here: <img src={member.image} className="w-full h-full object-cover" /> */}

                                {/* Social Overlay on Hover (Optional, but using bottom icons as per screenshot) */}
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-xs tracking-wider font-bold text-amber-500 mb-4 px-2">
                                    {member.position}
                                </p>

                                <div className="flex justify-center gap-3">
                                    <a
                                        href={member.socials.facebook}
                                        className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors"
                                    >
                                        <Facebook size={18} fill="currentColor" />
                                    </a>
                                    <a
                                        href={member.socials.linkedin}
                                        className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors"
                                    >
                                        <Linkedin size={18} fill="currentColor" />
                                    </a>
                                    <a
                                        href={member.socials.email}
                                        className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors"
                                    >
                                        <Mail size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
